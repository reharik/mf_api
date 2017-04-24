module.exports = function(invariant) {
  return function (data) {
    invariant(data.clientId, 'cancelSessionPurchaseDueToError requires that you pass the client id');
    invariant(data.id, 'cancelSessionPurchaseDueToError requires that you pass the sessionPurchase id');
    return data;
  }
};