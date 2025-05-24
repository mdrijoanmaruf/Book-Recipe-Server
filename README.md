
# 🍲 Recipe Book Server

An Express.js backend for a recipe app using MongoDB Atlas.

## 🚀 Features

- Add, get, update, delete recipes
- Like/unlike recipes by user email
- Get top recipes by like count

## 🛠️ Tech

- Node.js + Express.js  
- MongoDB Atlas  
- dotenv + CORS

## 📦 Setup

1. Clone repo & install:

   ```bash
   git clone <repo-url>
   cd recipe-book-server
   npm install
    ```

2. Create `.env`:

   ```env
   PORT=3000
   DB_USER=yourUsername
   DB_PASS=yourPassword
   ```

3. Run server:

   ```bash
   node index.js
   ```

## 📚 API

* `GET /` — server status
* `POST /recipe` — add recipe
* `GET /recipe` — get all recipes
* `GET /recipe/:id` — get one
* `PUT /recipe/:id` — update
* `DELETE /recipe/:id` — delete
* `PATCH /recipe/like/:id` — like/unlike
* `GET /top-recipes?limit=6` — top liked recipes

---

Made with Md **Rijoan Maruf**
