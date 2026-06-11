
import { body, validationResult } from 'express-validator';

function validate(req,res,next){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export const registerValidator = [
    body('username').notEmpty().isString().withMessage("username must be string"),
    body('email').notEmpty().isEmail().withMessage("email is not valid"),
    body('password').notEmpty().isLength({ min: 6 }).withMessage("password must be 6 characters"),
    validate
]