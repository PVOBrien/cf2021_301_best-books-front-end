'use strict';

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());


require('dotenv').config();
const PORT = process.env.PORT || 3001;
const DATABASE_URL = process.env.DATABASE_URL;

const User = require('./models/User');

app.use(express.json()); // IMPORTANT: middleware that makes things usable.

// mongoDB start up (don't forget to npm i mongoose --save)
const mongoose = require('mongoose'); // https://mongoosejs.com/docs/ && https://docs.mongodb.com/manual/mongo/#start-the-mongo-shell-and-connect-to-mongodb  && https://tecadmin.net/tutorial/mongodb/create-database/
const { getMaxListeners } = require('./models/User');
const { response } = require('express');
mongoose.connect(`mongodb://${DATABASE_URL}/bookdb`, { useNewUrlPaser: true, useUnifiedTopology: true });
// mongoose.connect('mongdb://localhost/test', {useNewUrlPaser: true, useUnifiedTopology: true});

const db = mongoose.connection;  // https://docs.microsoft.com/en-us/windows/wsl/tutorials/wsl-database#install-mongodb && https://canvas.instructure.com/courses/2601683/assignments/20641359?module_item_id=43103134
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log(`we're connected to mongoDB`);
});

// const poBrien = new User({
//   email: 'mxpxp86@gmail.com',
//   books: [
//     { name: 'The Passage', description: 'A modern reshaping of the power of the vampyr.', status: 'readable' },
//     { name: 'Les Miserables', description: 'An epic sweep of France during revolutions as it follows prisoner 24601.', status: 'classic' }
//   ]
// });
// poBrien.save();
// console.log({ poBrien });
// mongoDB starter db commands, step throughs https://www.concretepage.com/questions/665#:~:text=%20How%20to%20show%20table%20data%20in%20MongoDB,data%20with%20a%20condition%20as%20following.%20More%20

app.get('/books', getBooks);
async function getBooks(req, res) {
  const name = req.query.user_name;
  console.log('name req', name);
  await User.find({ email: 'mxpxp86@gmail.com' }, function (error, items) {
    if (error) return console.error(error);
    console.log('what is', items);
    res.status(200).send(items[0]);
  })
}

app.post('/postRoute', makeThing);
async function makeThing(request, res) {
  try {
    let params = request.body.params;
    console.log('params:', params);
    const id = params.name;
    const addBook = params.newBook;

    console.log('id', id);

  
    User.findOne({_id: id}, (err, entry) => {
      if (err) return console.error(err);
      console.log(entry);
      entry.books.push(addBook);
      entry.save();
      console.log('after save', entry);
      res.status(200).send(entry.books); // TODO: resend the stuff at the end!!!
    })
  } catch (err) {
    res.status(500).send('we\'re working on it!');
  }
}

app.delete('/item/:index', deleteItem);
function deleteItem(req, res) {
  const index = req.params.index;
  const userName = req.query.theUserId;
  console.log(parseInt(index), { userName });

  User.findOne({ _id: userName }, (error, entry) => {
    if (error) return error;
    console.log('fresh entry', entry);
    const newItemArray = entry.books.filter((item, i) => {
      console.log('this item:', item);
      console.log(i !== parseInt(index));
      return i; //   !== parseInt(index) // it's removing the item by exclusion.
    });

    entry.books = newItemArray;
    entry.save();
    console.log('entry after removal', entry);
    res.status(200).send(entry);
  });
}

app.put('/item/:index', updateItem);
function updateItem(req, res) {
  const index = req.params.index;
  const newBook = req.body.bookToAdd;
  const theUserId = req.body.idOfUser;

  console.log('index:', index);
  console.log('newBook:', newBook);
  console.log('theUser:', theUserId);

  User.findOne({ _id: theUserId }, (err, user) => {
    if (err) response.status(500).send(err);
    // const newBookEntry = {  }
    user.books.splice(parseInt(index), 1, newBook);
    console.log('before save', user.books);
    user.save();
    console.log('after save', user.books);
    res.status(200).send(user.books);
  });
}


app.get('/thisRouteForStuff', gedIt);
function gedIt(req, res) {
  console.log('Happening. Ged\en\'it');
}

app.listen(PORT, () => console.log(`listening here: ${PORT}`));