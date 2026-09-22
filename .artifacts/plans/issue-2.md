# Implementation Plan: Full-Stack Application with NestJS, Next.js, and MongoDB

**Issue:** #2  
**Goal:** Create a full-stack application using NestJS as backend, Next.js as frontend, and MongoDB as database

## Goal

Create a working full-stack application with:
- **Backend:** NestJS REST API with TypeScript, connected to MongoDB via Mongoose
- **Frontend:** Next.js 14+ application with TypeScript and App Router
- **Database:** MongoDB integration with proper schema definitions
- **Development Experience:** Both services run concurrently with hot-reload
- **Basic Functionality:** CRUD operations demonstrating the full stack working together

**Done means:** Both services start successfully, connect to MongoDB, and demonstrate end-to-end data flow through at least one resource (e.g., users or items). The setup includes development scripts, basic documentation, and a working example of creating/reading data from the frontend through the backend to MongoDB.

## Scope

### In Scope
- NestJS backend with REST API structure
- MongoDB connection via Mongoose with at least one schema/model
- Next.js frontend with App Router (modern approach)
- TypeScript configuration for both services
- Basic CRUD endpoints and UI
- Development setup with concurrent running
- Environment variable configuration
- Basic documentation in README
- Example resource (e.g., Items or Users) showing full CRUD flow

### Out of Scope
- Authentication/authorization (can be added later)
- Deployment configuration (Docker, K8s, cloud platforms)
- Advanced features (file uploads, real-time updates, caching)
- Comprehensive test suites
- Production optimizations
- Database migrations/seeding
- CI/CD pipelines
- Styling frameworks (basic CSS is sufficient)

## Phases

### Phase 1: Project Structure & Backend Foundation

**Changes:**
- Create monorepo structure with `backend/` and `frontend/` directories
- Initialize NestJS application in `backend/`:
  - `package.json` with dependencies: `@nestjs/core`, `@nestjs/common`, `@nestjs/platform-express`, `@nestjs/mongoose`, `mongoose`, `class-validator`, `class-transformer`
  - `tsconfig.json` for backend TypeScript configuration
  - `src/main.ts` - application entry point with CORS enabled
  - `src/app.module.ts` - root module with MongoDB connection
  - `.env.example` - environment variable template
- Create basic NestJS module structure for a sample resource (e.g., Items):
  - `src/items/items.module.ts`
  - `src/items/items.controller.ts`
  - `src/items/items.service.ts`
  - `src/items/dto/create-item.dto.ts`
  - `src/items/dto/update-item.dto.ts`
  - `src/items/schemas/item.schema.ts` (Mongoose schema)

**Tests:**
- Backend starts without errors: `cd backend && npm install && npm run start:dev`
- MongoDB connection succeeds (requires MongoDB running locally or connection string)
- API endpoints respond: `curl http://localhost:3001/items`

**Verification:**
```bash
cd backend
npm install
npm run start:dev
# In another terminal:
curl http://localhost:3001/items
```

### Phase 2: Frontend Foundation

**Changes:**
- Initialize Next.js application in `frontend/`:
  - Run `npx create-next-app@latest frontend --typescript --app --no-src-dir --import-alias "@/*"`
  - `package.json` with dependencies
  - `tsconfig.json` for frontend TypeScript configuration
  - `.env.local.example` - environment variable template for API URL
- Create basic API client:
  - `lib/api.ts` - centralized fetch wrapper for backend calls
- Create items page demonstrating CRUD:
  - `app/page.tsx` - home page with items list and create form
  - `app/items/[id]/page.tsx` - item detail/edit page (optional, can be modal)
  - `components/ItemList.tsx` - displays items
  - `components/ItemForm.tsx` - create/update form

**Tests:**
- Frontend starts without errors: `cd frontend && npm install && npm run dev`
- Pages render correctly
- Can navigate through the app

**Verification:**
```bash
cd frontend
npm install
npm run dev
# Visit http://localhost:3000 in browser
```

### Phase 3: Integration & CRUD Operations

**Changes:**
- **Backend updates:**
  - Implement full CRUD in `items.service.ts`:
    - `create()` - creates new item in MongoDB
    - `findAll()` - returns all items
    - `findOne()` - returns single item by ID
    - `update()` - updates item by ID
    - `remove()` - deletes item by ID
  - Update `items.controller.ts` with proper HTTP methods and decorators:
    - `POST /items` - create
    - `GET /items` - list all
    - `GET /items/:id` - get one
    - `PATCH /items/:id` - update
    - `DELETE /items/:id` - delete
  - Add validation to DTOs using class-validator decorators
  - Configure CORS in `main.ts` to allow frontend origin

- **Frontend updates:**
  - Implement API calls in `lib/api.ts`:
    - `getItems()`, `getItem(id)`, `createItem(data)`, `updateItem(id, data)`, `deleteItem(id)`
  - Wire up components to make real API calls
  - Add loading states and error handling
  - Add basic form validation

**Tests:**
- Full CRUD flow works:
  - Create item from frontend → appears in MongoDB
  - List items → shows created items
  - Update item → changes persist
  - Delete item → removes from database
- Data validation works (try submitting empty form)
- Error handling displays appropriately

**Verification:**
```bash
# Start MongoDB (if local):
# mongod --dbpath /path/to/data

# Terminal 1 - Backend:
cd backend
npm run start:dev

# Terminal 2 - Frontend:
cd frontend
npm run dev

# Manual testing in browser:
# 1. Visit http://localhost:3000
# 2. Create a new item
# 3. Verify it appears in the list
# 4. Edit the item
# 5. Delete the item

# Verify in MongoDB:
# mongosh
# use mastra-factory
# db.items.find()
```

### Phase 4: Root Configuration & Documentation

**Changes:**
- Root `package.json` with workspace scripts:
  - `"dev": "concurrently \"npm run dev --prefix backend\" \"npm run dev --prefix frontend\""`
  - Dependency: `concurrently` as dev dependency
- Root `.gitignore`:
  - `node_modules/`, `.env`, `.env.local`, `dist/`, `.next/`
- Update `README.md` with:
  - Project overview
  - Prerequisites (Node.js 18+, MongoDB)
  - Setup instructions
  - Environment variable configuration
  - Running the application
  - API documentation (endpoints)
  - Project structure explanation
- Environment templates:
  - `backend/.env.example`:
    ```
    MONGODB_URI=mongodb://localhost:27017/mastra-factory
    PORT=3001
    ```
  - `frontend/.env.local.example`:
    ```
    NEXT_PUBLIC_API_URL=http://localhost:3001
    ```

**Tests:**
- Root dev script runs both services: `npm run dev`
- Documentation is complete and accurate
- Fresh clone setup works following README instructions

**Verification:**
```bash
# Test fresh setup (in new directory):
git clone <repo-url> test-setup
cd test-setup
npm install
cp backend/.env.example backend/.env
cp frontend/.env.local.example frontend/.env.local
# Edit .env files with actual MongoDB connection
npm run dev
# Verify both services start and work
```

## Risks

1. **MongoDB Connection Failures**
   - **Risk:** If MongoDB isn't running or connection string is wrong, backend won't start
   - **Mitigation:** Provide clear error messages, include MongoDB setup in README, use sensible defaults
   - **Check:** Test with both local MongoDB and connection string scenarios

2. **CORS Issues**
   - **Risk:** Frontend calls might be blocked by browser CORS policy
   - **Mitigation:** Configure CORS properly in NestJS main.ts from the start
   - **Check:** Test API calls from frontend in browser console

3. **Port Conflicts**
   - **Risk:** Ports 3000/3001 might be in use
   - **Mitigation:** Use environment variables for ports, document in README
   - **Check:** Handle EADDRINUSE errors gracefully

4. **TypeScript Configuration Conflicts**
   - **Risk:** Different TS configs for frontend/backend might cause confusion
   - **Mitigation:** Keep configs separate and appropriate for each framework
   - **Check:** Both services should compile without TS errors

5. **Mongoose Schema/Model Naming**
   - **Risk:** Incorrect model registration can cause runtime errors
   - **Mitigation:** Follow NestJS Mongoose documentation patterns exactly
   - **Check:** Test model operations early in Phase 1

## Assumptions

1. **Stack Versions:** Using latest stable versions as of implementation date:
   - NestJS v10.x
   - Next.js v14.x or v15.x (App Router)
   - Node.js v18+ or v20+ LTS
   - MongoDB v6.x or v7.x

2. **Development Environment:** Developer has:
   - Node.js and npm installed
   - MongoDB available (local installation or cloud connection string)
   - Basic familiarity with terminal commands

3. **Repository Structure:** Fresh repository with only README.md, suitable for setting up as monorepo

4. **Sample Resource:** Using "Items" as the example resource for CRUD operations:
   - Schema: `{ name: string, description: string, createdAt: Date }`
   - Simple enough to demonstrate without complex business logic

5. **No Existing Code:** Repository is essentially empty, so no migration or refactoring needed

6. **Package Manager:** Using npm (not yarn, pnpm, or bun) for consistency

7. **CORS Configuration:** Frontend and backend run on different ports locally (3000/3001), requiring CORS to be enabled on backend

8. **Environment Variables:** Using `.env` files for configuration rather than hardcoded values

9. **Styling Approach:** Basic/minimal CSS is acceptable; no requirement for Tailwind, Material-UI, or other frameworks

10. **Database Name:** Using `mastra-factory` as the MongoDB database name

11. **API Pattern:** REST API (not GraphQL or gRPC) for simplicity

12. **Error Handling:** Basic try-catch and HTTP status codes are sufficient; comprehensive error handling system not required

## Open Questions

1. **MongoDB Hosting:** Should the setup assume local MongoDB, provide Docker Compose, or use a cloud service (MongoDB Atlas)?
   - **Recommendation:** Start with local MongoDB, document both local and Atlas connection string options in README

2. **Resource Name:** "Items" is generic - should this be something more specific to a domain (Users, Products, Tasks)?
   - **Recommendation:** Use "Items" as it's domain-agnostic and clearly demonstrates the pattern

3. **Validation Requirements:** How strict should validation be? (required fields, string lengths, formats)
   - **Recommendation:** Basic validation (required name field, optional description) is sufficient for demonstration

4. **UI Complexity:** Should the frontend include routing to separate pages or keep everything on one page?
   - **Recommendation:** Single page with list and form is clearest for demonstration; detail pages are optional enhancement
