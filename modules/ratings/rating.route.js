const checkLogin = require("../../middlewares/checkLogin");
const validateRequest = require("../../middlewares/validateRequest");
const ratingValidations = require("./rating.validations")
const ratingController = require("./ratings.controller");

const ratingRouter = require("express").Router();

// public route
ratingRouter.get("/", ratingController.getAllRatings);

ratingRouter.get("/:productId", ratingController.getRatingsByProduct);

// protected route
ratingRouter.post("/", checkLogin, validateRequest(ratingValidations.createRatingValidation), ratingController.createRating);

ratingRouter.put("/:id", checkLogin, ratingController.updateRating);

ratingRouter.delete("/:id", checkLogin, ratingController.deleteRating)


module.exports = ratingRouter;