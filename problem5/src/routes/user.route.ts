import { Router } from 'express';
import { body } from 'express-validator';
import * as userController from '../controllers/user.controller';
import User from '../models/user.model';

const router = Router();

// Routes
router.post('/', validateCreate(), userController.createUser);

router.get('/', userController.getAll);

router.get('/:userId', userController.getUserById);

router.put('/:userId', validateUpdate(), userController.updateUser);

router.delete('/:userId', userController.deleteUser);

export default router;
// Validate
function validateCreate() {
  return [
    body('username')
      .isString()
      .notEmpty()
      .custom(async value => {
        const user = await User.findOne({ username: value });
        if (user) {
          throw new Error('Username is exists');
        }
      }),
    body('age')
      .isNumeric()
      .isInt({ min: 1 })
      .withMessage('Age must be greater than 0'),
  ];
}
function validateUpdate() {
  return [
    body('username')
      .isString()
      .notEmpty()
      .custom(async value => {
        const user = await User.findOne({ username: value });
        if (user) {
          throw new Error('Username is exists');
        }
      }),
    body('age')
      .optional()
      .isNumeric()
      .isInt({ min: 1 })
      .withMessage('Age must be greater than 0'),
  ];
}
