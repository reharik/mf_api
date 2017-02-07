
module.exports = function(compiler, validateMethods) {
  return function (document) {

    // construct a validation object, pre-compiling all schema and regex required
    let compiled = compiler(document);
    return async(ctx, next) => {

      if (document.basePath !== undefined && !ctx.path.startsWith(document.basePath)) {
        // not a path that we care about
        await next();
        return;
      }

      let compiledPath = compiled(ctx.path);
      if (compiledPath === undefined) {
        // if there is no single matching path, return 404 (not found)
        ctx.status = 404;
        return;
      }
      // check the request matches the swagger schema
      let validationErrors = validateMethods.request(compiledPath, ctx.method, ctx.query, ctx.request.body);

      if (validationErrors === undefined) {
        // operation not defined, return 405 (method not allowed)
        ctx.status = 405;
        return;
      }
      console.log(`==========validationErrors=========`);
      console.log(validationErrors);
      console.log(`==========END validationErrors=========`);
      if (!validationErrors.valid) {
        ctx.status = 400;
        ctx.body = {
          code: 'SWAGGER_REQUEST_VALIDATION_FAILED',
          errors: validationErrors
        };
        return;
      }

      // wait for the operation to execute
      await next();

      // check the response matches the swagger schema
      let responseResult = validateMethods.response(compiledPath, ctx.method, ctx.status, ctx.body);
      if (!responseResult.valid) {
        ctx.status = 500;
        ctx.body = {
          code: 'SWAGGER_RESPONSE_VALIDATION_FAILED',
          errors: [responseResult]
        };
      }
    };
  }
};