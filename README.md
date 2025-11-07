

# 🎬 Movies API

## 📝 About

Movies API is a backend project developed using Node.js and Express.js to provide a professional system for managing and displaying movies. The project allows users to create accounts, log in, watch movies, and like or unlike them. It also provides admin-specific interfaces for managing movies, including creating new movies, updating, deleting, and uploading images via Cloudinary.

The project uses MongoDB for data storage and JWT for user authentication and securing sensitive operations. It follows best programming practices to create a robust, secure, and user-friendly API.

---

## ⚡ How does the project work?

### 1. Register a new user:

#### POST/api/auth/register

This is a process that allows the user to create an account. You must enter all the required fields (username, email, password, confirmPassword). Make sure to add valid information such as a valid email address and a password that is at least 8 characters long and must match the confirmed password.

### Headers:

Content-Type : application/json

### body:

{
"username": "your_name",
"email": "youremail@gmail.com",
"password": "12345678",
"confirmPassword": "12345678"
}

### response:

{
"success": "Account created successfully",
"user": {
"\_id": "user.\_id",
"username": "yourname",
"email": "youremail@gmail.com"
},
"token": "<token>"
}

### 2. Login:

#### POST/api/auth/login

After creating an account, you only need to enter an email address and password, and these must match the email address and password you used to create the account.

### Headers :

Content-Type : application/json

### body :

{
"email": "youremail@gmail.com",
"password": "12345678",
}

### response:

{
"success": "Logged in successfully",
"user": {
"\_id": "user.\_id",
"username": "yourname",
"email": "youremail@gmail.com"
},
"token": "<token>"
}

### 3. Fetch user data :

#### GET/api/auth/me

Now you can see your data here, such as (username, email)

### Headers :

Authorization : Bearer <your token>

## Movies Routes :

### 4. Get all the movies :

#### GET/api/movie

This route allows you to view all movies uploaded by the admin. If no movies exist, it will show 'No movies found yet'

### 5. Get movie by id :

#### GET/api/movie/id

This route allows you to view a single movie by its ID. If the movie does not exist, it will show 'Movie not found'.

### Headers :

Authorization : Bearer <your token>

### 6. create movie :

#### POST/api/movie

This path allows you to upload a new movie, but only administrators can do so after registering with the administrator email address admin@admin.com and the password provided in the .env file ADMIN_PASSWORD. Placing the token inside the Header Authorization Bearer token will then allow you to create a movie.

### Headers :

Authorization : Bearer <your token>

### body => form-data :

title => TEXT MOVIE Name required
content => TEXT MOVIE Content required
image => FILE MOVIE Image required
director => TEXT Director's Name required
date => TEXT MOVIE Date required
genre => TEXT MOVIE Genre required

### responsive :

{
"success": "Movie created successfully",
"movie": {
"title": "your title",
"content": "your content",
"image": "url cloudinary image",
"director": "your director",
"date": "your date",
"genre": "your genre",
"userId": "user.id",
"likes": 0,
"likedBy": [],
"\_id": "movie id",
"createdAt": "Creation time",
"updatedAt": "Update time",
"\_\_v": 0
}
}

### 7. update movie :

#### PUT/api/movie/id

Here you will edit, and you must be an administrator to edit. You will enter all fields except for the image.

### Headers :

Authorization : Bearer <your token>

### body :

title , content, director, date , genre

### 8. delete movie :

#### DELETE/api/movie/id

Here you can delete, but you must be an administrator.

### Headers :

Authorization : Bearer <your token>

### 9. GET movie admin :

#### GET/api/movie/admin/movies

### Headers :

Authorization : Bearer <your token>

Here you will find all the movies uploaded by the administrator.

### 10. Like Movie :

#### POST/api/movie/like/id

Here you can like the app; if you don't like it, it will increase by one, otherwise it will decrease by one. It doesn't matter if you are a user or an administrator.

### Headers :

Authorization : Bearer <your token>

---

## How to Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/ZenZN99/Movies-api.git

cd backend
npm install
npm run start
```
