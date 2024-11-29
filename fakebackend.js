// fakeBackend.js

const { createServer } = require('the-fake-backend');

const server = createServer();

server.routes([
  {
    path: '/signup/basic',
    methods: [
      {
        type: 'post',
        data: (req) => {
          // Simulate saving user data and returning a response
          const { email, password } = req.body;
          if (email && password) {
            return { success: true, message: "User signed up successfully!" };
          }
          return { success: false, message: "Invalid input!" };
        },
      },
    ],
  },
  {
    path: '/signup/pro',
    methods: [
      {
        type: 'post',
        data: (req) => {
          const { email, password } = req.body;
          if (email && password) {
            return { success: true, message: "User signed up successfully!" };
          }
          return { success: false, message: "Invalid input!" };
        },
      },
    ],
  },
  {
    path: '/signup/enterprise',
    methods: [
      {
        type: 'post',
        data: (req) => {
          const { email, password } = req.body;
          if (email && password) {
            return { success: true, message: "User signed up successfully!" };
          }
          return { success: false, message: "Invalid input!" };
        },
      },
    ],
  },
]);

server.listen(8080);