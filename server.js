// create an express app
const express = require("express");
const app = express();

const { MongoClient } = require("mongodb");

// const uri = process.env.MONGODB_URI;
const uri = "mongodb+srv://ismith14:3nS3KTIJrlyRjnZN@cosc484-oink.wjezri1.mongodb.net/test";

// use the express-static middleware
app.use(express.static("public"));

// login
app.get("/api/login", async function (req, res) {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  console.log(req);
  try {
    await client.connect();

    const database = client.db('oinkdb');
    const collection = database.collection('accounts');

    const query = req.query;
    const cursor = collection.find(query);
    const result = await cursor.toArray();

    return res.json(result);
    
  } catch(err) {
    console.log(err);
  }
  finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
});

// query the accounts db
app.get("/api/accounts", async function (req, res) {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  
  try {
    await client.connect();

    const database = client.db('oinkdb');
    const collection = database.collection('accounts');

    const query = req.query;
    const cursor = collection.find(query);
    const result = await cursor.toArray();

    return res.json(result);
    
  } catch(err) {
    console.log(err);
  }
  finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
});

// get posts from db
app.post('/api/posts', async function(req, res){
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  try {
    await client.connect();

    const database = client.db('oinkdb');
    const collection = database.collection('posts');

    const query = req.query;
    const cursor = collection.insertOne(query);
    const result = await cursor;

    return res.json(query);
    
  } catch(err) {
    console.log(err);
  }
  finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
});

// send post entry to db
app.post('/api/post', async function(req, res){
  const client = new MongoClient(url, { useUnifiedTopology: true});
  try {
    await client.connect();
    const database = client.db('oinkdb');
    const collection = database.collection('posts');

    // const query = req.body;
    // const j = {
    //   "title": req.body.title
    // }
    const query = req.query;
    const cursor = collection.find(query);
    const result = await cursor.toArray();

    return res.json(result);

  } catch(err){
    console.log(err);
  }
  finally{
    await client.close();
  }
});

// start the server listening for requests
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));