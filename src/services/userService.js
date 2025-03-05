import UserRepository from "../repositories/userRepository.js";
import {
  LoginRequestDTO,
  LoginResponseDTO,
  RegisterRequestDTO,
  RegisterResponseDTO,
  UpdateRequestDTO,
  UserResponseDTO,
  ResetPasswordRequestDTO,
  ResetPasswordConfirmDTO,
  ResetPasswordResponseDTO,
} from "../domain/dto/userDTO.js";
import { ERROR_MESSAGES } from "../constants/errorConstants.js";
import { SUCCESS_MESSAGES } from "../constants/messageConstants.js";
import { STATUS_CODES } from "../constants/statuscodeConstants.js";
import jwt from "jsonwebtoken";

// Secret key untuk JWT (harus disimpan di .env di production)
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Fungsi utilitas untuk validasi DTO
const validateDTO = (dto, DTOClass) => {
  if (!(dto instanceof DTOClass)) {
    throwError(ERROR_MESSAGES.BAD_REQUEST, STATUS_CODES.BAD_REQUEST);
  }
};

// Fungsi utilitas untuk membungkus error
const throwError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error;
};

// Fungsi utilitas untuk membangun response
const buildResponse = (data, message, statusCode) => {
  return { data, message, statusCode };
};

class UserService {
  // Register User
  async register(registerRequestDTO) {
    validateDTO(registerRequestDTO, RegisterRequestDTO);
    const result = await UserRepository.createUser(registerRequestDTO);
    return buildResponse(result.data, result.message, result.statusCode);
  }

  // Login User
  async login(loginRequestDTO) {
    validateDTO(loginRequestDTO, LoginRequestDTO);
    const result = await UserRepository.loginUser(loginRequestDTO);
    const user = result.data.user;

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });
    const loginData = new LoginResponseDTO(user, token);

    return buildResponse(
      loginData,
      SUCCESS_MESSAGES.LOGIN_SUCCESS,
      STATUS_CODES.SUCCESS
    );
  }

  // Get User by ID
  async getUserById(id) {
    const user = await UserRepository.findUserById(id);
    if (!user) {
      throwError(ERROR_MESSAGES.USER_NOT_FOUND, STATUS_CODES.NOT_FOUND);
    }
    const data = new UserResponseDTO(user);
    return buildResponse(
      data,
      SUCCESS_MESSAGES.USER_RETRIEVED,
      STATUS_CODES.SUCCESS
    );
  }

  // Update User
  async updateUser(id, updateRequestDTO) {
    validateDTO(updateRequestDTO, UpdateRequestDTO);
    const result = await UserRepository.updateUser(id, updateRequestDTO);
    return buildResponse(result.data, result.message, result.statusCode);
  }

  // Delete User
  async deleteUser(id) {
    const result = await UserRepository.deleteUser(id);
    return buildResponse(result.data, result.message, result.statusCode);
  }

  // Request Reset Password
  async requestResetPassword(resetPasswordRequestDTO) {
    validateDTO(resetPasswordRequestDTO, ResetPasswordRequestDTO);
    const { email } = resetPasswordRequestDTO;
    const result = await UserRepository.requestResetPassword(email);
    const { resetToken, user } = result.data;

    // Placeholder untuk pengiriman email
    console.log(`Reset token for ${user.email}: ${resetToken}`); // Placeholder

    return buildResponse(
      null,
      SUCCESS_MESSAGES.RESET_PASSWORD_REQUESTED,
      STATUS_CODES.SUCCESS
    );
  }

  // Confirm Reset Password
  async confirmResetPassword(resetPasswordConfirmDTO) {
    validateDTO(resetPasswordConfirmDTO, ResetPasswordConfirmDTO);
    const { token, password } = resetPasswordConfirmDTO;
    const result = await UserRepository.confirmResetPassword(token, password);
    return buildResponse(result.data, result.message, result.statusCode);
  }
}

export default new UserService();
