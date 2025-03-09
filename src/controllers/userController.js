import UserService from '../services/userService.js';
import { LoginRequestDTO, RegisterRequestDTO, UpdateRequestDTO, ResetPasswordRequestDTO, ResetPasswordConfirmDTO } from '../domain/dto/userDTO.js';
import { ERROR_MESSAGES } from '../constants/errorConstants.js';
import { STATUS_CODES } from '../constants/statuscodeConstants.js';

// Fungsi utilitas untuk membangun respons sukses
const buildSuccessResponse = (res, { data, message, statusCode }) => {
  return res.status(statusCode).json({ success: true, message, data });
};

// Fungsi utilitas untuk menangani error
const handleErrorResponse = (res, error) => {
  const statusCode = error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR;
  const message = error.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR;
  return res.status(statusCode).json({ success: false, message, data: null });
};

class UserController {
  // Register User
  async register(req, res) {
    try {
      const dto = new RegisterRequestDTO(req.body.name, req.body.email, req.body.number,req.body.password, req.body.avatar, req.body.provider);
      const result = await UserService.register(dto);
      return buildSuccessResponse(res, result);
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  // Login User
  async login(req, res) {
    try {
      const dto = new LoginRequestDTO(req.body.email, req.body.password);
      const result = await UserService.login(dto);
      return buildSuccessResponse(res, result);
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  // Get User by ID
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const result = await UserService.getUserById(id);
      return buildSuccessResponse(res, result);
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  // Update User
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const dto = new UpdateRequestDTO(req.body.name, req.body.email, req.body.avatar);
      const result = await UserService.updateUser(id, dto);
      return buildSuccessResponse(res, result);
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  // Delete User
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const result = await UserService.deleteUser(id);
      return buildSuccessResponse(res, result);
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  // Request Reset Password
  async requestResetPassword(req, res) {
    try {
      const dto = new ResetPasswordRequestDTO(req.body.email);
      const result = await UserService.requestResetPassword(dto);
      return buildSuccessResponse(res, result);
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  // Confirm Reset Password
  async confirmResetPassword(req, res) {
    try {
      const dto = new ResetPasswordConfirmDTO(req.body.token, req.body.password);
      const result = await UserService.confirmResetPassword(dto);
      return buildSuccessResponse(res, result);
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }
}

export default new UserController();
