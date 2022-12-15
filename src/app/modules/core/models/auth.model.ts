export interface AuthenticationRequestDto {
  email: string;
  password: string;
}

export interface AuthenticationResponseDto {
  accessToken: string;
  refreshToken: string;
}

export interface RegistrationRequestDto {
  email: string;
  password: string;
}

export interface RegistrationResponseDto {
  id: number;
  email: string;
  userRole: string;
}
