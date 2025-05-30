import type { Book } from './types';

export const books: Book[] = [
  {
    id: '1',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    isbn: '978-0061122415',
    coverImage: 'https://placehold.co/200x300.png',
    dataAiHint: 'desert journey',
    price: 12.99,
    description: 'A philosophical book about a shepherd boy named Santiago who travels from his homeland in Spain to the Egyptian desert in search of a treasure buried near the Pyramids.',
    genre: 'Fiction',
    available: true,
    rating: 4.5,
    reviewCount: 321,
  },
  {
    id: '2',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    isbn: '978-0062316097',
    coverImage: 'https://placehold.co/200x300.png',
    dataAiHint: 'human evolution',
    price: 18.50,
    description: 'A critically acclaimed book that explores the history of humankind from the Stone Age up to the present day.',
    genre: 'Non-Fiction',
    available: false,
    rating: 4.8,
    reviewCount: 210,
  },
  {
    id: '3',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    isbn: '978-0061120084',
    coverImage: 'https://placehold.co/200x300.png',
    dataAiHint: 'classic novel justice',
    price: 9.99,
    description: 'A novel by Harper Lee published in 1960. Instantly successful, widely read in high schools and middle schools in the United States, it has become a classic of modern American literature, winning the Pulitzer Prize.',
    genre: 'Classic',
    available: true,
    rating: 4.2,
    reviewCount: 98,
  },
  {
    id: '4',
    title: '1984',
    author: 'George Orwell',
    isbn: '978-0451524935',
    coverImage: 'https://placehold.co/200x300.png',
    dataAiHint: 'dystopian future surveillance',
    price: 8.75,
    description: 'A dystopian social science fiction novel and cautionary tale by English writer George Orwell. It was published on 8 June 1949 by Secker & Warburg as Orwell\'s ninth and final book completed in his lifetime.',
    genre: 'Dystopian',
    available: true,
    rating: 4.7,
    reviewCount: 412,
  },
  {
    id: '5',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '978-0743273565',
    coverImage: 'https://placehold.co/200x300.png',
    dataAiHint: 'roaring twenties jazz',
    price: 10.25,
    description: 'A 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts narrator Nick Carraway\'s interactions with mysterious millionaire Jay Gatsby and Gatsby\'s obsession to reunite with his former lover, Daisy Buchanan.',
    genre: 'Classic',
    available: false,
    rating: 4.0,
    reviewCount: 55,
  },
  {
    id: '6',
    title: 'Atomic Habits',
    author: 'James Clear',
    isbn: '978-0735211292',
    coverImage: 'https://placehold.co/200x300.png',
    dataAiHint: 'self improvement productivity',
    price: 15.99,
    description: 'An easy & proven way to build good habits & break bad ones. James Clear, one of the world\'s leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.',
    genre: 'Self-Help',
    available: true,
    rating: 4.9,
    reviewCount: 501,
  },
  {
    id: '7',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    isbn: '978-0547928227',
    coverImage: 'https://placehold.co/200x300.png',
    dataAiHint: 'fantasy adventure dragon',
    price: 11.50,
    description: 'A fantasy novel by J.R.R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction.',
    genre: 'Fantasy',
    available: true,
    rating: 4.6,
    reviewCount: 333,
  },
  {
    id: '8',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    isbn: '978-0141439518',
    coverImage: 'https://placehold.co/200x300.png',
    dataAiHint: 'regency romance england',
    price: 7.99,
    description: 'An 1813 novel of manners by Jane Austen. The novel follows the character development of Elizabeth Bennet, the dynamic protagonist of the book who learns about the repercussions of hasty judgments and comes to appreciate the difference between superficial goodness and actual goodness.',
    genre: 'Classic',
    available: false,
    rating: 4.3,
    reviewCount: 77,
  },
];
