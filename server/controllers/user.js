// utils
import makeValidation from '@withvoid/make-validation';
// models
import UserModel, { USER_TYPES } from '../models/User.js';
import { encode } from '../middlewares/jwt.js';

export default {
  onGetAllUsers: async (req, res) => {
    try {
      const users = await UserModel.getUsers();
      return res.status(200).json({ success: true, users });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },
  onGetUserById: async (req, res) => {
    try {
      const user = await UserModel.getUserById(req.params.id);
      return res.status(200).json({ success: true, user });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },
  onCreateUser: async (req, res) => {
    try {
      const validation = makeValidation(types => ({
        payload: req.body,
        checks: {
          username:{type: types.string},
          firstName: { type: types.string },
          lastName: { type: types.string },
          type: { type: types.enum, options: { enum: USER_TYPES } },
        }
      }));
      if (!validation.success) return res.status(400).json({ ...validation });

      const { firstName, lastName, type, username } = req.body;
      const user = await UserModel.createUser(firstName, lastName, type, username);
      return res.status(200).json({ success: true, user });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },
  onDeleteUserById: async (req, res) => {
    try {
      const user = await UserModel.deleteByUserById(req.params.id);
      return res.status(200).json({ 
        success: true, 
        message: `Deleted a count of ${user.deletedCount} user.` 
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },
  onLoginUser: async (req, res) => {
    try {
      const { username } = req.body;
      const user = await UserModel.loginUser(username);
      return res.status(200).json({ success: true, user, authorization: req.authToken });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  }
}