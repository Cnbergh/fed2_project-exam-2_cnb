// types.ts
export interface User {
    name: string;
    email: string;
    avatar?: string;
  }
  
  export interface AuthState {
    token: string | null;
    user: User | null;
    apiKey: string | null;
  }
  