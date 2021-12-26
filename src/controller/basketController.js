const { userModel, pantryModel, basketModel } = require("../models");

const { validator } = require("../utils");

const addBasket = async (req, res) => {
  try {
    const userId = req.params.userId;
    const pantryId = req.params.pantryId;
    const basketname = req.params.basketname;

    if (!validator.isValidObjectId(userId)) {
      return res
        .status(400)
        .send({ status: "Failure", msg: "enter a valid user id" });
    }

    if (!validator.isValidObjectId(pantryId)) {
      return res
        .status(400)
        .send({ status: "Failure", msg: "enter a pantry id" });
    }

    if (!validator.isValid(basketname)) {
      return res
        .status(400)
        .send({ status: "Failure", msg: "enter a basket name" });
    }

    const user = await userModel.findOne({ userId });

    if (!user) {
      return res.status(404).send({ status: "Failure", msg: "user not found" });
    }

    const pantry = await pantryModel.findOne({ _id: pantryId, user: userId });

    if (!pantry) {
      return res
        .status(404)
        .send({ status: "Failure", msg: "pantry not found" });
    }

    const newBasket = { name: basketname };

    const basketCreated = await basketModel.create(newBasket);

    await pantryModel.findOneAndUpdate(
      { _id: pantryId, user: userId },
      { $addToSet: { basket: basketCreated } },
      { new: true }
    );

    res.status(201).send({ status: "Success", basket: basketCreated });
  } catch (err) {
    res.status(500).send({ status: "Failure", msg: err.message });
  }
};

const getBasket = async (req, res) => {
  try {
    const userId = req.params.userId;
    const pantryId = req.params.pantryId;
    const basketname = req.params.basketname;

    if (!validator.isValidObjectId(userId)) {
      return res
        .status(400)
        .send({ status: "Failure", msg: "enter a valid user id" });
    }

    if (!validator.isValidObjectId(pantryId)) {
      return res
        .status(400)
        .send({ status: "Failure", msg: "enter a pantry id" });
    }

    if (!validator.isValid(basketname)) {
      return res
        .status(400)
        .send({ status: "Failure", msg: "enter a basket name" });
    }

    const user = await userModel.findOne({ userId });

    if (!user) {
      return res.status(404).send({ status: "Failure", msg: "user not found" });
    }

    const pantry = await pantryModel.findOne({ _id: pantryId, user: userId });

    if (!pantry) {
      return res
        .status(404)
        .send({ status: "Failure", msg: "pantry not found" });
    }

    const basket = await basketModel.findOne({ name: basketname });

    if (!basket) {
      return res
        .status(404)
        .send({ status: "Failure", msg: "basket not found" });
    }

    res.status(200).send({ status: "Success", basket: basket });
  } catch (err) {
    res.status(500).send({ status: "Failure", msg: err.message });
  }
};

const deleteBasket = async (req, res) => {
  try {
    const userId = req.params.userId;
    const pantryId = req.params.pantryId;
    const basketname = req.params.basketname;

    if (!validator.isValidObjectId(userId)) {
      return res
        .status(400)
        .send({ status: "Failure", msg: "enter a valid user id" });
    }

    if (!validator.isValidObjectId(pantryId)) {
      return res
        .status(400)
        .send({ status: "Failure", msg: "enter a pantry id" });
    }

    if (!validator.isValid(basketname)) {
      return res
        .status(400)
        .send({ status: "Failure", msg: "enter a basket name" });
    }

    const user = await userModel.findOne({ userId });

    if (!user) {
      return res.status(404).send({ status: "Failure", msg: "user not found" });
    }

    const pantry = await pantryModel.findOne({ _id: pantryId, user: userId });

    if (!pantry) {
      return res
        .status(404)
        .send({ status: "Failure", msg: "pantry not found" });
    }

    const basketDeleted = await basketModel.findOneAndRemove({
      name: basketname,
    });

    console.log(basketDeleted);

    await pantryModel.findOneAndUpdate(
      { _id: pantryId, user: userId },
      { $pull: { basket: basketDeleted._id } },
      { new: true }
    );

    if (!basketDeleted) {
      return res
        .status(404)
        .send({ status: "Failure", msg: "basket already deleted" });
    }

    res.status(200).send({ status: "Success", msg: "basket deleted" });
  } catch (err) {
    res.status(500).send({ status: "Failure", msg: err.message });
  }
};

const updateBasket = async (req, res) => {
  try {
    const userId = req.params.userId;
    const pantryId = req.params.pantryId;
    const basketname = req.params.basketname;

    if (!validator.isValidObjectId(userId)) {
      return res
        .status(400)
        .send({ status: "Failure", msg: "enter a valid user id" });
    }

    if (!validator.isValidObjectId(pantryId)) {
      return res
        .status(400)
        .send({ status: "Failure", msg: "enter a pantry id" });
    }

    if (!validator.isValid(basketname)) {
      return res
        .status(400)
        .send({ status: "Failure", msg: "enter a basket name" });
    }

    const user = await userModel.findOne({ userId });

    if (!user) {
      return res.status(404).send({ status: "Failure", msg: "user not found" });
    }

    const pantry = await pantryModel.findOne({ _id: pantryId, user: userId });

    if (!pantry) {
      return res
        .status(404)
        .send({ status: "Failure", msg: "pantry not found" });
    }

    let value = Object.values(req.body);

    const basket = await basketModel.findOneAndUpdate(
      { name: basketname },
      { $set: { key: value[0] } },
      { new: true }
    );

    if (!basket) {
      return res
        .status(404)
        .send({ status: "Failure", msg: "basket not found" });
    }

    res.status(200).send({ status: "Success", newkey: basket.key });
  } catch (err) {
    res.status(500).send({ status: "Failure", msg: err.message });
  }
};

module.exports = {
  addBasket,
  getBasket,
  deleteBasket,
  updateBasket,
};
