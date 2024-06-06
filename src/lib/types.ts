// types.ts
export interface User {
    name: string;
    email: string;
    avatar?: {
      url: string;
      alt?: string;
    };
    venueManager?: boolean;
  }
  
  export interface AuthState {
    token: string | null;
    user: User | null;
    apiKey: string | null;
  }
  