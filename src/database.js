import { connect } from 'mongoose';

const dbURI= 'mongodb+srv://testuser:Pbepass1.1@cluster0.yqs2u.mongodb.net/moviesdb?retryWrites=true&w=majority';
connect(dbURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(db => console.log('Database succesfully connected'))
  .catch(err => console.log(err));