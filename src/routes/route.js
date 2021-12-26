const express = require("express");

const router = express.Router();

const {
  userController,
  pantryController,
  basketController,
} = require("../controller");

router.post("/signup", userController.signup);

router.post("/:userId/createPantry", pantryController.createPantry);
router.get("/:userId/pantry/:pantryId", pantryController.getPantry);

router.post(
  "/:userId/pantry/:pantryId/basket/:basketname",
  basketController.addBasket
);
router.get(
  "/:userId/pantry/:pantryId/basket/:basketname",
  basketController.getBasket
);
router.delete(
  "/:userId/pantry/:pantryId/basket/:basketname",
  basketController.deleteBasket
);
router.put(
  "/:userId/pantry/:pantryId/basket/:basketname",
  basketController.updateBasket
);

module.exports = router;
