const User = require("../models/User");
const Meals = require("../models/Meals");

const mailSender = require("../utils/mailSender");
const { registered } = require("../mailTemplates/registered");
exports.registerMeal = async (req, res) => {
  // try {
  //   let creditPoints = req.body.creditPoints;
  //   console.log(creditPoints);

  //   if (creditPoints < 1) {
  //     return res.status(400).json({
  //       success: false,
  //       message: `You don't have enough token`,
  //     });
  //   }

  //   creditPoints--;
  //   console.log(creditPoints);

  //   return res
  //     .status(200)
  //     .json({ success: true, message: "Meal Registered Succ." });
  // } catch (error) {
  //   console.log(error);
  //   return res.status(500).json({
  //     success: false,
  //     error: error.message,
  //   });
  // }

  try {
    const userDetails = await User.findById(req.user.id);
    const cookie = req.cookies;
    console.log(cookie);

    const userEmail = userDetails.email;
    const { mealType, mealPrice } = req.body;
    const date = new Date();
    const findUser = await Meals.findOne({ email: userEmail });
    console.log("email", userEmail);
    if (findUser) {
      if (findUser.mealType === mealType) {
        return res.status(400).json({
          success: false,
          message: "You have already registered for meal",
        });
      }
    }

    let credits = userDetails.creditPoints;
    if (credits < mealPrice) {
      return res
        .status(401)
        .json({ success: false, message: "Not enough credits to buy meal" });
    }

    credits = credits - mealPrice;
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { creditPoints: credits },
      { new: true }
    );

    const newRegisteredMeal = await Meals.create({
      email: userDetails.email,
      dateOfMeal: date.getDate(),
      mealType: mealType,
      mealPrice: mealPrice,
    });
    try {
      const emailResponse = await mailSender(
        updatedUserDetails.email,
        "Meal Registered Successfully",
        registered(
          updatedUserDetails.email,
          `Meal is registered for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName} successfully`
        )
      );
      console.log("Email sent successfully:", emailResponse.response);
    } catch (error) {
      console.error("Error occurred while sending mail:", error);
      return res.status(400).json({
        success: false,
        message: "Error occurred while sending mail",
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Meal is Registered Successfully",
    });
  } catch (error) {
    console.log("Error occurred while registering for meal", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while registering for meal",
      error: error.message,
    });
  }
};
