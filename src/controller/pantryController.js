const { userModel, pantryModel } = require("../models");

const { validator } = require("../utils");

const createPantry = async (req, res) => {
  try {
    const userId = req.params.userId;
    const name = req.body.name;

    if (!validator.isValidObjectId(userId)) {
      return res
        .status(400)
        .send({ status: "Failure", msg: "enter a valid user id" });
    }

    const user = await userModel.findOne({ userId });

    if (!user) {
      return res.status(404).send({ status: "Failure", msg: "user not found" });
    }

    if (!validator.isValid(name)) {
      return res.status(400).send({ status: "Failure", msg: "enter the name" });
    }

    const newPantry = { name, user: userId };

    const pantryCreated = await pantryModel.create(newPantry);

    res.status(201).send({
      status: "Success",
      msg: "please save the pantryId for future refrence",
      pantryId: pantryCreated._id,
    });
  } catch (err) {
    res.status(500).send({ status: "Faliure", msg: err.message });
  }
};

const getPantry = async (req, res) => {
  try {
    const userId = req.params.userId;
    const pantryId = req.params.pantryId;

    if (!validator.isValidObjectId(userId)) {
      return res
        .status(400)
        .send({ status: "Failure", msg: "enter the valid user id" });
    }

    if (!validator.isValidObjectId(pantryId)) {
      return res
        .status(400)
        .send({ status: "Failure", msg: "enter the valid panty id" });
    }

    const user = await userModel.findOne({ userId });

    if (!user) {
      return res.status(404).send({ status: "Failure", msg: "user not found" });
    }
    const pantry = await pantryModel.find({ _id: pantryId, user: userId });

    if (pantry.length === 0) {
      return res
        .status(404)
        .send({ status: "Failure", msg: "pantry not found" });
    }

    res.status(200).send({ status: "Success", pantry: pantry });
  } catch (err) {
    res.status(500).send({ status: "Faliure", msg: err.message });
  }
};

module.exports = {
  createPantry,
  getPantry,
};
