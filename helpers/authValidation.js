import { check } from 'express-validator';

exports.validSignUp = [
  check("firstName", "First Name is required")
    .notEmpty()
    .isLength({
      min: 4,
      max: 32,
    })
    .withMessage("First Name must be between 3 to 32 characters"),
  check("lastName", "Last Name is required")
  .notEmpty()
  .isLength({
    min: 4,
    max: 32,
  })
  .withMessage("Last Name must be between 3 to 32 characters"),
  check("email").isEmail().withMessage("Must be a valid email address"),
  check("password", "password is required").notEmpty(),
  check("password")
    .isLength({
      min: 8,
    })
    .withMessage("Password must contain at least 8 characters")
    .matches(/\d/)
    .withMessage("password must contain a number"),
];

exports.validSignIn =  [
  check("email").isEmail().withMessage("Must be a valid email address"),
  check("password", "password is required").notEmpty(),
  check("password")
    .isLength({
      min: 8,
    })
    .withMessage("Password must contain at least 8 characters")
    .matches(/\d/)
    .withMessage("password must contain a number"),
];
exports.forgotPasswordValidator = [
  check("email")
    .not()
    .isEmpty()
    .isEmail()
    .withMessage("Must be a valid email address"),
];

exports.resetPasswordValidator = [
  check("newPassword")
    .not()
    .isEmpty()
    .isLength({ min: 8 })
    .withMessage("Password must be at least  8 characters long"),
];