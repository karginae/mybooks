import { SliceStatus } from './authType';
import { BookData } from './booksType';

export type CartData = {
  _id: string;
  book: BookData;
  user: string;
};

export interface CartSliceState {
  data: (CartData[] & { status?: number }) | null;
  status: SliceStatus;
}
