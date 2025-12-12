export interface Name {
  first: string;
  last: string;
  middle?: string; 
}

export interface Image {
  url: string;
  alt: string;
}

export interface Address {
  state?: string;
  country: string;
  city: string;
  street: string;
  houseNumber: string; 
  zip?: string;
}

export interface UserType {
  _id: string;
  name: Name;
  phone: string;
  email: string;
  password?: string;
  image: Image;
  address: Address;
  isAdmin: boolean;
  isBusiness: boolean;
  createdAt?: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface RegisterUserDto {
  name: Name;
  phone: string;
  email: string;
  password: string;
  image: Image;
  address: Address;
  isBusiness: boolean;
}
