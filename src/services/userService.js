import UserRepository from '../repositories/userRepository.js';
import S3Service from './s3Service.js';
import { LoginRequestDTO, LoginResponseDTO, RegisterRequestDTO, RegisterResponseDTO, UpdateRequestDTO, UserResponseDTO, ResetPasswordRequestDTO, ResetPasswordConfirmDTO, ResetPasswordResponseDTO } from '../domain/dto/userDTO.js';
import { ERROR_MESSAGES } from '../constants/errorConstants.js';
import { SUCCESS_MESSAGES } from '../constants/messageConstants.js';
import { STATUS_CODES } from '../constants/statuscodeConstants.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Validasi DTO
const validateDTO = (dto, DTOClass) => {
  if (!(dto instanceof DTOClass)) {
    throwError(ERROR_MESSAGES.BAD_REQUEST, STATUS_CODES.BAD_REQUEST);
  }
};

// Helper untuk melempar error
const throwError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error;
};

// Helper untuk membangun response
const buildResponse = (data, message, statusCode) => {
  return { data, message, statusCode };
};

class UserService {
  // Registrasi pengguna dengan upload avatar
  async register(registerRequestDTO, file) {
    validateDTO(registerRequestDTO, RegisterRequestDTO);

    if (file) {
      try {
        const avatarUrl = await S3Service.uploadFile(file);
        registerRequestDTO.avatar = avatarUrl; // Simpan URL avatar ke DTO
      } catch (error) {
        throwError(`${ERROR_MESSAGES.INTERNAL_SERVER_ERROR}: Failed to upload avatar to S3 - ${error.message}`, STATUS_CODES.INTERNAL_SERVER_ERROR);
      }
    }

    const result = await UserRepository.createUser(registerRequestDTO);
    return buildResponse(result.data, result.message, result.statusCode);
  }

  // Login pengguna
  async login(loginRequestDTO) {
    validateDTO(loginRequestDTO, LoginRequestDTO);

    const result = await UserRepository.loginUser(loginRequestDTO);
    const user = result.data.user;

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    const loginData = new LoginResponseDTO(user, token);

    return buildResponse(loginData, SUCCESS_MESSAGES.LOGIN_SUCCESS, STATUS_CODES.SUCCESS);
  }

  // Ambil pengguna berdasarkan ID
  async getUserById(id) {
    const user = await UserRepository.findUserById(id);
    if (!user) {
      throwError(ERROR_MESSAGES.USER_NOT_FOUND, STATUS_CODES.NOT_FOUND);
    }
    const data = new UserResponseDTO(user);
    return buildResponse(data, SUCCESS_MESSAGES.USER_RETRIEVED, STATUS_CODES.SUCCESS);
  }

  // Update pengguna dengan opsi upload avatar
  async updateUser(id, updateRequestDTO, file) {
    validateDTO(updateRequestDTO, UpdateRequestDTO);

    if (file) {
      try {
        const avatarUrl = await S3Service.uploadFile(file, 'avatars');
        updateRequestDTO.avatar = avatarUrl; // Simpan URL avatar ke DTO
      } catch (error) {
        throwError(`${ERROR_MESSAGES.INTERNAL_SERVER_ERROR}: Failed to upload avatar to S3 - ${error.message}`, STATUS_CODES.INTERNAL_SERVER_ERROR);
      }
    }

    const result = await UserRepository.updateUser(id, updateRequestDTO);
    return buildResponse(result.data, result.message, result.statusCode);
  }

  // Hapus pengguna
  async deleteUser(id) {
    const result = await UserRepository.deleteUser(id);
    return buildResponse(result.data, result.message, result.statusCode);
  }

  // Request reset password
  async requestResetPassword(resetPasswordRequestDTO) {
    validateDTO(resetPasswordRequestDTO, ResetPasswordRequestDTO);
    const { email } = resetPasswordRequestDTO;

    const result = await UserRepository.requestResetPassword(email);
    const { resetToken, user } = result.data;
    console.log(`Reset token for ${user.email}: ${resetToken}`);

    return buildResponse(null, SUCCESS_MESSAGES.RESET_PASSWORD_REQUESTED, STATUS_CODES.SUCCESS);
  }

  // Konfirmasi reset password
  async confirmResetPassword(resetPasswordConfirmDTO) {
    validateDTO(resetPasswordConfirmDTO, ResetPasswordConfirmDTO);
    const { token, password } = resetPasswordConfirmDTO;

    const result = await UserRepository.confirmResetPassword(token, password);
    return buildResponse(result.data, result.message, result.statusCode);
  }
}

export default new UserService();
