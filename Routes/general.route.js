const express = require('express');
const router = express.Router()
const controller = require("../Controller/general.controller")

router.get('/highest-paid-job', controller.highestPaid)
router.get('/most-applied-job', controller.mostApplied)

module.exports = router