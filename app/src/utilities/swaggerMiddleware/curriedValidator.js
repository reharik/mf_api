module.exports = function(swaggermodelvalidator) {
  return function(document) {
    const validator = new swaggermodelvalidator(document);
    return function (schema) {
      return function (value) {
        const fu = validator.validate(value, schema, document.definitions);
        console.log(`==========fu=========`);
        console.log(fu);
        console.log(`==========END fu=========`);
        return fu;
      }
    }
  }
};