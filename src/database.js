const mongoose = require('mongoose');

const dbURI= 'mongodb+srv://testuser:Pbepass1.1@cluster0.yqs2u.mongodb.net/moviesdb?retryWrites=true&w=majority';

mongoose.connect(dbURI,{
    useNewUrlparser: true,
    useUnifiedTopology:true
  })
  .then(db => console.log('Database succesfully connected'))
  .catch(err => console.log(err));