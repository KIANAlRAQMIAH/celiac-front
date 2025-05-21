export interface LoginCredentials {
  username: string;
  password: string;
}
export interface LoginResponse {
  token: string;
}
export interface User {
  id: string;
  name: string;
  email: string;
}
