const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null      
    });
  });

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

// This Route return the only selected fields   

exports.getAll = (Model,fieldsString) =>
  catchAsync(async (req, res, next) => {

    //console.log(Model);
    let filter = {};
    if (req.params.genre) filter = { genre: req.params.genre};

    let selectFields ={};
    selectFields = fieldsString;

    const features = Model.find(filter).select(selectFields);
    // const doc = await features.query.explain();
    const doc = await features;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc
      }
    });
  });

  exports.showAll = Model =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on tour (hack)
    let filter = {};
    if (req.params.genre) filter = { genre: req.params.genre};

    const features = Model.find(filter);

    // const doc = await features.query.explain();
    const doc = await features;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc
      }
    });
  });  


  exports.addNewData = (Model,fieldTobeUpdated) => catchAsync(async(req,res,next) =>{
    let query ={};

    switch(fieldTobeUpdated){
      case 'books':
        query = {books: req.body.books};
        break;
      case 'videos':
        query = {videos: req.body.videos};
        break;
      case 'courses':
        query = {courses: req.body.courses};
        break;  
      default:
        console.log("Oops!")   

    }

    const doc = await Model.findByIdAndUpdate(req.params.id,{
      $push:query
    })

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc
      }
    });
  });