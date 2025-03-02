  // UserDTO
  class UserDTO {
    constructor(user) {
      this.id = user.id;
      this.name = user.name;
      this.email = user.email;
      this.avatar = user.avatar; // Menggantikan role dengan avatar (untuk URL dari cloud storage)
      this.provider = user.provider; // Menambahkan provider untuk login (misal: 'google', 'local')
      this.createdAt = user.createdAt;
      this.updatedAt = user.updatedAt;
    }

    static fromDatabaseModel(user) {
      return new UserDTO(user);
    }
  }

  // LoginRequestDTO
  class LoginRequestDTO {
    constructor(email, password) {
      this.email = email;
      this.password = password;
    }
  }

  // LoginResponseDTO
  class LoginResponseDTO {
    constructor(user, token) {
      this.user = new UserDTO(user);
      this.token = token;
    }
  }

  // UserResponseDTO
  class UserResponseDTO {
    constructor(user) {
      this.user = new UserDTO(user);
    }
  }

  // RegisterRequestDTO
  class RegisterRequestDTO {
    constructor(name, email, password, avatar, provider = 'local') {
      this.name = name;
      this.email = email;
      this.password = password;
      this.avatar = avatar; // Avatar opsional saat registrasi
      this.provider = provider; // Default 'local', bisa 'google' untuk login Google
    }
  }

  // RegisterResponseDTO
  class RegisterResponseDTO {
    constructor(user) {
      this.user = new UserDTO(user);
    }
  }

  // UpdateRequestDTO
  class UpdateRequestDTO {
    constructor(name, email, avatar) {
      this.name = name;
      this.email = email;
      this.avatar = avatar; // Update avatar (URL dari cloud storage)
    }
  }

  // ResetPasswordRequestDTO (Baru)
  class ResetPasswordRequestDTO {
    constructor(email) {
      this.email = email; // Email pengguna yang meminta reset password
    }
  }

  // ResetPasswordConfirmDTO (Baru)
  class ResetPasswordConfirmDTO {
    constructor(token, password) {
      this.token = token; // Token reset password yang dikirim ke email
      this.password = password; // Kata sandi baru
    }
  }

  // ResetPasswordResponseDTO (Baru)
  class ResetPasswordResponseDTO {
    constructor(message) {
      this.message = message; // Pesan sukses, misalnya "Password successfully reset"
    }
  }

  // Export semua DTO
  export { UserDTO, LoginRequestDTO, LoginResponseDTO, UserResponseDTO, RegisterRequestDTO, RegisterResponseDTO, UpdateRequestDTO, ResetPasswordRequestDTO, ResetPasswordConfirmDTO, ResetPasswordResponseDTO };
