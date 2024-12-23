import cors from "cors";
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import data from './api/data.js';
import index from './api/index.js';
import login from './api/login.js';


const swaggerDocument = YAML.load('./openapi/api.yaml');
const app = express();
app.use(express.json());

app.use(cors());

app.use('/doc', swaggerUi.serve,   swaggerUi.setup(swaggerDocument));
app.use('/', index);
app.use('/data', data);
app.use('/login', login);

export default app;