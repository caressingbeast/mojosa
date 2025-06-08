export interface UserContext {
  age: number;
  isAdmin: boolean;
  name: string;
  userId: string;
  logout: (userId: string) => void;
}
