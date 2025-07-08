// insert_books.js - Script to populate MongoDB with combined book data

const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const dbName = 'plp_bookstore';
const collectionName = 'books';

const books = [
  // Original classic book data
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    published_year: 1960,
    price: 12.99,
    in_stock: true,
    pages: 336,
    publisher: 'J. B. Lippincott & Co.'
  },
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    published_year: 1949,
    price: 10.99,
    in_stock: true,
    pages: 328,
    publisher: 'Secker & Warburg'
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    published_year: 1925,
    price: 9.99,
    in_stock: true,
    pages: 180,
    publisher: "Charles Scribner's Sons"
  },
  {
    title: 'Brave New World',
    author: 'Aldous Huxley',
    genre: 'Dystopian',
    published_year: 1932,
    price: 11.50,
    in_stock: false,
    pages: 311,
    publisher: 'Chatto & Windus'
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    published_year: 1937,
    price: 14.99,
    in_stock: true,
    pages: 310,
    publisher: 'George Allen & Unwin'
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    genre: 'Fiction',
    published_year: 1951,
    price: 8.99,
    in_stock: true,
    pages: 224,
    publisher: 'Little, Brown and Company'
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    published_year: 1813,
    price: 7.99,
    in_stock: true,
    pages: 432,
    publisher: 'T. Egerton, Whitehall'
  },
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    published_year: 1954,
    price: 19.99,
    in_stock: true,
    pages: 1178,
    publisher: 'Allen & Unwin'
  },
  {
    title: 'Animal Farm',
    author: 'George Orwell',
    genre: 'Political Satire',
    published_year: 1945,
    price: 8.50,
    in_stock: false,
    pages: 112,
    publisher: 'Secker & Warburg'
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    genre: 'Fiction',
    published_year: 1988,
    price: 10.99,
    in_stock: true,
    pages: 197,
    publisher: 'HarperOne'
  },
  {
    title: 'Moby Dick',
    author: 'Herman Melville',
    genre: 'Adventure',
    published_year: 1851,
    price: 12.50,
    in_stock: false,
    pages: 635,
    publisher: 'Harper & Brothers'
  },
  {
    title: 'Wuthering Heights',
    author: 'Emily Brontë',
    genre: 'Gothic Fiction',
    published_year: 1847,
    price: 9.99,
    in_stock: true,
    pages: 342,
    publisher: 'Thomas Cautley Newby'
  },

  // New additional books
  {
    title: "The Mongo Way",
    author: "Jane Doe",
    genre: "Technology",
    published_year: 2021,
    price: 29.99,
    in_stock: true,
    pages: 320,
    publisher: "TechPress"
  },
  {
    title: "Desert Mirage",
    author: "Ali Mussa",
    genre: "Fiction",
    published_year: 2016,
    price: 19.99,
    in_stock: false,
    pages: 210,
    publisher: "Desert House"
  },
  {
    title: "Rain and Fire",
    author: "Lily Harper",
    genre: "Fantasy",
    published_year: 2018,
    price: 25.50,
    in_stock: true,
    pages: 450,
    publisher: "EpicReads"
  },
  {
    title: "Coding 101",
    author: "John Smith",
    genre: "Technology",
    published_year: 2020,
    price: 34.99,
    in_stock: true,
    pages: 400,
    publisher: "CodePress"
  },
  {
    title: "Mystery Hills",
    author: "Rebecca Stone",
    genre: "Mystery",
    published_year: 2014,
    price: 15.75,
    in_stock: true,
    pages: 310,
    publisher: "MysteryBooks"
  },
  {
    title: "The Last Empire",
    author: "Ali Mussa",
    genre: "Fiction",
    published_year: 2011,
    price: 22.00,
    in_stock: false,
    pages: 375,
    publisher: "WorldPress"
  },
  {
    title: "Healthy Life",
    author: "Laura Green",
    genre: "Health",
    published_year: 2017,
    price: 18.99,
    in_stock: true,
    pages: 290,
    publisher: "GreenLiving"
  },
  {
    title: "Mindset Shift",
    author: "David Grant",
    genre: "Self-help",
    published_year: 2019,
    price: 21.99,
    in_stock: true,
    pages: 260,
    publisher: "LifeBooks"
  },
  {
    title: "Web Wonders",
    author: "Jane Doe",
    genre: "Technology",
    published_year: 2023,
    price: 39.95,
    in_stock: true,
    pages: 370,
    publisher: "TechPress"
  },
  {
    title: "Shadow Game",
    author: "Rebecca Stone",
    genre: "Mystery",
    published_year: 2015,
    price: 16.80,
    in_stock: false,
    pages: 280,
    publisher: "MysteryBooks"
  }
];

async function insertBooks() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB server');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const count = await collection.countDocuments();
    if (count > 0) {
      console.log(`Collection already contains ${count} documents. Dropping collection...`);
      await collection.drop();
      console.log('Collection dropped successfully');
    }

    const result = await collection.insertMany(books);
    console.log(`${result.insertedCount} books were successfully inserted into the database`);

    const insertedBooks = await collection.find({}).toArray();
    console.log('\nInserted books:');
    insertedBooks.forEach((book, index) => {
      console.log(`${index + 1}. "${book.title}" by ${book.author} (${book.published_year})`);
    });

  } catch (err) {
    console.error('Error occurred:', err);
  } finally {
    await client.close();
    console.log('Connection closed');
  }
}

insertBooks().catch(console.error);
