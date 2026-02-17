import type { RequestHandler } from 'express';
import { Task } from '../models/Task.js';
import { sendSuccess } from '../utils/http.js';

export const getTasks: RequestHandler = async (req, res, next) => {
  try {
    const { search = '', status } = req.query as { search?: string; status?: 'pending' | 'completed' };

    const query: Record<string, unknown> = {
      userId: req.user?.userId
    };

    if (status && ['pending', 'completed'].includes(status)) {
      query.status = status;
    }

    if (search.trim()) {
      query.$or = [
        { title: { $regex: search.trim(), $options: 'i' } },
        { description: { $regex: search.trim(), $options: 'i' } }
      ];
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });

    return sendSuccess(res, 200, 'Tasks fetched successfully', tasks);
  } catch (error) {
    return next(error);
  }
};

export const createTask: RequestHandler = async (req, res, next) => {
  try {
    const task = await Task.create({ ...req.body, userId: req.user?.userId });
    return sendSuccess(res, 201, 'Task created successfully', task);
  } catch (error) {
    return next(error);
  }
};

export const updateTask: RequestHandler = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user?.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    return sendSuccess(res, 200, 'Task updated successfully', task);
  } catch (error) {
    return next(error);
  }
};

export const deleteTask: RequestHandler = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user?.userId });

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    return sendSuccess(res, 200, 'Task deleted successfully');
  } catch (error) {
    return next(error);
  }
};
