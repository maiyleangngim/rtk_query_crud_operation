export interface Role {
  name: string;
}

export interface Address {
  uuid: string;
  addressLine1: string;
  addressLine2: string;
  road: string;
  linkAddress: string;
}

export interface User {
  uuid: string;
  username: string;
  email: string;
  phoneNumber: string;
  profile: string;
  isDeleted: boolean;
  emailVerified: boolean;
  roles: Role[];
  address: Address;
}

export interface VerifyUserResponse {
  message: string;
  code: number;
  status: boolean;
  timeStamp: string; // ISO Date String
  data: string;
  token: string;
  user: User;
}


export interface VerifyUserRequest{
    token: string
}