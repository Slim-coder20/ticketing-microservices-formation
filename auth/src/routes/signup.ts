import express, { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be a valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send(errors.array());
      }
      const { email, password } = req.body;
      console.log("Creating a user ...");
      res.status(201).send({});
    } catch (err) {
      next(err);
    }
  },
);

export { router as signupRouter };
