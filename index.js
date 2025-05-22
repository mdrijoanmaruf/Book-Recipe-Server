const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express()

const port = process.env.PORT || 3000;
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
    // await client.connect();

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

    // Fetch Single Recipe
    app.get('/recipe/:id' , async (req , res) => {
      const id = req.params.id;
      const query = {_id : new ObjectId(id)}
      const result = await recipeCollection.findOne(query)
      res.send(result)
    })

    // Delete Single Recipe
    app.delete('/recipe/:id' , async(req , res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await recipeCollection.deleteOne(query)
      res.send(result)
    })

    // Edit Recipe
    app.put('/recipe/:id' , async(req, res) => {
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)}
      const options = {upsert: true}
      const updatedRecipe = req.body;
      const updatedDoc = {
        $set: updatedRecipe
      }

      const result = await recipeCollection.updateOne(filter , updatedDoc, options)

      res.send(result)
    })

    // Like Recipe
    app.patch('/recipe/like/:id', async(req, res) => {
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const { email } = req.body;
      
      // First get the recipe to check if user already liked it
      const recipe = await recipeCollection.findOne(filter);
      
      // Initialize likedBy array if it doesn't exist
      if (!recipe.likedBy) {
        recipe.likedBy = [];
      }
      
      let updateDoc;
      
      // Check if user already liked this recipe
      if (recipe.likedBy.includes(email)) {
        // User already liked, so unlike
        updateDoc = {
          $inc: { likeCount: -1 },
          $pull: { likedBy: email }
        };
      } else {
        // User hasn't liked, so add like
        updateDoc = {
          $inc: { likeCount: 1 },
          $push: { likedBy: email }
        };
      }
      
      const result = await recipeCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // Fetch Top Recipes by Like Count
    app.get("/top-recipes", async(req, res) => {
      const limit = parseInt(req.query.limit) || 6;
      const result = await recipeCollection.find()
        .sort({ likeCount: -1 })
        .limit(limit)
        .toArray();
      res.send(result);
    });

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