export interface JwtPayload {
  sub: number; // user id
  email: string;
  name: string;
  iat?: number;
  exp?: number;
}

export interface AuthResponse {
  access_token: string;
  user: {
    id: number;
    email: string;
    name: string;
    phone?: string;
  };
}