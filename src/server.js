require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const {connect} = require('./db');

const booksRouter = require('./router/Books');

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/books', booksRouter);
app.get('/health', (_req, res) => res.json({status: 'ok'}));

const port = process.env.PORT || 3000;

connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
    })
    .catch((err) => {
        console.error('MongoDB connection failed with error:', err);
        process.exit(1);
    });