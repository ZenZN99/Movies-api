### 🎬 Movies API


Movies API is a backend application built with Node.js and Express.js, providing a complete system for managing and displaying movies.
It allows users to register, log in, view movies, and like/unlike them, while admins can create, update, and delete movies with image uploads via Cloudinary.

The project uses MongoDB for data storage and JWT for authentication, following best practices to ensure security, scalability, and maintainability.

⚙️ Environment Variables (.env)

Make sure to create a .env file in the root directory with the following variables:

PORT=your_port
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_PASSWORD=your_admin_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

🚀 Running the Project
# Clone the repository
git clone https://github.com/ZenZN99/Movies-api.git

# Navigate to project folder
cd backend

# Install dependencies
npm install

# Start the server
npm run start

🔐 Authentication Routes

Headers (for protected routes)
Content-Type: application/json
Authorization: Bearer <your_token>

1. Register User

POST /api/auth/register

Body:

{
  "username": "your_name",
  "email": "youremail@gmail.com",
  "password": "12345678",
  "confirmPassword": "12345678"
}


Response:

{
  "success": "Account created successfully",
  "user": {
    "_id": "user_id",
    "username": "your_name",
    "email": "youremail@gmail.com"
  },
  "token": "<token>"
}

2. Login

POST /api/auth/login

Body:

{
  "email": "youremail@gmail.com",
  "password": "12345678"
}


Response:

{
  "success": "Logged in successfully",
  "user": {
    "_id": "user_id",
    "username": "your_name",
    "email": "youremail@gmail.com"
  },
  "token": "<token>"
}

3. Get Current User

GET /api/auth/me

Returns the authenticated user’s data.

🎥 Movie Routes
4. Get All Movies

GET /api/movie
Returns all movies uploaded by the admin.
If no movies exist → "No movies found yet"

5. Get Movie by ID

GET /api/movie/:id
Fetch a single movie by its ID.
If not found → "Movie not found"

6. Create Movie (Admin Only)

POST /api/movie

Only admin users can create movies using the credentials set in .env.

Form-Data Body:

Field	Type	Description
title	Text	Movie title (required)
content	Text	Movie description (required)
image	File	Movie image (required)
director	Text	Director name (required)
date	Text	Release date (required)
genre	Text	Movie genre (required)

Response:

{
  "success": "Movie created successfully",
  "movie": {
    "title": "Your Title",
    "content": "Your Content",
    "image": "Cloudinary URL",
    "director": "Director Name",
    "date": "2024-01-01",
    "genre": "Action",
    "userId": "user_id"
  }
}

7. Update Movie (Admin Only)

PUT /api/movie/:id
Updates an existing movie (except image).

Body:

{
  "title": "Updated title",
  "content": "Updated content",
  "director": "Updated director",
  "date": "2025-01-01",
  "genre": "Drama"
}

8. Delete Movie (Admin Only)

DELETE /api/movie/:id
Deletes a movie by ID.

9. Get All Admin Movies

GET /api/movie/admin/movies
Lists all movies uploaded by the admin.

10. Like / Unlike Movie

POST /api/movie/like/:id
Likes or unlikes a movie depending on the user’s previous action.

✅ Notes

All routes requiring authentication must include a Bearer Token in the header.

Admin credentials are defined in the .env file.

Cloudinary is used for secure image storage.

Errors and success messages are returned in JSON format.
