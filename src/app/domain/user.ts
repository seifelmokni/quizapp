export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  badges: number;
  extraLives: number;
  score: number;
  balance: number;
}

export class User implements User {}
