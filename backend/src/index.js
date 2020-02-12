const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const app = express();
const port = 3000;


mongoose.connect('mongodb+srv://admin:ybWmDDBmQVxdaDys@cluster0-diyk5.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(
    () => console.log("DB Connected"),
    err => console.log(err.reason)
);

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port,() => console.log(`App listening on port ${port}!`));