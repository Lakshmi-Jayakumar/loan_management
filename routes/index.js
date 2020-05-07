const express = require('express');
const router = express.Router();
const LoanManagement = require('../services/LoanManagement');

/* GET loan API. */
router.post('/loan/create', LoanManagement.create);


module.exports = router;
