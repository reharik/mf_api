module.exports = function(invariant) {
  return function (data) {
    invariant(data.clientId, 'refundSessionPurchase requires that you pass the client id');
    invariant(data.id, 'refundSessionPurchase requires that you pass the sessionPurchase id');
    return data;
  }
};