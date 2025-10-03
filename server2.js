import { createServer } from "http";
const PORT = process.env.PORT;

const users = [
  { id: 1, name: "Jon Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 3, name: "Jill Doe" },
];

// logger middleware
const logger = (req, res, next) => {
  console.log(`${req.method}, ${req.url}`);
  next();
};

//json middleware
const jsonMiddleware = (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
};

// route handler for GET api/users
const getUserHandler = (req, res) => {
  res.write(JSON.stringify(users));
  res.end();
};

//route handler for get user id
const getUserByIdHandler = (req, res) => {
  const id = req.url.split("/")[3];
  const user = users.find((user) => user.id === parseInt(id));

  if (user) {
    res.write(JSON.stringify(user));
  } else {
    res.statusCode = 404;
    res.write(JSON.stringify({ message: "User not found" }));
  }
  res.end();
};

//not found
const notFoundHandler = (req, res) => {
  res.statusCode = 404;
  res.write(JSON.stringify({ message: "Route not found" }));
  res.end();
};
const server = createServer((req, res) => {
  logger(req, res, () => {
    jsonMiddleware(req, res, () => {
      if (req.url === "/api/users" && req.method === "GET") {
        getUserHandler(req, res);
      } else if (
        req.url.match(/\/api\/users\/([0-9]+)/) &&
        req.method === "GET"
      ) {
        getUserByIdHandler(req, res)
      } else {
        notFoundHandler(req, res)
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
