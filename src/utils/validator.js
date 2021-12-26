const mongoose = require("mongoose");

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const validateEmail = function (email) {
  return emailRegex.test(email);
};

const isValid = function (value) {
  if (typeof value === "object" && value.length === 0) return false;
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

const isValidObjectId = function (objectId) {
  return mongoose.Types.ObjectId.isValid(objectId);
};

module.exports = {
  validateEmail,
  emailRegex: emailRegex,
  isValid,
  isValidObjectId,
};
