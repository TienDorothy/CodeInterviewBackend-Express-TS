import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import User, { UserInput } from '../models/user.model';

const USER_FIELDS = ['username', 'age', 'createdAt', 'updatedAt'];
const DATE_FIELDS = ['createdAt', 'updatedAt'];
const QUERY_OPERATORS = ['gt', 'gte', 'lt', 'lte', 'ne'];

// Create a new user
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, age } = req.body;

  try {
    const newUser: UserInput = { username, age };
    const userCreated = await User.create(newUser);
    return res.status(201).json({ data: userCreated });
  } catch (error) {
    next(error);
  }
};

// api/users?username=Tien&age=lte:19&createdAt=2024-07-14&sort_by=-username,-createdAt
// api/users?username=Tien&age=19&sort_by=+username
export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const { username, sort_by, page, limit, ...filters } = req.query;

  const query: any = {};
  if (username) {
    query.username = { $regex: username, $options: 'i' }; // Case-insensitive regex search
  }

  // Handling filters: age, createdAt, updatedAt
  Object.entries(filters).forEach(([key, value]) => {
    console.log('key,value :>> ', key, value);
    if (USER_FIELDS.includes(key)) {
      const operator = (value as string).split(':');
      // Handle numeric values for age
      if (key === 'age') {
        if (operator.length === 2 && QUERY_OPERATORS.includes(operator[0])) {
          query[key] = { [`$${operator[0]}`]: parseInt(operator[1]) };
        } else query[key] = value;
      }

      // Handle dates for createdAt and updatedAt
      if (DATE_FIELDS.includes(key)) {
        if (
          operator.length === 2 &&
          QUERY_OPERATORS.includes(operator[0])
        ) {
          // Check if valid date
          const queryDate = new Date(operator[1]);
          const operatorDate = operator[0];
          query[key] = { [`$${operatorDate}`]: queryDate };
        } else {
          let queryDate= new Date(value as string);
          query[key] = {
            $gte: queryDate,
            $lt: new Date(queryDate.getTime() + 24 * 60 * 60 * 1000), // Add 1 day to queryDate
          };
        }
      }
    }
  });
  console.log('query :>> ', query);
  // Handling sort_by
  const sortFields = (sort_by as string)?.split(',') || [];
  const sorts: [string, 1 | -1][] = [];
  sortFields.forEach(item => {
    const field = item.replace(/^-/, ''); // Remove leading '-' if present
    if (USER_FIELDS.includes(field)) {
      const order = item.startsWith('-') ? -1 : 1;
      sorts.push([field, order]);
    }
  });

  // Pagination parameters
  const currentPage = parseInt(page as string) || 1;
  const pageSize = parseInt(limit as string) || 10;
  const skip = (currentPage - 1) * pageSize;
  try {
    const users = await User.find(query)
      .sort(sorts)
      .skip(skip)
      .limit(pageSize)
      .exec();

    return res.status(200).json({
      result: users.length,
      page: currentPage,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const userId = req.params.userId;
    console.log('userId :>> ', userId);
    const { username, age } = req.body;

    const user = await User.findById(userId);
    console.log('user :>> ', user);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.username = username;
    user.age = age;

    await user.save();
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const userId = req.params.userId;

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};
