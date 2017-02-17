/**
 * Created by reharik on 7/26/15.
 */

"use strict";

module.exports = function(koarouter, controllers, koaconvert, papersConfig) {
    var secured = async function (next) {
        if (this.isAuthenticated()) {
            await next;
        } else {
            this.status = 401;
        }
    };

    return function(app){

        var router = koarouter();
        router.get("/", controllers.indexController.index);
        /**
         * @swagger
         * /swagger:
         *   get:
         *     x-name: swagger
         *     description: Returns swagger spec
         *     operationId: swagger
         *     responses:
         *       '200':
         *         description: Success
         *         schema:
         *           additionalProperties: {}
         */
        router.get("/swagger", controllers.swaggerController.swagger);
        /**
         * @swagger
         * /auth:
         *   post:
         *     x-name: loggin
         *     description: checks credentials
         *     operationId: auth
         *     parameters:
         *       - name: body
         *         in: body
         *         required: true
         *         schema:
         *           $ref: "#/definitions/signIn"
         *     responses:
         *       200:
         *         description: Success
         *         schema:
         *             $ref: "#/definitions/auth"
         */
        // router.get("/auth", controllers.authController.checkAuth);
        router.post("/auth", controllers.authController.signIn);
        router.all("/signout", controllers.authController.signOut);
        /**
         * @swagger
         * /trainers:
         *   get:
         *     x-name: trainers
         *     description: retrieve all trainers
         *     operationId: trainers
         *     responses:
         *       200:
         *         description: Success
         *         schema:
         *           $ref: "#/definitions/trainersResponse"
         */
        router.get("/trainers", controllers.trainerListController.trainers);
        /**
         * @swagger
         * /trainer/hireTrainer:
         *   post:
         *     x-name: /trainer/hireTrainer
         *     description: hire trainer
         *     operationId: /trainer/hireTrainer
         *     parameters:
         *       - name: body
         *         in: body
         *         required: true
         *         schema:
         *           $ref: "#/definitions/trainer"
         *     responses:
         *       200:
         *         description: Success
         *         schema:
         *             $ref: "#/definitions/standardSuccessResponse"
         */
        router.post("/trainer/hireTrainer", controllers.trainerController.hireTrainer);
        /**
         * @swagger
         * /trainer/updateTrainerInfo:
         *   post:
         *     x-name: /trainer/updateTrainerInfo
         *     description: update Trainer Info
         *     operationId: /trainer/updateTrainerInfo
         *     parameters:
         *       - name: body
         *         in: body
         *         required: true
         *         schema:
         *           $ref: "#/definitions/updateTrainerInfo"
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
        router.post("/trainer/updateTrainerInfo", controllers.trainerController.updateTrainerInfo);
        /**
         * @swagger
         * /trainer/updateTrainerContact:
         *   post:
         *     x-name: /trainer/updateTrainerContact
         *     description: update Trainer Contact
         *     operationId: /trainer/updateTrainerContact
         *     parameters:
         *       - name: body
         *         in: body
         *         required: true
         *         schema:
         *           $ref: "#/definitions/updateTrainerContact"
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
        router.post("/trainer/updateTrainerContact", controllers.trainerController.updateTrainerContact);
        /**
         * @swagger
         * /trainer/updateTrainerAddress:
         *   post:
         *     x-name: /trainer/updateTrainerAddress
         *     description: update Trainer Address
         *     operationId: /trainer/updateTrainerAddress
         *     parameters:
         *       - name: body
         *         in: body
         *         required: true
         *         schema:
         *           $ref: "#/definitions/updateTrainerAddress"
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
        router.post("/trainer/updateTrainerAddress", controllers.trainerController.updateTrainerAddress);
        /**
         * @swagger
         * /trainer/updateTrainerPassword:
         *   post:
         *     x-name: /trainer/updateTrainerPassword
         *     description: update Trainer Password
         *     operationId: /trainer/updateTrainerPassword
         *     parameters:
         *       - name: body
         *         in: body
         *         required: true
         *         schema:
         *           $ref: "#/definitions/updateTrainerPassword"
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
        router.post("/trainer/updateTrainerPassword", controllers.trainerController.updateTrainerPassword);
        /**
         * @swagger
         * /trainer/updateTrainersClients:
         *   post:
         *     x-name: /trainer/updateTrainersClients
         *     description: update Trainers Clients
         *     operationId: /trainer/updateTrainersClients
         *     parameters:
         *       - name: body
         *         in: body
         *         required: true
         *         schema:
         *           $ref: "#/definitions/updateTrainersClients"
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
        router.post("/trainer/updateTrainersClients", controllers.trainerController.updateTrainersClients);
        /**
         * @swagger
         * /trainer/getTrainer/{id}:
         *   get:
         *     x-name: trainer
         *     description: retrieve single trainer by id
         *     operationId: trainer
         *     parameters:
         *       - name: id
         *         in: path
         *         required: true
         *         description: The trainers id
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
        router.get("/trainer/getTrainer/:id", controllers.trainerController.getTrainer);
        /**
         * @swagger
         * /clients:
         *   get:
         *     x-name: clients
         *     description: retrieve all clients
         *     operationId: clients
         *     responses:
         *       200:
         *         description: Success
         *         schema:
         *           $ref: "#/definitions/clientsResponse"
         */
        router.get("/clients", controllers.clientListController.clients);
        /**
         * @swagger
         * /client/addClient:
         *   post:
         *     x-name: /client/addClient
         *     description: add client
         *     operationId: /client/addClient
         *     parameters:
         *       - name: body
         *         in: body
         *         required: true
         *         schema:
         *           $ref: "#/definitions/client"
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
        router.post("/client/addClient", controllers.clientController.addClient);
        /**
         * @swagger
         * /client/updateClientInfo:
         *   post:
         *     x-name: /client/updateClientInfo
         *     description: update Client Info
         *     operationId: /client/updateClientInfo
         *     parameters:
         *       - name: body
         *         in: body
         *         required: true
         *         schema:
         *           $ref: "#/definitions/updateClientInfo"
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
        router.post("/client/updateClientInfo", controllers.clientController.updateClientInfo);
        /**
         * @swagger
         * /client/updateClientContact:
         *   post:
         *     x-name: /client/updateClientContact
         *     description: update Client Contact
         *     operationId: /client/updateClientContact
         *     parameters:
         *       - name: body
         *         in: body
         *         required: true
         *         schema:
         *           $ref: "#/definitions/updateClientContact"
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
        router.post("/client/updateClientContact", controllers.clientController.updateClientContact);
        /**
         * @swagger
         * /client/updateClientAddress:
         *   post:
         *     x-name: /client/updateClientAddress
         *     description: update Client Address
         *     operationId: /client/updateClientAddress
         *     parameters:
         *       - name: body
         *         in: body
         *         required: true
         *         schema:
         *           $ref: "#/definitions/updateClientAddress"
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
        router.post("/client/updateClientAddress", controllers.clientController.updateClientAddress);
        /**
         * @swagger
         * /client/getClient/{id}:
         *   get:
         *     x-name: client
         *     description: retrieve single client by id
         *     operationId: client
         *     parameters:
         *       - name: id
         *         in: path
         *         required: true
         *         description: The client id
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
        router.get("/client/getClient/:id", controllers.clientController.getClient);
        /**
         * @swagger
         * /fetchAppointments/{startDate}/{endDate}:
         *   get:
         *     x-name: fetchAppointments
         *     description: fetch Appointments
         *     operationId: fetchAppointments
         *     parameters:
         *       - name: startDate
         *         in: path
         *         required: true
         *         description: the beginning of the span of time to retrieve appointments for
         *         type: string
         *       - name: endDate
         *         in: path
         *         required: true
         *         description: the ending of the span of time to retrieve appointments for
         *         type: string
         *     responses:
         *       200:
         *         description: Success
         *         schema:
         *             $ref: "#/definitions/appointmentsResponse"
         */
        /**
         * @swagger
         * /fetchAppointments/{startDate}/{endDate}/{trainerId}:
         *   get:
         *     x-name: fetchAppointments
         *     description: fetch Appointments
         *     operationId: fetchAppointments
         *     parameters:
         *       - name: startDate
         *         in: path
         *         required: true
         *         description: the beginning of the span of time to retrieve appointments for
         *         type: string
         *       - name: endDate
         *         in: path
         *         required: true
         *         description: the ending of the span of time to retrieve appointments for
         *         type: string
         *       - name: trainerId
         *         in: path
         *         required: false
         *         description: the trainer id for whom to retrieve appointments
         *         type: string
         *     responses:
         *       200:
         *         description: Success
         *         schema:
         *             $ref: "#/definitions/appointmentsResponse"
         */
        router.get("/fetchAppointments/:startDate/:endDate/:trainerId?", controllers.appointmentController.fetchAppointments);
        /**
         * /fetchAppointment:
         *   get:
         *     x-name: fetchAppointment
         *     description: fetch Appointment by id
         *     operationId: fetchAppointment
         *     parameters:
         *       - name: id
         *         in: path
         *         required: true
         *         description: The appointment id
         *         type: string
         *     responses:
         *       200:
         *         description: Success
         *         schema:
         *             $ref: "#/definitions/appointment"
         */
        router.get("/fetchAppointment/:id", controllers.appointmentController.fetchAppointment);
        /**
         * @swagger
         * /appointment/scheduleAppointment:
         *   post:
         *     x-name: /appointment/scheduleAppointment
         *     description: schedule Appointment
         *     operationId: /appointment/scheduleAppointment
         *     parameters:
         *       - name: body
         *         in: body
         *         required: true
         *         schema:
         *           $ref: "#/definitions/scheduleAppointment"
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
        router.post("/appointment/scheduleAppointment", controllers.appointmentController.scheduleAppointment);
        /**
         * @swagger
         * /appointment/updateAppointment:
         *   post:
         *     x-name: /appointment/updateAppointment
         *     description: update Appointment
         *     operationId: /appointment/updateAppointment
         *     parameters:
         *       - name: body
         *         in: body
         *         required: true
         *         schema:
         *           $ref: "#/definitions/scheduleAppointment"
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
        router.post("/appointment/updateAppointment", controllers.appointmentController.updateAppointment);
        /**
         * @swagger
         * /appointment/cancelAppointment:
         *   post:
         *     x-name: /appointment/cancelAppointment
         *     description: cancel Appointment
         *     operationId: /appointment/cancelAppointment
         *     parameters:
         *       - name: body
         *         in: body
         *         required: true
         *         schema:
         *           $ref: "#/definitions/cancelAppointment"
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
        router.post("/appointment/cancelAppointment", controllers.appointmentController.cancelAppointment);

        app.use(router.routes());
        app.use(router.allowedMethods());

        // secured routes
        //this is one way of doing it.  You could also create a new router "var securedRouter = new Router();
        //that handles all routes in say /app which has the secured middleware
        //then all routes registered in securedRouter will be secured
        //app.get("/clients", secured, clientListController.clients);
        //app.post("/client/create", secured, clientController.create);
        //  app.get("/trainers", secured, trainerListController.trainers);
        //  app.post("/trainer/create", secured, trainerController.create);

    };
};