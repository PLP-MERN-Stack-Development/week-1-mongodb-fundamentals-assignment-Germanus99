// Task 2: Basic Queries
db.books.find({ genre: "Fiction" });
db.books.find({ published_year: { $gt: 2015 } });
db.books.find({ author: "Jane Doe" });
db.books.updateOne({ title: "The Mongo Way" }, { $set: { price: 24.99 } });
db.books.deleteOne({ title: "Desert Mirage" });

// Task 3: Advanced Queries
db.books.find({ in_stock: true, published_year: { $gt: 2010 } });
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 });
db.books.find().sort({ price: 1 });
db.books.find().sort({ price: -1 });
db.books.find().limit(5).skip(0); // Page 1
db.books.find().limit(5).skip(5); // Page 2

// Task 4: Aggregation Pipelines
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
]);

db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
]);

db.books.aggregate([
  {
    $group: {
      _id: {
        decade: {
          $concat: [
            { $substr: [{ $toString: "$published_year" }, 0, 3] },
            "0s"
          ]
        }
      },
      count: { $sum: 1 }
    }
  }
]);

// Task 5: Indexing
db.books.createIndex({ title: 1 });
db.books.createIndex({ author: 1, published_year: -1 });
db.books.find({ title: "The Mongo Way" }).explain("executionStats");
