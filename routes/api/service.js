const asyncHandler = require("../../middlewares/asyncHandler");

const serviceService = require("../../services/service");

const getAllServices = asyncHandler(async (req, res, next) => {
  const services = await serviceService.getAllServices();
  res.status(200).send(services);
});

module.exports = {
  getAllServices,
};
