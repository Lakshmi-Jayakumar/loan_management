const moment = require("moment");

module.exports = {
  async create(req, res) {
    try {
      console.log(req.body);
      const { amount, tenure } = req.body;
      let totalPayableAmount = null;
      let principleEmi = null;
      let emiDetails = [];
      const loanDate = moment().format("Do MMM YYYY");
      totalPayableAmount = amount + (12 / 100) * amount;
      principleEmi = totalPayableAmount / tenure - 10;
      for (let i = 1; i <= tenure; i++) {
        let emiObject = {};
        emiObject.emi_number = i;
        emiObject.emi_principle = principleEmi;
        emiObject.emi_interest = 10;
        emiObject.emi_total = principleEmi + 10;
        emiObject.emi_principle_remaining =
          totalPayableAmount - ((emiObject.emi_total) * i);
        let nextEMIDate = moment().add(i, "months").calendar();
        emiObject.emi_date = moment(nextEMIDate).format("Do MMM YYYY");
        emiDetails.push(emiObject);
      }

      let result = {};
      result.loan_creation_date = loanDate;
      result.principle_amount = amount;
      result.no_of_emis = tenure;
      result.total_payable_amount = totalPayableAmount;
      result.emi_details = emiDetails;

      res.status(200).send(result);
    } catch (error) {
      throw error;
    }
  },
};
