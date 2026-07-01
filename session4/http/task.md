# 🧾 Assignment: Library Book Management API

## 📖 Objective

Build a simple REST API using **Node.js HTTP Module** (without Express) to manage a library's books.

All book data should be stored inside a JSON file (`books.json`).

Use only the following built-in modules:

- `http`
- `fs`
- `path`

---

# 📚 Book Object Structure

Each book should have the following properties:

```json
{
  "id": 1,
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "price": 450,
  "available": true
}
```

> **Note:** The `id` should be generated automatically by the server.

---

# 📂 Data Storage

Create a file named:

```text
books.json
```

Store all books inside this file as a JSON array.

Example:

```json
[
  {
    "id": 1,
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "price": 450,
    "available": true
  }
]
```

---

# 📌 Required API Endpoints

## 1️⃣ Get All Books

### Request

```http
GET /books
```

### Description

Return all books stored in `books.json`.

### Success Response

Status Code:

```text
200 OK
```

---

## 2️⃣ Add a New Book

### Request

```http
POST /books
```

### Request Body

```json
{
  "title": "JavaScript: The Good Parts",
  "author": "Douglas Crockford",
  "price": 300,
  "available": true
}
```

### Requirements

- Read the request body.
- Parse the JSON data.
- Generate a unique `id`.
- Add the new book to the JSON file.
- Save the updated data.

### Success Response

Status Code:

```text
201 Created
```

Return the newly added book.

---

## 3️⃣ Delete a Book

### Request

```http
DELETE /books/:id
```

Example:

```http
DELETE /books/3
```

### Requirements

- Extract the book ID from the URL.
- Remove the matching book from the JSON file.
- Save the updated data.

If the book does not exist, return:

```text
404 Not Found
```

---

# ⚠️ Error Handling

Your server should handle the following situations:

- Invalid route
- Invalid JSON in the request body
- Book not found
- File read/write errors

Return appropriate HTTP status codes and JSON error messages.

---

# 📋 Requirements

- Use only the **HTTP Module** (do not use Express).
- Use a JSON file as the database.
- Generate IDs automatically.
- Return responses in **JSON** format.
- Organize your code clearly.
- Handle all possible errors gracefully.

---

# ⭐ Bonus (Optional)

Implement one or more of the following endpoints:

### Get a Book by ID

```http
GET /books/:id
```

---

### Update Book Information

```http
PUT /books/:id
```

Allow updating one or more book properties.

---
