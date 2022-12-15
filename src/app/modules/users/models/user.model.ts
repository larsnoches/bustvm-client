export interface User {
  id: number;
  username: string;
  password?: string;
  enabled: boolean;
  authorities?: Array<Authority>;
}

export interface Authority {
  id: number;
  name: string;
}

export interface UserRequestDto {
  username: string;
  password?: string;
  enabled: boolean;
  authorities?: Array<Authority>;
}
