export interface IUser {
  uid?: string;
  email: string;
  displayName: string;
  password: string;
  phoneNumber: string;
  photoURL?: string | null;
  role: 'super-owner' | 'owner' | 'manager' | 'promoters' | 'guard';
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
  nightclubManager?: string;
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
  capacity: string;
  entry_fee: string;
  resident_dj: string;
  createdBy: string;
}
export interface IGuest {
  id: string;
  fullName: string;
  tag: string;
  people: string;
  check_in: string;
  entry_fee: string;
  free_entry: string;
  added_by: string;
  event?: string;
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
