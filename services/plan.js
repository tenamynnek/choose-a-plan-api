const R = require("ramda");
const planModel = require("../models/plan");

const getAllPlansWithServices = async () => {
  const plans = await planModel.findAllWithServices();
  return plans.map((result) => {
    return {
      ...result,
      serviceId: R.propOr("", "service_id", result).split(","),
    };
  });
};

module.exports = { getAllPlansWithServices };
