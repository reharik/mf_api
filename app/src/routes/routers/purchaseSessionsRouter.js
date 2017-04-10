module.exports = function purchaseSessionsRouter(koarouter, controllers) {
  return function (appRouter) {

    const router = koarouter();

    /**
     * @swagger
     * /purchaseSessions/purchaseSessions:
     *   post:
     *     x-name: /purchaseSessions/purchaseSessions
     *     description: purchase sessions for a client
     *     operationId: /purchaseSessions/purchaseSessions
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
    router.post("/purchaseSessions/purchaseSessions", controllers.purchaseSessionsController.purchaseSessions);
    /**
     * @swagger
     * /purchaseSessions/updateSessionsPurchase:
     *   post:
     *     x-name: /purchaseSessions/updateSessionsPurchase
     *     description: update session purchase for client
     *     operationId: /purchaseSessions/updateSessionsPurchase
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
    router.post("/purchaseSessions/updateSessionsPurchase", controllers.purchaseSessionsController.updateSessionsPurchase);
    /**
     * @swagger
     * /purchaseSessions/cancelSessionsPurchase:
     *   post:
     *     x-name: /purchaseSessions/cancelSessionsPurchase
     *     description: cancel session purchase for client
     *     operationId: /purchaseSessions/cancelSessionsPurchase
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
    router.post("/purchaseSessions/cancelSessionsPurchase", controllers.clientController.cancelSessionsPurchase);
    /**
     * @swagger
     * /purchaseSessions/fetchSessionPurchase/{id}:
     *   get:
     *     x-name: trainer
     *     description: retrieve single trainer by id
     *     operationId: purchaseSessions/fetchSessionPurchase/{id}
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
    router.get("/purchaseSessions/fetchSessionPurchase/:id", controllers.purchaseSessionsController.fetchSessionPurchase);
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
    router.get("/purchaseSessionsList/fetchSessionPurchases", controllers.purchaseSessionsList.fetchSessionPurchases);

    appRouter.use(router.routes(), router.allowedMethods());
  };
};
