const express = require('express');
const app = express();
const cors = require('cors')
//mongoose
const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/ourGame'
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

mongoose.connect(uri, {
  useFindAndModify: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use(
  session({
    store: new MongoStore({
      mongooseConnection: mongoose.createConnection(uri, {
        useFindAndModify: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }),
    }),
    resave: false,
    saveUninitialized: false,
    secret: 'l_j*ks8jkfd',
    cookie: { secure: false },
  }),
);

const Team = require('./models/Team');

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use((req, res, next) => {
//   res.locals.team1 = req.session.team1;
//   res.locals.team2 = req.session.team2;
//   next();
// })

app.get('/teams', async (req, res) => {
  if (req.session.team1 && req.session.team2) {
    let team1 = await Team.findOne({ name: req.session.team1 })
    let team2 = await Team.findOne({ name: req.session.team2 })
    return res.send({
      team1: team1, team2: team2
    })
  }
  res.send({
    team1: undefined, team2: undefined
  })
})


app.get('/gameJson', async (req, res) => {
  //как парсить данные из файла
  let game = [
    {
      collectionTitle: 'Математика',
      collection:
        [{ question: '2+2', answer: '4', value: 200, }, { question: '3+2', answer: '5', value: 400, }, { question: '3*2', answer: '6', value: 600, }, { question: '3^2', answer: '9', value: 800, }, { question: '3/2', answer: '1.5', value: 1000, }]
    },
    {
      collectionTitle: 'Русский язык',
      collection:
        [{ question: 'мыш*', answer: 'ь', value: 200, }, { question: 'м*локо', answer: 'о', value: 400, }, { question: 'со*нце', answer: 'л', value: 600, }, { question: 'в*негрет', answer: 'и', value: 800, }, { question: 'длиннош*', answer: 'еее', value: 1000, }]
    }, {
      collectionTitle: 'Русский язык',
      collection:
        [{ question: 'мыш*', answer: 'ь', value: 200, }, { question: 'м*локо', answer: 'о', value: 400, }, { question: 'со*нце', answer: 'л', value: 600, }, { question: 'в*негрет', answer: 'и', value: 800, }, { question: 'длиннош*', answer: 'еее', value: 1000, }]
    }, {
      collectionTitle: 'Русский язык',
      collection:
        [{ question: 'мыш*', answer: 'ь', value: 200, }, { question: 'м*локо', answer: 'о', value: 400, }, { question: 'со*нце', answer: 'л', value: 600, }, { question: 'в*негрет', answer: 'и', value: 800, }, { question: 'длиннош*', answer: 'еее', value: 1000, }]
    }, {
      collectionTitle: 'Русский язык',
      collection:
        [{ question: 'мыш*', answer: 'ь', value: 200, }, { question: 'м*локо', answer: 'о', value: 400, }, { question: 'со*нце', answer: 'л', value: 600, }, { question: 'в*негрет', answer: 'и', value: 800, }, { question: 'длиннош*', answer: 'еее', value: 1000, }]
    }, {
      collectionTitle: 'Русский язык',
      collection:
        [{ question: 'мыш*', answer: 'ь', value: 200, }, { question: 'м*локо', answer: 'о', value: 400, }, { question: 'со*нце', answer: 'л', value: 600, }, { question: 'в*негрет', answer: 'и', value: 800, }, { question: 'длиннош*', answer: 'еее', value: 1000, }]
    }
  ]

  res.send(game)
})


app.post('/auth', async (req, res) => {
  let team1 = await Team.findOne({ name: req.body.team1 })
  let team2 = await Team.findOne({ name: req.body.team2 })
  if (!team1) {
    team1 = await Team.create({ name: req.body.team1 })
  }
  if (!team2) {
    team2 = await Team.create({ name: req.body.team2 })
  }
  req.session.team1 = team1.name;
  req.session.team2 = team2.name;

  res.send({
    team1: team1.name,
    rating1: team1.rating,
    team2: team2.name,
    rating2: team2.rating,
  })
})

// {
//   team1: 'Название команды 1';
//   team1Rating: 'число - рейтинг команды 1';
//   team2: 'Название команды 1';
//   team2Rating: 'число - рейтинг команды 1'
// }

app.post('/finish', async (req, res) => {
  await Team.updateOne({ name: req.body.team1 }, {
    $inc: { rating: req.body.team1Rating }, $push: {
      rounds: {
        enemy: req.body.team2,
        myRating: req.body.team1Rating,
        enemyRating: req.body.team2Rating,
      }
    }
  })
  await Team.updateOne({ name: req.body.team2 }, {
    $inc: { rating: req.body.team2Rating }, $push: {
      rounds: {
        enemy: req.body.tea1,
        myRating: req.body.team2Rating,
        enemyRating: req.body.team1Rating,
      }
    }
  })
})

app.listen(3001)
