module.exports = function(swaggermodelvalidator) {
  return function(document) {
    const validator = new swaggermodelvalidator(document);
    return function (schema) {
      return function (value) {
        return validator.validate(value, schema, document.definitions);
      }
    }
  }
};