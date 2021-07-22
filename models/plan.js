const db = require("../db");

module.exports = {
  findAllWithServices: async () => {
    const results = await db.query(
      "select p.*, group_concat(ps.serviceId order by ps.id) as serviceId from plans p, plan_services ps where p.id=ps.planId group by p.id"
    );

    return results[0];
  },
  createNewPlan: async (name, price, connection) => {
    const sql = "insert into plans(name, price) values(?, ?)";
    let result;
    if (connection) {
      result = await connection.execute(sql, [name, price]);
    } else {
      result = await db.query(sql, [name, price]);
    }
    return result[0];
  },
};
