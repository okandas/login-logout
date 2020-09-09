export interface SignUp {
  email: string;
  mobile: string;
  password: string;
  username: string;
}

export interface SignIn {
  email: string;
  password: string;
}

export interface Token {
  token: string;
}

export interface Mail {
  email: string;
}

export interface User {
  email: string;
  username: string;
  mobile: string;
  created: string;
}


export interface AuthenticatedUser {
  username: string;
  id: number;
}


export interface TokenServiceInstance {
  decode (data: Token): AuthenticatedUser | null
  decoded (): AuthenticatedUser | null
  loggedIn (): boolean
  remove (): void
  token (): string | undefined 
}

