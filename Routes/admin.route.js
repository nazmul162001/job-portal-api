const express = require('express');
const router = express.Router()
const controller = require("../Controller/admin.controller");
const { authorize } = require('../Middleware/authorization');
const { verifyToken } = require('../Middleware/verifyToken');

router.get("/candidates", verifyToken, authorize('admin'), controller.getAllCandidates)
router.get("/candidate/:id", verifyToken, authorize('admin'), controller.getCandidate)
router.get("/hiring-manager", verifyToken, authorize('admin'), controller.getHiringManagers)
router.patch("/update-user/:id", verifyToken, authorize('admin'), controller.updateUser)

module.exports = router