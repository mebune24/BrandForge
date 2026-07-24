# BrandForge Backend (Node.js + Express + MongoDB)

This is the backend API for the BrandForge Technologies platform. It handles user
accounts, products, and orders (with a simple quotation + status-tracking flow),
so the React frontend can talk to it.

## Tech Stack
- Node.js + Express — the server and API routes
- MongoDB + Mongoose — the database
- JWT (jsonwebtoken) — login/authentication
- bcryptjs — password hashing

## Project Structure
```
backend/
  config/db.js          MongoDB connection
  models/                Mongoose schemas (User, Product, Order)
  controllers/            Route logic (auth, products, orders)
  routes/                 Express route definitions
  middleware/authMiddleware.js   JWT protection + role checks
  server.js               App entry point
  .env.example             Copy this to .env and fill in real values
```

## 1. Install dependencies
```bash
cd backend
npm install
```

## 2. Set up environment variables
Copy `.env.example` to `.env` and fill in your own values:
```bash
cp .env.example .env
```
- `MONGO_URI`: your MongoDB connection string. For local development you can
  install MongoDB Community Server and use `mongodb://localhost:27017/brandforge`.
  For a free cloud database, create a cluster on MongoDB Atlas and paste its
  connection string here instead.
- `JWT_SECRET`: any long random string (used to sign login tokens).
- `CLIENT_URL`: the URL your React app runs on (e.g. `http://localhost:3000`),
  used for CORS.

## 3. Run the server
```bash
npm run dev
```
This uses nodemon, so the server restarts automatically when you edit a file.
You should see:
```
MongoDB connected: <host>
Server running on port 5000
```

## 4. Test the API
You can use Postman, Insomnia, or curl. A few starting points:

- `POST /api/auth/register` — body: `{ "name": "", "email": "", "password": "" }`
- `POST /api/auth/login` — body: `{ "email": "", "password": "" }` → returns a token
- `GET /api/products` — list all products
- `POST /api/products` — (needs admin/staff token) create a product
- `POST /api/orders` — (needs a logged-in customer token) place an order
- `GET /api/orders/track/:orderCode` — public order tracking, no login needed

For protected routes, add a header: `Authorization: Bearer <token>`.

## 5. Pushing this to GitHub
```bash
cd backend
git init
git add .
git commit -m "Initial backend setup: auth, products, orders"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```
Important: `.env` is already listed in `.gitignore`, so your real secrets will
never be pushed — only `.env.example` (with placeholder values) goes to GitHub.
Your teammate should pull the repo, run `npm install`, copy `.env.example` to
`.env` themselves, and fill in their own values.

## Next steps (as the project grows)
- Add file upload handling (e.g. multer + cloud storage) for design/logo uploads
- Add a payment route (e.g. Stripe or a local mobile-money provider)
- Add printing add-on costs to the quotation logic in `orderController.js`
- Add pagination/filtering to `GET /api/products` and `GET /api/orders`
