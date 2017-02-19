
module.exports = function(uuidvalidate) {
  return [
    {
    name: "uuid",
    validator: (field, name, value) => {
      if(field.type === 'string'
        && field.format === 'uuid'
        && !uuidvalidate(value)){
          return {property: name, message: `${name} is not a valid uuid`}
      }
    }
  }




  ]
};