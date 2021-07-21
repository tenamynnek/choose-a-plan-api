const serviceModel = require("../models/service");

const getAllServices = async () => {
  return serviceModel.findAll();
};

module.exports = { getAllServices };
