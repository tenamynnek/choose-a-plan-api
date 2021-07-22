const db = require("../db");

module.exports = {
  findAll: async () => {
    const results = await db.query("select * from services");
    return results[0];
  },
  createPlanService: async (planId, serviceId, connection) => {
    const sql = "insert into plan_services(planId, serviceId) values(?, ?)";
    let result;
    if (connection) {
      result = await connection.execute(sql, [planId, serviceId]);
    } else {
      result = await db.query(sql, [planId, serviceId]);
    }
    return result[0];
  },
};
