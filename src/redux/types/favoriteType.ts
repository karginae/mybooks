import { SliceStatus } from './authType';
import { BookData } from './booksType';

export type FavoriteData = {
  _id: string;
  book: BookData;
  user: string;
};

export interface FavoritesSliceState {
  data: (FavoriteData[] & { status?: number }) | null;
  status: SliceStatus;
}
