interface IUser {
  aud: string;
  auth_time: number;
  company: string;
  email: string;
  email_verified: boolean;
  exp: number;
  photoURL: string;
  iat: number;
  iss: string;
  name: string;
  phoneNumber: string;
  role: 'super-owner' | 'owner' | 'manager' | 'promoters' | 'guard';
  sub: string;
  user_id: string;
  super_owner_id?: string;
  owner_id?: string;
  manager_id?: string;
}

export interface IMangeUser {
  uid: string;
  email: string;
  displayName: string;
  role: string;
  company: string;
  photoURL: string;
  manager_id: string;
  owner_id: string;
}

export interface IVenue {
  id?: string;
  createdAt?: any;
  updatedAt?: any;
  name: string;
  location: string;
  description: string;
  image: any;
  video?: any;
  manager_id: string;
  manager_name: string;
  openingTime: string;
  closingTime: string;
  capacity: string;
  bars: string;
  danceFloor: string;
  residentDj: string;
  createdBy: string;
  status: string;
}

export interface IEvent {
  id?: string;
  createdAt?: any;
  updatedAt?: any;
  name: string;
  description: string;
  image: any;
  date: string;
  venue: string;
  start_time: string;
  end_time: string;
  manager_id: string;
  capacity: string;
  entry_fee: string;
  resident_dj: string;
  createdBy: string;
}
export interface IGuest {
  id: string;
  fullName: string;
  tag: string;
  tag_name: string;
  people: string;
  check_in: string;
  entry_fee: string;
  free_entry: string;
  added_by: string;
  event?: string;
  // venue firebase refer on firestore type
  venue?: string;
  guestList: string;
  free_entry_time: any;
  createdAt: any;
  updatedAt: any;
  email?: string;
  note?: string;
  event_date?: string;
}
export interface IGuestsList {
  id: string;
  name: string;
  createdAt?: any;
  updatedAt?: any;
}
export interface ITags {
  id?: string;
  name?: string;
  createdAt?: any;
  updatedAt?: any;
}

export interface INews {
  createdAt?: any;
  updatedAt?: any;
  content?: string;
  image: any;
}
