import { SliceStatus } from './authType';

export type BookInit = {
  title: string;
  author: string;
  year: string;
  pages: string;
  price: string;
  cover: string | FileList;
  isbn: string;
  age_limit: string;
  genre: string;
  copyright: string;
};

export type BookData = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  acknowledged?: any;
} & BookInit;

export interface BooksSliceState {
  data: BookData[] | null;
  status: SliceStatus;
}
