module.exports = function purchaseSessionsRouter(koarouter, controllers) {
  return function (appRouter) {

    const router = koarouter();

    /**
     * @swagger
     * /sessionsPurchase/purchaseSessions:
     *   post:
     *     x-name: /sessionsPurchase/purchaseSessions
     *     description: purchase sessions for a client
     *     operationId: /sessionsPurchase/purchaseSessions
     *     parameters:
     *       - name: body
     *         in: body
     *         required: true
     *         schema:
     *           $ref: "#/definitions/purchaseSessions"
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
    router.post("/sessionsPurchase/purchaseSessions", controllers.sessionsPurchaseController.purchaseSessions);
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
     * /sessionsPurchase/fetchSessionPurchase/{id}:
     *   get:
     *     x-name: trainer
     *     description: retrieve single trainer by id
     *     operationId: sessionsPurchase/fetchSessionPurchase/{id}
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
    router.get("/sessionsPurchase/fetchSessionPurchase/:id", controllers.sessionsPurchaseController.fetchSessionPurchase);
    /**
     * @swagger
     * /purchaseSessionsList/fetchSessionPurchases:
     *   get:
     *     x-name: /purchaseSessionsList/fetchSessionPurchases
     *     description: retrieve clients
     *     operationId: fetchClients
     *     responses:
     *       200:
     *         description: Success
     *         schema:
     *           $ref: "#/definitions/purchaseSessionsResponse"
     */
    router.get("/sessionsPurchaseList/fetchSessionPurchases", controllers.sessionsPurchaseList.fetchSessionPurchases);

    appRouter.use(router.routes(), router.allowedMethods());
  };
};
