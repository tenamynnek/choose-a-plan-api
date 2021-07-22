const R = require("ramda");
const planModel = require("../models/plan");

const getAllPlansWithServices = async () => {
  const plans = await planModel.findAllWithServices();
  return plans.map((result) => {
    return {
      ...result,
      serviceId: R.propOr("", "serviceId", result).split(",").map(Number),
    };
  });
};

module.exports = { getAllPlansWithServices };
