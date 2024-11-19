import cors from "cors";
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import data from './api/data.js';
import index from './api/index.js';
import login from './api/login.js';
import { verifyToken } from './utils.js';

const swaggerDocument = YAML.load('./openapi/api.yaml');
const app = express();

app.use(express.json());
app.use(cors());

// Swagger documentation route
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/', index);
app.use('/data', verifyToken, data);
//app.use('/data', verifyRefreshToken, data);
app.use('/login', login);

// Catch 404 for undefined routes
app.use((req, res, next) => {
    res.status(404).json({ error: "Route not found" });
});

// for general error handling 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "An unexpected error occurred" });
});

export default app;
