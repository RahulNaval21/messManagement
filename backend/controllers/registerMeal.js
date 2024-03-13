const User = require("../models/User");
const Meals = require("../models/Meals");

exports.registerMeal = async (req, res) => {
  try {
    let creditPoints = req.body.creditPoints;
    console.log(creditPoints);

    if (creditPoints < 1) {
      return res.status(400).json({
        success: false,
        message: `You don't have enough token`,
      });
    }

    creditPoints--;
    console.log(creditPoints);

    return res
      .status(200)
      .json({ success: true, message: "Meal Registered Succ." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
