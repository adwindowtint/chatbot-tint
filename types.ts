export type Role = 'user' | 'model' | 'error';

export interface Message {
  id: string;
  role: Role;
  text: string;
  timestamp: number;
}
