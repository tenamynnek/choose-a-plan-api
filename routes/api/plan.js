const asyncHandler = require("../../middlewares/asyncHandler");

const planService = require("../../services/plan");

const getAllPlansWithServices = asyncHandler(async (req, res, next) => {
  const plans = await planService.getAllPlansWithServices();
  res.status(200).send(plans);
});

module.exports = {
  getAllPlansWithServices,
};
