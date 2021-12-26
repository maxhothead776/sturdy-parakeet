const { userModel } = require("../models");

const { validator } = require("../utils");

const signup = async (req, res) => {
  try {
    let email = req.body.email;

    if (!validator.isValid(email)) {
      return res
        .status(400)
        .send({ status: "Failure", msg: "enter the email" });
    }

    if (!validator.validateEmail(email)) {
      return res
        .status(400)
        .send({ status: "Failure", msg: "enter the valid email" });
    }

    const newUser = { email };

    const userCreated = await userModel.create(newUser);

    res.status(201).send({ status: "Success", user: userCreated });
  } catch (err) {
    res.status(500).send({ status: "Failure", msg: err.message });
  }
};

module.exports = { signup };
