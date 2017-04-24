module.exports = function(invariant) {
  return function (purchaseSessions) {
    invariant(purchaseSessions.clientId, 'purchaseSessions requires that you pass the clients Id');
    return purchaseSessions
  }
};