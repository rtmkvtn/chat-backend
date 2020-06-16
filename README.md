# Chat API

Api for the chat app

## v 1.0.0

## Navigation:

- [Postman collection](#postman)
- [Installing](#install)
- [Realized routes](#routes)

## Available At:

- [link](http://84.201.161.33)

Node.js server with express app.  
App connects to mongodb using mongoose.  
Db has 2 collections:

- users
- posts

<a name="postman"></a>

## Postman Collection:

https://www.getpostman.com/collections/2780e9d92a8203b78d7a

## Authorization:

Project has a JWT token httpOnly cookies authorizatoin built in.
There is only two routes available without authorization: `/signup` and `/signin` routes.
After success sign in JWT Token will be added to cookies automatically.
So, after getting successful response from `/signin` route request, you'll be able to use all other routes.

## Swagger documentation:

- [link](http://84.201.161.33/api-docs)

---

<a name="routes"></a>

## Realized routes:

---

## Create New User

Adds new user to the db. Returns this user's json data.

- ### URL:

  /signup

- ### Method:

  POST

- ### Authorization:

  None

- ### URL Params:

  None

- ### Data Params:

  userName = [String], 2 to 20 characters, only letters and numbers
  password = [String], 4 to 20 characters

- ### Success Response:

  - **Code:** 200
  - **Content:**

  ```
  {
    "_id": "5e632ca3f4263a31a3c61015",
    "name": "userName"
  }
  ```

- ### Error response:
  - **Code:** 500
  - **Content:** `{ message: 'Server responded with an error.' }`  
    OR
  - **Code:** 409
  - **Content:** `{ "message": "The user with this userName already exists." }`
    OR
  - **Code:** 400
  - **Content:** `{ "message": "Explaination: what exactly is wrong." }`

---

## Login

Saves authorization token for the user in httpOnly cookies.

- ### URL:

  /signin

- ### Method:

  POST

- ### Authorization:

  None

- ### URL Params:

  None

- ### Data Params:

  userName = [String], user's name, 2 to 20 characters, letters and numbers only
  password = [String], 8-20 characters

- ### Success Response:

  - **Code:** 200
  - **Content:**

  ```
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTc0MWYwN2RmM2M1YjA2MzhlZjcxNzkiLCJpYXQiOjE1ODQ2ODcxODgsImV4cCI6MTU4NTI5MTk4OH0.HCO0_4yru_qy-MhGdtQ_R5pBC8gpI80xasdDDDaw"
  }
  ```

- ### Error response:
  - **Code:** 500
  - **Content:** `{ message: 'Server responded with an error.' }`  
    OR
  - **Code:** 401
  - **Content:** `{ "message": "Wrong user name or password." }`
    OR
  - **Code:** 400
  - **Content:** `{ "message": "Explaination: what exactly is wrong." }`

---

## Show All The Posts

Returns array of json datas of all the posts in DB with pagination

- ### URL:

  /posts

- ### Method:

  GET

- ### Authorization:

  **Required** token from `req.cookies.jwt`

- ### URL Params:
  pagination = [Number](5 by default) - The amount of posts per one page
  page = [Number](1 by default) - Ability to choose exact page of pagination

example: `https://url/api/posts?pagination=3&page=2`

- ### Data Params:

  None

- ### Success Response:

  - **Code:** 200
  - **Content:**

  ```
  [
    {
      "_id": "5ee72c221440fa0f2cf5d34d",
      "owner": {
          "_id": "5ee72bd01440fa0f2cf5d34c",
          "userName": "userName",
          "__v": 0
      },
      "text": "post text",
      "date": "2020-06-15T08:06:58.644Z",
      "__v": 0
    },
    {
      ...
    },
    ...,
  ]
  ```

- ### Error response:
  - **Code:** 500
  - **Content:** `{ message: 'Server responded with an error.' }`  
    OR
  - **Code:** 401
  - **Content:** `{ message: 'Authorization is required!' }`

---

## Add New Post

Adds new post to the posts collection. Returns this post's json data

- ### URL:

  /posts

- ### Method:

  POST

- ### Authorization:

  **Required** token from `req.cookies.jwt`

- ### URL Params:

  None

- ### Data Params:

  text = [String], 2 to 200 characters
  date = [Date], YYYY.MM.DD HH:MM format date. `Date.now` by default

- ### Success Response:

  - **Code:** 200
  - **Content:**

  ```
  {
    "_id": "5ee83d65e3fc55204e2087b5",
    "owner": "5ee8167468e601185ec0757b",
    "text": "some text for the post, that are no longer than 200 characters",
    "date": "2020-06-16T03:32:53.784Z",
    "__v": 0
  }
  ```

- ### Error response:
  - **Code:** 500
  - **Content:** `{ message: 'Server responded with an error.' }`  
    OR
  - **Code:** 400
  - **Content:** `{ "message": "Explaination: what exactly is wrong." }`
    OR
  - **Code:** 401
  - **Content:** `{ message: 'Authorization is required!' }`

---

<a name="install"></a>

## Installing

1. Clone repo:

```
git clone https://github.com/fckXYZ/chat-backend.git
cd chat-backend
```

## For Development:

1. Install dependencies:

```
npm install
```

2. Choose build:

- `npm run dev` - run server at 3000 port with hot-reload enabled.

## For Production:

1. Install Docker:

2. Run Docker container:

- `docker-compose up` - will install mongo and all dependencies and run server on 80 port
