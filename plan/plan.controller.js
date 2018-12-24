// Import required modules
var planService = require('./plan.service');
var logger = require('../../lib/logger');
let util = require('util');
let _ = require("lodash");
const commonUtils = require('../../common_utils/common');
let Q = require('q');
let LOG_CATEGORY = "planControler";
var cfg = require('config');
/**
 * This function is to get unplanned orders list
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {function} next callback function
 */
var unplannedOrdersList = async (req, res, next) => {
    var logMethod = "getUnplannedOrdersList";
    try {
        if (req.query && _.isEmpty(req.query)) {
            throw new Error("Request query should not be empty.");
        }
        if (!req.query.from && !req.query.size) {
            throw new Error('Pagination parameters required.');
        }
        var from = req.query.from;
        var size = req.query.size;
        const result = await planService.getUnplannedOrdersList(from, size);
        logger.info(util.format("<-%s::%s", LOG_CATEGORY, logMethod));
        commonUtils.okResponseHandler(result, req, res, next);
    } catch (err) {
        logger.error(util.format("<-%s::%s", LOG_CATEGORY, logMethod, util.inspect(err)));
        // next(err);
        res.boom.badRequest(err.message);
    }
}

var updateOrderDetails = function (req, res, next) {
    var logMethod = "updateOrderDetails";
    logger.info(util.format("%s::%s->", LOG_CATEGORY, logMethod));
    try {
        if (!req.body) {
            throw new Error("Body parameters required.");
        }
        if (req.body && _.isEmpty(req.body)) {
            throw new Error("Request body should not be  empty ");
        }
        if (req.params.orderId == "") {
            throw new Error("orderId is required. ");
        }
        planService.updateOrderDetails(req.params.orderId, req.body)
            .then(function (result) {
                logger.info(util.format("<-%s::%s", LOG_CATEGORY, logMethod));
                commonUtils.okResponseHandler(result, req, res, next);
            }).catch(function (err) {
                logger.error(util.format("%s::%s: err:%s", LOG_CATEGORY, logMethod, util.inspect(err)));
                res.boom.badRequest(err);
            });
    } catch (err) {
        logger.error(util.format("%s::%s: err:%s", LOG_CATEGORY, logMethod, util.inspect(err)));
        res.boom.badRequest(err);
    }
}

var updateOrderSequence = function (req, res, next) {
    var logMethod = "updateOrderSequence";
    logger.info(util.format("%s::%s->", LOG_CATEGORY, logMethod));
    try {
        if (!req.body) {
            throw new Error("Body parameters required.");
        }
        if (req.body && _.isEmpty(req.body)) {
            throw new Error("Request body should not be  empty ");
        }

        planService.updateOrderSequence(req.body)
            .then(function (result) {
                logger.info(util.format("<-%s::%s", LOG_CATEGORY, logMethod));
                commonUtils.okResponseHandler(result, req, res, next);
            }).catch(function (err) {
                logger.error(util.format("%s::%s: err:%s", LOG_CATEGORY, logMethod, JSON.stringify(err)));
                next(err);
            });
    } catch (err) {
        logger.error(util.format("%s::%s: err:%s", LOG_CATEGORY, logMethod, JSON.stringify(err)));
        next(err);
    }
}
var getOrderById = async (req, res, next) => {
    var logMethod = 'getOrderById';
    try {
        if (!req.params.orderId) {
            throw new Error("Order Id is required.");
        }
        var order_id = req.params.orderId;
        const result = await planService.getOrderById(order_id);
        logger.info(util.format("<-%s::%s", LOG_CATEGORY, logMethod));
        commonUtils.okResponseHandler(result, req, res, next);
    } catch (err) {
        logger.error(util.format("%s::%s: err:%s", LOG_CATEGORY, logMethod, JSON.stringify(err)));
        res.boom.badRequest(err.message);
    }
}
/**
 * This function is to Append Selected Orders
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {function} next callback function
 */
var AppendSelectedOrders = async function (req, res, next) {
    var logMethod = "AppendSelectedOrders";
    try {
        var orderlineId = (typeof req.body.orderlineId !== 'undefined') ? req.body.orderlineId : '';
        var manifestSourceId = (typeof req.body.manifestSourceId !== 'undefined') ? req.body.manifestSourceId : '';
        const result = await planService.AppendSelectedOrders(orderlineId, manifestSourceId);
        logger.info(util.format("<-%s::%s", LOG_CATEGORY, logMethod));
        commonUtils.okResponseHandler(result, req, res, next);
    } catch (err) {
        logger.error(util.format("%s::%s: err:%s", LOG_CATEGORY, logMethod, JSON.stringify(err)));
        res.boom.badRequest(err);
    }
}
/**
 * This function is to to Check Business rule pallet count - critical error
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {function} next callback function
 */
var CheckBrPalletcount = async function (req, res, next) {
    var logMethod = "CheckBrPalletcount";
    try {
        var businessRuleId = cfg.businessRules.BR_PLN_1;
        var manifestSourceId = (typeof req.body.manifestSourceId !== 'undefined') ? req.body.manifestSourceId : '';
        const result = await planService.CheckBusinessRules(businessRuleId, manifestSourceId);
        logger.info(util.format("<-%s::%s", LOG_CATEGORY, logMethod));
        commonUtils.okResponseHandler(result, req, res, next);
    } catch (err) {
        logger.error(util.format("%s::%s: err:%s", LOG_CATEGORY, logMethod, JSON.stringify(err)));
        res.boom.badRequest(err);
    }
}
/**
 * This function is to to Check Business rule commodity Weight - warning error
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {function} next callback function
 */
var CheckBrWeightwarning = async function (req, res, next) {
    var logMethod = "CheckBrWeightwarning";
    try {
        var businessRuleId = cfg.businessRules.BR_PLN_2;
        var manifestSourceId = (typeof req.body.manifestSourceId !== 'undefined') ? req.body.manifestSourceId : '';
        const result = await planService.CheckBusinessRules(businessRuleId, manifestSourceId);
        logger.info(util.format("<-%s::%s", LOG_CATEGORY, logMethod));
        commonUtils.okResponseHandler(result, req, res, next);
    } catch (err) {
        logger.error(util.format("%s::%s: err:%s", LOG_CATEGORY, logMethod, JSON.stringify(err)));
        res.boom.badRequest(err);
    }
}
/**
 * This function is to Check Business rule commodity Weight - critical error
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {function} next callback function
 */
var CheckBrWeightcritical = async function (req, res, next) {
    var logMethod = "CheckBrWeightcritical";
    try {
        var businessRuleId = cfg.businessRules.BR_PLN_3;
        var manifestSourceId = (typeof req.body.manifestSourceId !== 'undefined') ? req.body.manifestSourceId : '';
        const result = await planService.CheckBusinessRules(businessRuleId, manifestSourceId);
        logger.info(util.format("<-%s::%s", LOG_CATEGORY, logMethod));
        commonUtils.okResponseHandler(result, req, res, next);
    } catch (err) {
        logger.error(util.format("%s::%s: err:%s", LOG_CATEGORY, logMethod, JSON.stringify(err)));
        res.boom.badRequest(err);
    }
}
/**
 * This function is to Check Appointment Window
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {function} next callback function
 */
var CheckAppointmentWindow = async function (req, res, next) {
    var logMethod = "CheckAppointmentWindow";
    try {
        var orderlineId = (typeof req.body.orderlineId !== 'undefined') ? req.body.orderlineId : '';
        const result = await planService.CheckAppointmentWindow(orderlineId);
        logger.info(util.format("<-%s::%s", LOG_CATEGORY, logMethod));
        commonUtils.okResponseHandler(result, req, res, next);
    } catch (err) {
        logger.error(util.format("%s::%s: err:%s", LOG_CATEGORY, logMethod, JSON.stringify(err)));
        res.boom.badRequest(err);
    }
}
var CommodityWeight = async (req, res, next) => {
    var logMethod = "getPlannedOrdersCommodityWeight";
    try {
        const result = await planService.getCommodityWeight(req.body.manifestSourceId);
        logger.info(util.format("<-%s::%s", LOG_CATEGORY, logMethod));
        commonUtils.okResponseHandler(result, req, res, next);
    } catch (err) {
        logger.info(util.format("<-%s::%s", LOG_CATEGORY, logMethod));
        logger.error(err);
        res.boom.badRequest('Internal error');
    }
}
var laneDensityPalletcount = async (req, res, next) => {
    var logMethod = "getlanedensitypalletcount";
    try {
        const result = await planService.getLaneDensityPalletcount(req.body.manifestSourceId);
        logger.info(util.format("<-%s::%s", LOG_CATEGORY, logMethod));
        commonUtils.okResponseHandler(result, req, res, next);
    } catch (err) {
        logger.info(util.format("<-%s::%s", LOG_CATEGORY, logMethod));
        logger.error(err);
        res.boom.badRequest('Internal error');
    }
}
var checkFreightType = async (req, res, next) => {
    var logMethod = 'checkFreightType';
    try {
        var businessRuleId = cfg.businessRules.BR_PLN_7;
        var manifestSourceId = (typeof req.body.manifestSourceId !== 'undefined') ? req.body.manifestSourceId : '';
        const result = await planService.CheckBusinessRules(businessRuleId, manifestSourceId);
        logger.info(util.format("<-%s::%s", LOG_CATEGORY, logMethod));
        commonUtils.okResponseHandler(result, req, res, next);
    } catch (err) {
        logger.info(util.format("<-%s::%s", LOG_CATEGORY, logMethod));
        logger.error(err);
        res.boom.badRequest(err);
    }
}
var checkLoadTypeManifest = async (req, res, next) => {
    var logMethod = "checkloadtypemanifest";
    try {
        var businessRuleId = cfg.businessRules.BR_PLN_6;
        var manifestSourceId = (typeof req.body.manifestSourceId !== 'undefined') ? req.body.manifestSourceId : '';
        const result = await planService.CheckBusinessRules(businessRuleId, manifestSourceId);
        logger.info(util.format("<-%s::%s", LOG_CATEGORY, logMethod));
        commonUtils.okResponseHandler(result, req, res, next);
    } catch (err) {
        logger.info(util.format("<-%s::%s", LOG_CATEGORY, logMethod));
        logger.error(err);
        res.boom.badRequest(JSON.stringify(err));
    }
}
/**
 * This function is to remove orders from manifest
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {function} next callback function
 */

var removeOrderFromManifest = async (req, res, next) => {
    var logMethod = "updateOrderDetails";
    logger.info(util.format("%s::%s->", LOG_CATEGORY, logMethod));
    try {
        if (req.body && _.isEmpty(req.body)) {
            throw new Error("Request body should not be empty.");
        }
        if (req.body.orderlineId == "") {
            throw new Error("Orderline id is required.");
        }
        if (req.body.manifestSourceId == "") {
            throw new Error("Manifest source id is required.");
        }
        const result = await planService.removeOrderFromManifest(req.body.orderlineId, req.body.manifestSourceId);
        logger.info(util.format("<-%s::%s", LOG_CATEGORY, logMethod));
        commonUtils.okResponseHandler(result, req, res, next);
    } catch (err) {
        logger.error(util.format("%s::%s: err:%s", LOG_CATEGORY, logMethod, JSON.stringify(err)));
        next(err);
    }
}
////////////////// For Testing Purpose ///////////////
let test = async (req, res, next) => {
    var logMethod = 'checkFreightType';
    try {
        var manifestSourceId = (req.body.manifestSourceId) ? req.body.manifestSourceId : '';
        const result = await planService.test(manifestSourceId);
        logger.info(util.format("<-%s::%s", LOG_CATEGORY, logMethod));
        commonUtils.okResponseHandler(result, req, res, next);
    } catch (err) {
        logger.info(util.format("<-%s::%s", LOG_CATEGORY, logMethod));
        logger.error(err);
        res.boom.badRequest(err);
    }
}
// Exporting modules
module.exports = {
    unplannedOrdersList: unplannedOrdersList,
    updateOrderDetails: updateOrderDetails,
    updateOrderSequence: updateOrderSequence,
    getOrderById: getOrderById,
    AppendSelectedOrders: AppendSelectedOrders,
    CheckBrPalletcount: CheckBrPalletcount,
    CheckBrWeightwarning: CheckBrWeightwarning,
    CheckBrWeightcritical: CheckBrWeightcritical,
    CheckAppointmentWindow: CheckAppointmentWindow,
	CommodityWeight: CommodityWeight,
    laneDensityPalletcount: laneDensityPalletcount,
    checkFreightType: checkFreightType,
    checkLoadTypeManifest: checkLoadTypeManifest,
    removeOrderFromManifest: removeOrderFromManifest,
    test: test
}