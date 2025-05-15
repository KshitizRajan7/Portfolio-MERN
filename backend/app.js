import { configDotenv } from 'dotenv';
configDotenv(); // loads environment variables from a .env file into process.env
import express from 'express';
import cookieParser from 'cookie-parser'; // parses cookies attached to the client request object
import cors from 'cors'; // enables Cross-Origin Resource Sharing (CORS) with various options
import {connectDB} from './database/db.js'; // connects to the database using a function from the config module
import viewerRoutes from './routes/viewer.route.js'; // imports the viewer routes from the routes module
import ownerRoutes from './routes/owner.route.js'; // imports the owner routes from the routes module

connectDB(); // calls the connectDB function to establish a connection to the database
const app = express();

app.use(cors()); // enables CORS with default options, allowing all origins and methods
app.use(express.json()); //parses incoming requests with JSON payloads and is based on body-parser
app.use(cookieParser()); //parses cookies attached to the client request object
app.use(express.urlencoded({ extended: true })); //parses urlencoded bodies (as sent by HTML forms) and makes them available under the req.body property
app.get('/', (req,res)=>{
    res.send('Hello World!');
})
app.use('/viewers',viewerRoutes); // mounts the viewer routes on the /viewers path
app.use('/owners',ownerRoutes); // mounts the owner routes on the /owners path

export default app; // exports the express app instance for use in other modules (like server.js)