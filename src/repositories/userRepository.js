import User from '../domain/model/userModel.js';
import { Op } from 'sequelize';
import bcryptjs from 'bcryptjs';
import { UserDTO, LoginResponseDTO, RegisterResponseDTO, UserResponseDTO, ResetPasswordResponseDTO } from '../domain/dto/userDTO.js';
import { ERROR_MESSAGES } from '../constants/errorConstants.js';
import { SUCCESS_MESSAGES } from '../constants/messageConstants.js';
import { STATUS_CODES } from '../constants/statuscodeConstants.js';

class UserRepository {
  // Helper untuk membungkus error dengan status code
  #throwError(message, statusCode) {
    const error = new Error(message);
    error.statusCode = statusCode;
    throw error;
  }

  // Create User (Register)
  async createUser(registerRequestDTO) {
    try {
      const { name, email, password, avatar, provider } = registerRequestDTO;
      const hashedPassword = password ? await bcryptjs.hash(password, 10) : null;

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        avatar,
        provider,
      });

      return {
        data: new RegisterResponseDTO(user),
        message: SUCCESS_MESSAGES.USER_CREATED,
        statusCode: STATUS_CODES.CREATED,
      };
    } catch (error) {
      this.#throwError(ERROR_MESSAGES.INTERNAL_SERVER_ERROR, STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  }

  // Find User by Email
  async findUserByEmail(email) {
    const user = await User.findOne({ where: { email } });
    if (!user) return null;
    return new UserDTO(user);
  }

  // Login User
  async loginUser(loginRequestDTO) {
    try {
      const { email, password } = loginRequestDTO;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        this.#throwError(ERROR_MESSAGES.USER_NOT_FOUND, STATUS_CODES.NOT_FOUND);
      }

      if (user.provider !== 'local') {
        this.#throwError(ERROR_MESSAGES.INVALID_CREDENTIALS, STATUS_CODES.BAD_REQUEST);
      }

      const isPasswordValid = await bcryptjs.compare(password, user.password);
      if (!isPasswordValid) {
        this.#throwError(ERROR_MESSAGES.INVALID_CREDENTIALS, STATUS_CODES.UNAUTHORIZED);
      }

      return {
        data: new LoginResponseDTO(user, null), // Token akan ditambahkan di service
        message: 'Login successful',
        statusCode: STATUS_CODES.SUCCESS,
      };
    } catch (error) {
      if (!error.statusCode) {
        this.#throwError(ERROR_MESSAGES.INTERNAL_SERVER_ERROR, STATUS_CODES.INTERNAL_SERVER_ERROR);
      }
      throw error;
    }
  }

  // Find User by ID
  async findUserById(id) {
    const user = await User.findByPk(id);
    if (!user) {
      this.#throwError(ERROR_MESSAGES.USER_NOT_FOUND, STATUS_CODES.NOT_FOUND);
    }
    return new UserDTO(user);
  }

  // Update User
  async updateUser(id, updateRequestDTO) {
    try {
      const { name, email, avatar } = updateRequestDTO;
      const user = await User.findByPk(id);

      if (!user) {
        this.#throwError(ERROR_MESSAGES.USER_NOT_FOUND, STATUS_CODES.NOT_FOUND);
      }

      await user.update({
        name: name || user.name,
        email: email || user.email,
        avatar: avatar || user.avatar,
      });

      return {
        data: new UserResponseDTO(user),
        message: SUCCESS_MESSAGES.USER_UPDATED,
        statusCode: STATUS_CODES.SUCCESS,
      };
    } catch (error) {
      this.#throwError(ERROR_MESSAGES.INTERNAL_SERVER_ERROR, STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  }

  // Delete User
  async deleteUser(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        this.#throwError(ERROR_MESSAGES.USER_NOT_FOUND, STATUS_CODES.NOT_FOUND);
      }

      await user.destroy();
      return {
        data: null,
        message: SUCCESS_MESSAGES.USER_DELETED,
        statusCode: STATUS_CODES.SUCCESS,
      };
    } catch (error) {
      this.#throwError(ERROR_MESSAGES.INTERNAL_SERVER_ERROR, STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  }

  // Request Reset Password
  async requestResetPassword(email) {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        this.#throwError(ERROR_MESSAGES.USER_NOT_FOUND, STATUS_CODES.NOT_FOUND);
      }

      const resetToken = Math.random().toString(36).substring(2, 15); // Lebih baik gunakan JWT di production
      const resetTokenExpires = Date.now() + 3600000; // 1 jam

      await user.update({
        resetToken,
        resetTokenExpires,
      });

      return {
        data: { resetToken, user: new UserDTO(user) },
        message: 'Reset password link generated',
        statusCode: STATUS_CODES.SUCCESS,
      };
    } catch (error) {
      this.#throwError(ERROR_MESSAGES.INTERNAL_SERVER_ERROR, STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  }

  // Confirm Reset Password
  async confirmResetPassword(token, password) {
    try {
      const user = await User.findOne({
        where: {
          resetToken: token,
          resetTokenExpires: { [Op.gt]: Date.now() },
        },
      });

      if (!user) {
        this.#throwError('Invalid or expired token', STATUS_CODES.BAD_REQUEST);
      }

      const hashedPassword = await bcryptjs.hash(password, 10);
      await user.update({
        password: hashedPassword,
        resetToken: null,
        resetTokenExpires: null,
      });

      return {
        data: new ResetPasswordResponseDTO('Password successfully reset'),
        message: SUCCESS_MESSAGES.USER_UPDATED,
        statusCode: STATUS_CODES.SUCCESS,
      };
    } catch (error) {
      if (!error.statusCode) {
        this.#throwError(ERROR_MESSAGES.INTERNAL_SERVER_ERROR, STATUS_CODES.INTERNAL_SERVER_ERROR);
      }
      throw error;
    }
  }
}

export default new UserRepository();
