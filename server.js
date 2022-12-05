// create an express app
const express = require("express");
const bodyParser = require('body-parser');
const app = express();

const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;

// use the express-static middleware
app.use(express.static("public"));

// middlewear to parse body
app.use(bodyParser.json());

// middlewear for errors
app.use(function(err,req,res,next){
  res.status(422).send({error: err.message});
});

// login
app.get("/api/login", async function (req, res) {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  console.log(req);
  try {
    await client.connect();

    const database = client.db('oinkdb');
    const collection = database.collection('accounts');

    const query = req.query;
    console.log(req.query);
    const cursor = collection.find(query);
    const result = await cursor.toArray();
    console.log(result);
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
    return res.json({ "fail": "true"});
  }
  finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
});

// add to accounts db (add existance check - error)
app.post("/api/signup", async function (req, res) {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  
  try {
    await client.connect();

    const database = client.db('oinkdb');
    const collection = database.collection('accounts');

    console.log('BODY: ' + JSON.stringify(req.body));

    await collection.insertOne(req.body).then((info) => {
      //redirect on success
      return res.redirect(301, "../index.html");
    });
    
// send posts to db
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

// get post from db
app.get("/api/post", async function (req, res) {
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();

    const database = client.db('oinkdb');
    const collection = database.collection('posts');

    const query = req.query;
    const cursor = collection.find(query);
    const result = await cursor.toArray();

    return res.json(result);
    
  } catch(err) {
    console.log(err);
    // way to make already have account popup?
  }
  finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
});

app.post("/addname", (req, res) => {
  var myData = new User(req.body);
  myData.save()
  .then(item => {
  res.send("item saved to database");
  })
  .catch(err => {
  res.status(400).send("unable to save to database");
  });
 });

  } catch(err) {
    console.log(err);
  }
  finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
});

// start the server listening for requests
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));