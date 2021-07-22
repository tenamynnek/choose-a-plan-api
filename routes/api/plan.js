const asyncHandler = require("../../middlewares/asyncHandler");

const planService = require("../../services/plan");

const getAllPlansWithServices = asyncHandler(async (req, res, next) => {
  const plans = await planService.getAllPlansWithServices();
  res.status(200).send(plans);
});

const createNewPlan = asyncHandler(async (req, res, next) => {
  const {
    payload: { value: payload },
  } = req.swagger.params;
  const { name, price, serviceId } = payload;

  await planService.createNewPlan(name, price, serviceId);

  res.status(200).send({ status: "created" });
});

module.exports = {
  getAllPlansWithServices,
  createNewPlan,
};
