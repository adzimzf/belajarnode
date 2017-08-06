var express = require('express');
var router = express.Router();
var Task = require('../model/Task');

/* GET home page. */
router.get('/s', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* create Route get which id is optional */
router.get('/:id?', function (req, res, next) {
    if (req.params.id) {
        Task.getTaskById(req.params.id, function (err, rows) {
              if (err) {
                  res.json(err);
              } else {
                  if (rows.length == 0) {
                      res.json({error : true, message:"id not found"})
                  } else {
                      res.json(rows);
                  }
              }
        });
    } else {
        Task.getAllTask(function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    }
});

/* create Route post */
router.post('/', function (req, res, next) {
    if (req.body.Id && req.body.Title && req.body.Status) {
        Task.addTask(req.body, function (err, count) {
            if (err) {
                res.json(req.body);
            } else {
                res.json(count); //or return count for 1 &amp;amp;amp; 0
            }
        });
    } else {
        res.json({error:true, message:"params required"});
    }


});


router.delete('/:id', function (req, res, next) {
   Task.deleteTask(req.params.id, function (err, count) {
       if (err) {
           res.json(err);
       } else {
           res.json(count);
       }
   })
});


router.put('/:id', function (req, res, next) {
    Task.updateTask(req.params.id, req.body, function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    })
});

module.exports = router;
