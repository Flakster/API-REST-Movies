const express = require('express');
const router = express.Router();

const Movie = require('../models/Movie');

router.get('/movies/add', (req,res)=>{
  res.render('movies/new-movie');
});

router.post('/movies/new-movie', async (req,res) => {
  const { name, director, classification } = req.body;
  console.log(req.body)
  const errors = [];
  if (!name) {
    errors.push({text: 'Please type the name of the movie'});
  }
  if (!director){
    errors.push({text: 'Please type the director\'s name'});
  }
  if (!classification){
    errors.push({text: 'Please choose a classification for the movie'});
  }
  if (errors.length > 0){
    res.render('movies/new-movie', {
      errors,
      name, 
      director,
      classification
    })
  }
  else {
    const newMovie = new Movie({name, director, classification});
    await newMovie.save();
    req.flash('success_msg', 'The movie was successfully saved')
    res.redirect('/movies');
  }
});

router.get('/movies', async (req,res)=>{
  const movies = await Movie.find().lean();
  res.render('movies/all-movies', { movies });
});

router.get('/movies/edit/:id', async(req,res) =>{
  const movie = await Movie.findById(req.params.id).lean();
  res.render('movies/edit-movie', { movie });
});

router.put('/movies/edit-movie/:id', async (req,res) =>{
  const {name, director, classification} = req.body;
  await Movie.findByIdAndUpdate(req.params.id, {name, director, classification});
  res.redirect('/movies');
});

router.delete('/movies/delete/:id', async (req,res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.redirect('/movies');
});

module.exports = router;