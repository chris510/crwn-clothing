const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const compression = require('compression');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// const mongoConnect = require('./util/database');
const mongoose = require("mongoose");
// const User = require('./models/user.model');
const usersRoute = require("./routes/api/users.route");
const collectionsRoute = require("./routes/api/collection.route");
const db = require("./config/keys").mongoURI;

const app = express();
const port = process.env.PORT || 5000;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB..."));

app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  })
}

app.use(express.json());
app.use("/api/users", usersRoute)
app.use('/api/collections', collectionsRoute);

app.post('/payment', (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'usd'
  };

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr })
    } else {
      res.status(200).send({ success: stripeRes });
    }
  })
})

app.listen(port, () => console.log(`Server is listening on port: ${port}`));


