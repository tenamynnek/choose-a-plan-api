const db = require("../db");

module.exports = {
  findAll: async () => {
    const results = await db.query("select * from services");
    return results[0];
  },
};
