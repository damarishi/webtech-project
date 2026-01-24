export interface User {
  user_id: number;
  email: string;
  username: string;
  full_name?: string;
  location: {
    x: number;
    y: number;
  };
  is_admin: boolean;
}
