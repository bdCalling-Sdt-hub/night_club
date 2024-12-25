export interface IUser {
  uid?: string;
  email: string;
  displayName: string;
  password: string;
  phoneNumber: string;
  photoURL: string;
  role: 'super-owner' | 'owner' | 'manager' | 'promoters' | 'guard';
}
