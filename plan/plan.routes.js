// Import required modules
var express = require('express');
var router = express.Router();
var planController = require('./plan.controller');
var commonUtils = require('../../common_utils/common');

// URLs
var routes = () => {
    // router.use(commonUtils.refreshAuthorization, (req, res, next) => {
    //     next();
    // });
    router.route('/api/plan/orders')
        .get(planController.unplannedOrdersList);
    router.route('/api/plan/orders/orderSequence')
        .post(planController.updateOrderSequence);
    router.route('/api/plan/orders/:orderId')
        .post(planController.updateOrderDetails);
    router.route('/api/orders/:orderId')
        .get(planController.getOrderById);
    router.route('/api/plan/append-orders')
        .post(planController.AppendSelectedOrders);
    router.route('/api/plan/check-br-palletcount')
        .post(planController.CheckBrPalletcount);
    router.route('/api/plan/check-br-weightwarning')
        .post(planController.CheckBrWeightwarning);
    router.route('/api/plan/check-br-weightcritical')
        .post(planController.CheckBrWeightcritical);
    router.route('/api/plan/check-appointment-details')
        .post(planController.CheckAppointmentWindow);
    router.route('/api/plan/commodity-weight')
        .post(planController.CommodityWeight);
    router.route('/api/plan/lanedensitypalletcount')
        .post(planController.laneDensityPalletcount);
    router.route('/api/plan/checkFreightType')
        .post(planController.checkFreightType);
    router.route('/api/plan/checkloadtypemanifest')
        .post(planController.checkLoadTypeManifest);
    router.route('/api/plan/remove-order-from-manifest')
        .post(planController.removeOrderFromManifest);
    router.route('/api/plan/testing') ///// Testing Purpose
        .post(planController.test);
    return router;
};

module.exports = routes;