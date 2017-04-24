module.exports = function purchasesRouter(koarouter, controllers) {
  return function (appRouter) {

    const router = koarouter();

    /**
     * @swagger
     * /sessionsPurchase/purchases:
     *   post:
     *     x-name: /sessionsPurchase/purchases
     *     description: purchase sessions for a client
     *     operationId: /sessionsPurchase/purchases
     *     parameters:
     *       - name: body
     *         in: body
     *         required: true
     *         schema:
     *           $ref: "#/definitions/purchases"
     *     responses:
     *       200:
     *         description: Success
     *         schema:
     *             $ref: "#/definitions/standardSuccessResponse"
     *       422:
     *         description: Failure
     *         schema:
     *             $ref: "#/definitions/standardFailureResponse"
     *
     */
    router.post("/sessionsPurchase/purchases", controllers.sessionsPurchaseController.purchases);
    /**
     * @swagger
     * /sessionsPurchase/updateSessionsPurchase:
     *   post:
     *     x-name: /sessionsPurchase/updateSessionsPurchase
     *     description: update session purchase for client
     *     operationId: /sessionsPurchase/updateSessionsPurchase
     *     parameters:
     *       - name: body
     *         in: body
     *         required: true
     *         schema:
     *           $ref: "#/definitions/updateSessionsPurchase"
     *     responses:
     *       200:
     *         description: Success
     *         schema:
     *             $ref: "#/definitions/standardSuccessResponse"
     *       422:
     *         description: Failure
     *         schema:
     *             $ref: "#/definitions/standardFailureResponse"
     */
    router.post("/sessionsPurchase/updateSessionsPurchase", controllers.sessionsPurchaseController.updateSessionsPurchase);
    /**
     * @swagger
     * /sessionsPurchase/cancelSessionsPurchase:
     *   post:
     *     x-name: /sessionsPurchase/cancelSessionsPurchase
     *     description: cancel session purchase for client
     *     operationId: /sessionsPurchase/cancelSessionsPurchase
     *     parameters:
     *       - name: body
     *         in: body
     *         required: true
     *         schema:
     *           $ref: "#/definitions/cancelSessionsPurchase"
     *     responses:
     *       200:
     *         description: Success
     *         schema:
     *             $ref: "#/definitions/standardSuccessResponse"
     *       422:
     *         description: Failure
     *         schema:
     *             $ref: "#/definitions/standardFailureResponse"
     */
    router.post("/sessionsPurchase/cancelSessionsPurchase", controllers.sessionsPurchaseController.cancelSessionsPurchase);
    /**
     * @swagger
     * /sessionsPurchase/fetchPurchase/{id}:
     *   get:
     *     x-name: trainer
     *     description: retrieve single trainer by id
     *     operationId: sessionsPurchase/fetchPurchase/{id}
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: The id of the session purchase
     *         type: string
     *     responses:
     *       200:
     *         description: Success
     *         schema:
     *             $ref: "#/definitions/standardSuccessResponse"
     *       422:
     *         description: Failure
     *         schema:
     *             $ref: "#/definitions/standardFailureResponse"
     */
    router.get("/sessionsPurchase/fetchPurchase/:id", controllers.sessionsPurchaseController.fetchPurchase);
    /**
     * @swagger
     * /purchasesList/fetchPurchases:
     *   get:
     *     x-name: /purchasesList/fetchPurchases
     *     description: retrieve clients
     *     operationId: fetchClients
     *     responses:
     *       200:
     *         description: Success
     *         schema:
     *           $ref: "#/definitions/purchasesResponse"
     */
    router.get("/sessionsPurchaseList/fetchPurchases", controllers.sessionsPurchaseList.fetchPurchases);

    appRouter.use(router.routes(), router.allowedMethods());
  };
};
