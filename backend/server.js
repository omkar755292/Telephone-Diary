const express = require('express');
const env = require('dotenv');
const cors = require('cors');
const contactRouter = require('./routes/contactRouter');
const connectDB = require('./config/connectionDB');
const errorHandler = require('./middleware/errorHandler');
const userRouter = require('./routes/userRouter');

env.config();
const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 5000;

connectDB();
const app = express();

//middleware and router
app.use(express.json());
app.use(cors());
app.use('/api/contact', contactRouter);
app.use('/api/user', userRouter);
app.use(errorHandler);

app.listen(port, (req, res) => {
    console.log(`server listening on port http://${hostname}:${port}`);
});