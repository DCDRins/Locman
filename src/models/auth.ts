
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  role: {
    id: number;
    name: string; // PARTICIPANT | SMBD | ... | ...;
    description: string;
  }
}

export interface AuthParams {
  login: string;
  password: string;
}
