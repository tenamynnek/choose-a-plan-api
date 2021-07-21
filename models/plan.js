const db = require("../db");

module.exports = {
  findAllWithServices: async () => {
    const results = await db.query(
      "select p.*, group_concat(ps.service_id order by ps.id) as service_id from plans p, plan_services ps where p.id=ps.plan_id group by p.id"
    );

    return results[0];
  },
};
