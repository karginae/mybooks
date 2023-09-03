import { CartData } from '../redux/types/cartType';

export const totalPrice = (cartBooks: CartData[] | null) => {
  return cartBooks?.reduce((prev, cartBook) => prev + +cartBook.book.price, 0);
};
