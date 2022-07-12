const express = require("express");
const router = express.Router();

const { ctrlWrapper } = require("../../helpers");
const { validation, auth } = require("../../middlewares");
const ctrl = require("../../controllers/training");

const { schemas } = require("../../models/training");

router.post("/", validation(schemas.add), auth, ctrlWrapper(ctrl.add));

module.exports = router;
