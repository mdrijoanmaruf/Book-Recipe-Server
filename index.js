const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express()

const port = process.env.port || 3000;
app.use(cors())
app.use(express.json())



// recipe_book
// lNiqZO3mQtRkyVj2




const uri = "mongodb+srv://recipe_book:lNiqZO3mQtRkyVj2@cluster0.0ykpaho.mongodb.net/recipeBookDB?retryWrites=true&w=majority&tls=true";

// const uri = "mongodb+srv://<db_username>:<db_password>@cluster0.0ykpaho.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.get('/' , (req , res) => {
    res.send("Recipe Book Server is Running ...")
})

app.listen(port , () => {
    console.log(`Recipe Book Server is Running at port : ${port}`);
})