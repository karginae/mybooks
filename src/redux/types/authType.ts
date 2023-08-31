export enum SliceStatus {
  LOADING = 'loading',
  LOADED = 'loaded',
  ERROR = 'error',
}

export type UserAuth = {
  email: string;
  password: string;
};

export type UserReg = {
  fullName: string;
} & UserAuth;

export type AuthData = {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  createdAt: string;
  token?: string;
};

export interface AuthSliceState {
  data: AuthData | null;
  status: SliceStatus;
}
