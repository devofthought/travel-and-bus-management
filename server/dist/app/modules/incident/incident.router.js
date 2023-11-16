"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncidentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const incident_controller_1 = require("./incident.controller");
const incident_validation_1 = require("./incident.validation");
const router = express_1.default.Router();
router.get('/:id', incident_controller_1.IncidentController.getSingleIncident);
router.get('/', incident_controller_1.IncidentController.getAllIncidents);
router.post('/', (0, validateRequest_1.default)(incident_validation_1.IncidentValidation.createIncidentZodSchema), incident_controller_1.IncidentController.createAnIncident);
router.patch('/:id', (0, validateRequest_1.default)(incident_validation_1.IncidentValidation.updateIncidentZodSchema), incident_controller_1.IncidentController.updateAnIncident);
router.delete('/:id', incident_controller_1.IncidentController.deleteAnIncident);
exports.IncidentRoutes = router;
