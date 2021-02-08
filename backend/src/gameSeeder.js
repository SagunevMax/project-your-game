const mongoose = require('mongoose');
const GameCollection = require('../models/gameCollection')
const uri = 'mongodb://localhost:27017/ourGame'
mongoose.connect(uri, {
  useFindAndModify: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const gameRawData = [
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



const seeder = async () => {
  for (el of gameRawData) {
    const newGameCollection = new GameCollection({
      collectionTitle: el.collectionTitle,
      questions: el.collection
    })
    await newGameCollection.save()
  }
  mongoose.disconnect()
}

seeder()
