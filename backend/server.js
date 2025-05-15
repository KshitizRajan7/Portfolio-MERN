import http from 'http';
import app from './app.js'; // app is an instance of express

const server = http.createServer(app); // creates an HTTP server and passes the express app to it
server.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
})

