module.exports = function(invariant) {
  return function (purchases) {
    invariant(purchases.clientId, 'purchases requires that you pass the clients Id');
    return purchases
  }
};