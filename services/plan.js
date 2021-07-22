const R = require("ramda");
const planModel = require("../models/plan");
const serviceModel = require("../models/service");
const db = require("../db");

const getAllPlansWithServices = async () => {
  const plans = await planModel.findAllWithServices();
  return plans.map((result) => {
    return {
      ...result,
      serviceId: R.propOr("", "serviceId", result).split(",").map(Number),
    };
  });
};

const createNewPlan = async (name, price, serviceIds) => {
  const connection = await db.getConnection();

  await connection.beginTransaction();

  try {
    const result = await planModel.createNewPlan(name, price, connection);
    const planId = result.insertId;

    for (const serviceId of serviceIds) {
      await serviceModel.createPlanService(planId, serviceId, connection);
    }
    await connection.commit();
    await connection.release();
  } catch (e) {
    await connection.rollback();
    await connection.release();
    throw e;
  }

  return true;
};

module.exports = { getAllPlansWithServices, createNewPlan };
