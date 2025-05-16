export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  coverImage: string;
  price: number;
  description: string;
  genre: string;
}

export interface CartItem extends Book {
  quantity: number;
}
