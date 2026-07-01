const http = require("http");
const fs = require("fs");
const path = require("path");

const booksPath = path.join(__dirname, "books.json");

function readBooks() {
  const data = fs.readFileSync(booksPath, "utf8");
  return JSON.parse(data);
}

function writeBooks(books) {
  fs.writeFileSync(booksPath, JSON.stringify(books, null, 2));
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (url === "/books") {
    if (method === "GET") {
      try {
        const books = readBooks();
        sendJson(res, 200, books);
      } catch (error) {
        sendJson(res, 500, { message: "Error reading books file" });
      }
      return;
    }

    if (method === "POST") {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        try {
          const newBook = JSON.parse(body);

          if (!newBook.title || !newBook.author || typeof newBook.price !== "number") {
            sendJson(res, 400, { message: "Invalid book data" });
            return;
          }

          const books = readBooks();
          const book = {
            id: books.length ? books[books.length - 1].id + 1 : 1,
            title: newBook.title,
            author: newBook.author,
            price: newBook.price,
            available: newBook.available !== undefined ? newBook.available : true,
          };

          books.push(book);
          writeBooks(books);
          sendJson(res, 201, book);
        } catch (error) {
          sendJson(res, 400, { message: "Invalid JSON" });
        }
      });
      return;
    }
  }

  const booksMatch = url.match(/^\/books\/(\d+)$/);

  if (booksMatch && method === "GET") {
    try {
      const books = readBooks();
      const book = books.find((item) => item.id === Number(booksMatch[1]));

      if (!book) {
        sendJson(res, 404, { message: "Book not found" });
      } else {
        sendJson(res, 200, book);
      }
    } catch (error) {
      sendJson(res, 500, { message: "Error reading books file" });
    }
    return;
  }

  if (booksMatch && method === "PUT") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const updates = JSON.parse(body);
        const books = readBooks();
        const index = books.findIndex((item) => item.id === Number(booksMatch[1]));

        if (index === -1) {
          sendJson(res, 404, { message: "Book not found" });
          return;
        }

        books[index] = { ...books[index], ...updates };
        writeBooks(books);
        sendJson(res, 200, books[index]);
      } catch (error) {
        sendJson(res, 400, { message: "Invalid JSON" });
      }
    });
    return;
  }

  if (booksMatch && method === "DELETE") {
    try {
      const books = readBooks();
      const index = books.findIndex((item) => item.id === Number(booksMatch[1]));

      if (index === -1) {
        sendJson(res, 404, { message: "Book not found" });
        return;
      }

      const [removedBook] = books.splice(index, 1);
      writeBooks(books);
      sendJson(res, 200, { message: "Book deleted", book: removedBook });
    } catch (error) {
      sendJson(res, 500, { message: "Error updating books file" });
    }
    return;
  }

  sendJson(res, 404, { message: "Route not found" });
});

server.listen(3000, () => {
  console.log("Library API running on port 3000");
});
