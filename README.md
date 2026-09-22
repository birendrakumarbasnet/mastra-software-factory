# Full-Stack Application

A full-stack application built with NestJS (backend), Next.js (frontend), and MongoDB (database).

## Features

- **Backend**: NestJS REST API with TypeScript
- **Frontend**: Next.js 14+ with App Router and TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Full CRUD Operations**: Create, Read, Update, Delete items
- **Type Safety**: End-to-end TypeScript
- **Modern UI**: Responsive design with Tailwind CSS

## Project Structure

```
mastra-software-factory/
├── backend/                 # NestJS backend
│   ├── src/
│   │   ├── items/          # Items module
│   │   │   ├── dto/        # Data transfer objects
│   │   │   ├── schemas/    # Mongoose schemas
│   │   │   ├── items.controller.ts
│   │   │   ├── items.service.ts
│   │   │   └── items.module.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   └── package.json
├── frontend/                # Next.js frontend
│   ├── app/                # App Router pages
│   ├── components/         # React components
│   ├── lib/                # Utilities and API client
│   └── package.json
└── package.json            # Root workspace config
```

## Prerequisites

- **Node.js**: v18.x or higher
- **npm**: v9.x or higher
- **MongoDB**: v6.x or higher (local installation or cloud connection)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/birendrakumarbasnet/mastra-software-factory.git
cd mastra-software-factory
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Or use the convenience script from root:
cd ..
npm run install:all
```

### 3. Configure Environment Variables

**Backend** (`backend/.env`):

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env`:

```env
MONGODB_URI=mongodb://localhost:27017/mastra-factory
PORT=3001
```

**MongoDB Options:**
- **Local MongoDB**: Use `mongodb://localhost:27017/mastra-factory`
- **MongoDB Atlas**: Use your Atlas connection string (e.g., `mongodb+srv://user:password@cluster.mongodb.net/mastra-factory`)

**Frontend** (`frontend/.env.local`):

```bash
cp frontend/.env.local.example frontend/.env.local
```

Edit `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 4. Start MongoDB

**Option A: Local MongoDB**

```bash
# macOS (Homebrew)
brew services start mongodb-community

# Linux (systemd)
sudo systemctl start mongod

# Or run manually
mongod --dbpath /path/to/data/directory
```

**Option B: MongoDB Atlas**

No local setup needed - just use your Atlas connection string in `backend/.env`.

### 5. Run the Application

**Development Mode (Both Services):**

```bash
npm run dev
```

This starts:
- Backend on `http://localhost:3001`
- Frontend on `http://localhost:3000`

**Run Individually:**

```bash
# Terminal 1 - Backend
cd backend
npm run start:dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## API Documentation

### Endpoints

All endpoints are prefixed with the backend URL (default: `http://localhost:3001`).

#### GET /items
Get all items.

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Sample Item",
    "description": "This is a sample item",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### GET /items/:id
Get a single item by ID.

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Sample Item",
  "description": "This is a sample item",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### POST /items
Create a new item.

**Request Body:**
```json
{
  "name": "New Item",
  "description": "Optional description"
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "New Item",
  "description": "Optional description",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### PATCH /items/:id
Update an existing item.

**Request Body:**
```json
{
  "name": "Updated Name",
  "description": "Updated description"
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Updated Name",
  "description": "Updated description",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### DELETE /items/:id
Delete an item.

**Response:** `204 No Content`

## Usage

1. **Open the application** in your browser: `http://localhost:3000`
2. **Create an item** using the form at the top
3. **View all items** in the list below the form
4. **Edit an item** by clicking the "Edit" button
5. **Delete an item** by clicking the "Delete" button

## Development

### Backend Development

The backend uses NestJS with hot-reload enabled:

```bash
cd backend
npm run start:dev
```

**Key files:**
- `src/items/items.controller.ts` - REST endpoints
- `src/items/items.service.ts` - Business logic
- `src/items/schemas/item.schema.ts` - Mongoose schema
- `src/items/dto/*.dto.ts` - Request/response validation

### Frontend Development

The frontend uses Next.js with Turbopack for fast refresh:

```bash
cd frontend
npm run dev
```

**Key files:**
- `app/page.tsx` - Main page with items list
- `components/ItemForm.tsx` - Create/edit form
- `components/ItemList.tsx` - Items display
- `lib/api.ts` - Backend API client

### Type Checking

```bash
# Backend
cd backend
npx tsc --noEmit

# Frontend
cd frontend
npx tsc --noEmit
```

## Technologies Used

### Backend
- **NestJS** 10.x - Progressive Node.js framework
- **Mongoose** 8.x - MongoDB object modeling
- **class-validator** - DTO validation
- **TypeScript** 5.x - Type safety

### Frontend
- **Next.js** 14+ - React framework with App Router
- **React** 18.x - UI library
- **TypeScript** 5.x - Type safety
- **Tailwind CSS** 3.x - Utility-first CSS

### Database
- **MongoDB** 6.x+ - NoSQL database

## Troubleshooting

### Backend won't start
- **Check MongoDB connection**: Ensure MongoDB is running and the connection string in `backend/.env` is correct
- **Check port 3001**: Make sure nothing else is using port 3001

### Frontend API calls fail
- **Check backend is running**: Backend must be running on port 3001
- **Check CORS**: Verify `FRONTEND_URL` in backend allows `http://localhost:3000`
- **Check API URL**: Verify `NEXT_PUBLIC_API_URL` in `frontend/.env.local` is `http://localhost:3001`

### MongoDB connection errors
- **Local MongoDB**: Ensure `mongod` is running
- **Atlas**: Verify connection string and network access in Atlas dashboard

## License

MIT
