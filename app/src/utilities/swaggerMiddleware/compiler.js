// compiler.js
"use strict";

// var deref = require("json-schema-deref-sync");
/*
 * We need special handling for query validation, since they're all strings.
 * e.g. we must treat "5" as a valid number
 */

module.exports = function(jsonschemaderefsync, curriedValidator) {

  function stringValidator(schema) {
    return function (value) {
      // if an optional field is not provided, we're all good other not so much
      if (value === undefined) {
        return !schema.required;
      }
      switch (schema.type) {
        case 'number':
        case 'integer':
          if (!isNaN(value)) {
            // if the value is a number, make sure it's a number
            value = +value;
          }
          break;
        case 'boolean':
          if (value === 'true') {
            value = true;
          }
          else if (value === 'false') {
            value = false;
          }
          break;
        case 'array':
          if (!Array.isArray(value)) {
            var format = schema.collectionFormat || 'csv';
            switch (format) {
              case 'csv':
                value = String(value).split(',');
                break;
              case 'ssv':
                value = String(value).split(' ');
                break;
              case 'tsv':
                value = String(value).split('\t');
                break;
              case 'pipes':
                value = String(value).split('|');
                break;
              case 'multi':
              default:
                value = [value];
                break;
            }
          }
          switch (schema.items.type) {
            case 'number':
            case 'integer':
              value = value.map(function (num) {
                if (!isNaN(num)) {
                  // if the value is a number, make sure it's a number
                  return +num;
                }
                else {
                  return num;
                }
              });
              break;
            case 'boolean':
              value = value.map(function (bool) {
                if (bool === 'true') {
                  return true;
                }
                else if (bool === 'false') {
                  return false;
                }
                else {
                  return bool;
                }
              });
              break;
            default:
          }
          break;
        default:
      }
      return !!value;
    };
  }

  function compile(document, customValidators) {
    const curriedValidatorWithDoc = curriedValidator(document, customValidators);
    // get the de-referenced version of the swagger document
    var swagger = jsonschemaderefsync(document);
    // add a validator for every parameter in swagger document
    Object.keys(swagger.paths).forEach(function (pathName) {
      var path = swagger.paths[pathName];
      Object.keys(path).filter(function (name) {
        return name !== 'parameters';
      }).forEach(function (operationName) {
        var operation = path[operationName];
        var parameters = {};
        var resolveParameter = function (parameter) {
          parameters[parameter.name + ":" + parameter.location] = parameter;
        };
        // start with parameters at path level
        (path.parameters || []).forEach(resolveParameter);
        // merge in or replace parameters from operation level
        (operation.parameters || []).forEach(resolveParameter);
        // create array of fully resolved parameters for operation
        operation.resolvedParameters = Object.keys(parameters).map(function (key) {
          return parameters[key];
        });
        // create parameter validators
        operation.resolvedParameters.forEach(function (parameter) {
          var schema = parameter.schema || parameter;
          if (parameter.in === 'query' || parameter.in === 'header') {
            parameter.validator = stringValidator(schema);
          }
          else {
            parameter.validator = curriedValidatorWithDoc(schema);
          }
        });
        Object.keys(operation.responses).forEach(function (statusCode) {
          var response = operation.responses[statusCode];
          if (response.schema) {
            response.validator = curriedValidatorWithDoc(response.schema);
          }
          else {
            // no schema, so ensure there is no response
            // tslint:disable-next-line:no-null-keyword
            response.validator = function (body) {
              return body === undefined || body === null || body === '';
            };
          }
        });
      });
    });
    var basePath = swagger.basePath || '';
    var matcher = Object.keys(swagger.paths)
      .map(function (name) {
        return {
          name: name,
          path: swagger.paths[name],
          regex: new RegExp(basePath + name.replace(/\{[^}]*}/g, '[^/]+') + '$'),
          expected: (name.match(/[^\/]+/g) || []).map(function (s) {
            return s.toString();
          })
        };
      });
    return function (path) {
      // get a list of matching paths, there should be only one
      var matches = matcher.filter(function (match) {
        return !!path.match(match.regex);
      });
      if (matches.length !== 1) {
        return;
      }
      return matches[0];
    };
  }
  return compile
}
//# sourceMappingURL=compiler.js.map