var express = require('express');
var router = express.Router();
var Todo = require('../models/todo.model.js');
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.get('/todos', function(req, res){
  Todo.find({}, function(err, foundTodos){
    if(err){
      return res.status(500).json({ //this stop the function from running further and crashing your application
        err: err
      });
    }
    return res.status(200).json({
      todos: foundTodos
    });
  });
});
router.get('/todos/:id', function(req, res, next){
  Todo.find({_id: req.params.id}, function(err, foundTodo){
    if(err){
      res.status(500).json({
        err: err
      });
      next(); //this will stop the application from running further in the function and crashing your app
    }
    res.status(200).json({
      todo: foundTodo
    });
  });
});
router.post('/todos', function(req, res){
  var todo = new Todo(req.body);
  todo.save(function(err){
    if(err){
      // throw err; //don't do this! for now...
      res.status(500).json({
        err: err
      });
    } else { //this will keep the app from trying to send two responses and crashing the application
      res.status(201).json({
        msg: 'successfully created todo'
      });
    }

  });
});
router.put('/todos/:id', function(req, res){
  Todo.findOneAndUpdate({_id: req.params.id}, req.body, function(err, oldTodo){
    if(err){ //if left like the following, the function will try to return two response if there is an error, crashing your application
      res.status(500).json({
        err: err
      });
    }
    res.status(200).json({
      msg: oldTodo
    });
  });
});
router.delete('/todos/:id', function(req, res){
  Todo.findOneAndRemove({ _id: req.params.id }, function(err, deletedTodo){
    if(err){ //if left like the following, the function will try to return two response if there is an error, crashing your application
      res.status(500).json({
        err: err
      });
    }
    res.status(200).json({
      msg: deletedTodo
    });
  });
});
router.get('/todos/description/:desc', function(req, res){
  Todo.find({ description: req.params.desc }, function(err, foundTodos){
    if(err){ //if left like the following, the function will try to return two response if there is an error, crashing your application
      res.status(500).json({
        err: err
      });
    }
    res.status(200).json({
      todos: foundTodos
    });
  });
});

module.exports = router;
