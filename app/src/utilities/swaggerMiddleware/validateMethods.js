// validate.js
"use strict";

module.exports = function() {
  function isEmpty(value) {
    return {valid: value === undefined || value === '' || Object.keys(value).length === 0};
  }

  function validate(value, schema) {
    // if no schema, treat as an error
    if (schema === undefined) {
      return {
        valid: false,
        GetErrorMessages: () => `can not validate: ${value}, when there is no applicable schema`
      };
    }
    return schema.validator(value);
  }

  function request(compiledPath, method, query, body, headers) {
    if (compiledPath === undefined) {
      return;
    }
    // get operation object for path and method
    var operation = compiledPath.path[method.toLowerCase()];
    if (operation === undefined) {
      // operation not defined, return 405 (method not allowed)
      return;
    }
    var parameters = operation.resolvedParameters;
    var validationResult = {valid: true, errors:[], where: []};
    var bodyDefined = false;
    // check all the parameters match swagger schema
    if (parameters.length === 0) {
      validationResult = validate(body, {validator: isEmpty});
        validationResult.where.push('body');

      if (query !== undefined && Object.keys(query).length > 0) {
        validationResult.valid = false;
        validationResult.errors.push(`Expected empty query string but received ${JSON.stringify(query)}`);
        validationResult.where.push('query');
      }
      return validationResult;
    }
    
    parameters.forEach(function (parameter) {
      var value;
      switch (parameter.in) {
        case 'query':
          value = (query || {})[parameter.name];
          break;
        case 'path':
          var actual = compiledPath.name.match(/[^\/]+/g);
          var valueIndex = compiledPath.expected.indexOf('{' + parameter.name + '}');
          value = actual ? actual[valueIndex] : undefined;
          break;
        case 'body':
          value = body;
          bodyDefined = true;
          break;
        case 'header':
          value = (headers || {})[parameter.name];
          break;
        default:
      }
      var paramResult = validate(value, parameter);
      if (!paramResult.valid) {
        validationResult.valid = false;
        validationResult.errors = validationResult.errors.concat(paramResult.errors);
        validationResult.where.push(parameter.in);
      }
    });
    // ensure body is undefined if no body schema is defined
    if (!bodyDefined && body !== undefined) {
      var error = validate(body, {validator: isEmpty});
      if (!error.valid) {
        validationResult.valid = false;
        validationResult.where .push('body');
        validationResult.errors.push(`Expected empty body but received ${JSON.stringify(body)}`);
      }
    }
    return validationResult;
  }

  function response(compiledPath, method, status, body) {
    if (compiledPath === undefined) {
      return {
        actual: 'UNDEFINED_PATH',
        expected: 'PATH'
      };
    }
    var operation = compiledPath.path[method.toLowerCase()];
    // check the response matches the swagger schema
    var response = operation.responses[status];
    if (response === undefined) {
      response = operation.responses['default'];
    }
    var result = validate(body, response);
    var validationResult = Object.assign({}, result);
    if(!result.valid) {
      validationResult.where.push('body');
    }
    return validationResult;
  }

  return {
    request,
    response
  }
};