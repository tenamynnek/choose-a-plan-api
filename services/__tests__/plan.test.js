const planModel = require("../../models/plan");
const planService = require("../plan");

describe("services - plan", () => {
  describe("getAllPlansWithServices", () => {
    test("expected service return correct data sharp", async () => {
      planModel.findAllWithServices = jest.fn(async () => {
        return [
          { id: 1, name: "Standard Plan", price: 0, serviceId: "1" },
          { id: 2, name: "Premium Plan", price: 388, serviceId: "1,2,3" },
        ];
      });

      const plans = await planService.getAllPlansWithServices();
      expect(plans).toStrictEqual([
        { id: 1, name: "Standard Plan", price: 0, serviceId: [1] },
        { id: 2, name: "Premium Plan", price: 388, serviceId: [1, 2, 3] },
      ]);
    });
  });
});
