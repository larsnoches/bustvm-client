export interface UpdateUserRequestDto {
  email: string;
  lastname: string;
  firstname: string;
  middlename: string;
  isEnabled: boolean;
  isManager: boolean;
}

export interface CreateUserRequestDto extends UpdateUserRequestDto {
  password: string;
}

export interface GetUserResponseDto extends UpdateUserRequestDto {
  id: number;
}
