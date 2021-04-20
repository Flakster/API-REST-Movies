const express = require('express');
const router = express.Router();

const Classification = require('../models/Classification');

router.get('/classifications/add', (req,res)=>{
  res.render('classifications/new-classification');
});

router.post('/classifications/new-classification', async (req,res) =>{
  const {code, description} = req.body;
  const errors = [];
  if (!code){
    errors.push({text: 'Please type the code for this classification'});
  }
  if (!description){
    errors.push({text: 'Please type the description for this classification'});
  }
  if (errors.length > 0 ){
    res.render('classification/new-classification', {
      errors,
      code,
      description
    });
  } else {
    const newClassification = new Classification({code, description});
    await newClassification.save();
    req.flash('success_msg', 'The new classification was successfully saved')
    res.redirect('/classifications');
  }

});

router.get('/classifications', async (req,res)=>{
  const classifications = await Classification.find().lean();
  res.render('classifications/all-classifications', { classifications });
});

router.get('/classifications/edit/:id', async(req,res) =>{
  const {_id, code, description} = await Classification.findById(req.params.id).lean();
  res.render('classifications/edit-classification', { _id, code, description });
});

router.put('/classifications/edit-classification/:id', async (req,res) =>{
  const {code, description} = req.body;
  await Classification.findByIdAndUpdate(req.params.id, {code, description}, {
    useFindAndModify: false
  });
  req.flash('success_msg', 'The classification information was successfully changed')
  res.redirect('/classifications');
});

router.delete('/classifications/delete/:id', async (req,res) => {
  await Classification.findByIdAndDelete(req.params.id, {
    useFindAndModify: false
  }); 
  req.flash('success_msg', 'The classification was successfully deleted')
  res.redirect('/classifications');
});

module.exports = router;