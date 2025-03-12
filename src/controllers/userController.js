import userService from "../services/userService.js";
import {
  LoginRequestDTO,
  RegisterRequestDTO,
  UpdateRequestDTO,
  ResetPasswordRequestDTO,
  ResetPasswordConfirmDTO,
} from "../domain/dto/userDTO.js";
import { ERROR_MESSAGES } from "../constants/errorConstants.js";
import { STATUS_CODES } from "../constants/statuscodeConstants.js";

// Fungsi utilitas untuk response sukses
const buildSuccessResponse = (res, { data, message, statusCode }) => {
  return res.status(statusCode).json({ success: true, message, data });
};

// Fungsi utilitas untuk response error
const handleErrorResponse = (res, error) => {
  const statusCode = error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR;
  const message = error.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR;
  return res.status(statusCode).json({ success: false, message, data: null });
};

class UserController {
  // Registrasi pengguna
  async register(req, res) {
    try {
      const dto = new RegisterRequestDTO(
        req.body.name,
        req.body.email,
        req.body.number,
        req.body.password,
        null, // Avatar diisi di UserService
        req.body.provider || "local"
      );
      const result = await UserService.register(dto, req.file);
      return buildSuccessResponse(res, result);
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  // Login pengguna
  async login(req, res) {
    try {
      const dto = new LoginRequestDTO(req.body.email, req.body.password);
      const result = await UserService.login(dto);
      return buildSuccessResponse(res, result);
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  // Ambil pengguna berdasarkan ID
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const result = await UserService.getUserById(id);
      return buildSuccessResponse(res, result);
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  // Update pengguna
  async updateUser(req, res) {
    console.log("Request body:", req.body);
    console.log("Uploaded file:", req.file); // Logging untuk debug
    try {
      const { id } = req.params;
      const dto = new UpdateRequestDTO(
        req.body.name,
        req.body.email,
        null // Avatar diisi di UserService jika ada file
      );
      const result = await UserService.updateUser(id, dto, req.file); // Kirim file untuk update avatar
      return buildSuccessResponse(res, result);
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  // Hapus pengguna
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const result = await UserService.deleteUser(id);
      return buildSuccessResponse(res, result);
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  // Request reset password
  async requestResetPassword(req, res) {
    try {
      const dto = new ResetPasswordRequestDTO(req.body.email);
      const result = await UserService.requestResetPassword(dto);
      return buildSuccessResponse(res, result);
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }

  // Konfirmasi reset password
  async confirmResetPassword(req, res) {
    try {
      const dto = new ResetPasswordConfirmDTO(
        req.body.token,
        req.body.password
      );
      const result = await UserService.confirmResetPassword(dto);
      return buildSuccessResponse(res, result);
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  }
}

export default new UserController();
