const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express()

const port = process.env.port || 3000;
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0ykpaho.mongodb.net/recipeBookDB?retryWrites=true&w=majority&tls=true`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    const recipeCollection = client.db("recipeDB").collection('recipe')

    // Add recipe 
    app.post('/recipe' , async(req , res) => {
      const newRecipe = req.body;
      console.log(newRecipe);

      const result = await recipeCollection.insertOne(newRecipe)
      res.send(result)
    })

    // Fetch All Recipe
    app.get("/recipe" , async(req,res) => {
      const cursor = recipeCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/' , (req , res) => {
    res.send("Recipe Book Server is Running ...")
})

app.listen(port , () => {
    console.log(`Recipe Book Server is Running at port : ${port}`);
})