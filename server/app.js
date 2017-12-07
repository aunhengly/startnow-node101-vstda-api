const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const todoItem = require('../todoItems.json');

app.use(bodyParser.json(todoItem));
app.use(morgan('dev'));

// add your code here
app.get('/', function(req, res){
    //return res.data;
    res.status(200).json({status: "ok"});
})

app.get('/api/TodoItems', (req,res) => {
    res.send(todoItem);
})
app.get('/api/TodoItems/complete', (req, res) => {
    const result = todoItem.filter(item => {
        return (item.todoItemId !== undefined && item.name !== undefined
            && item.priority !== undefined && item.completed !== undefined);
    });
    res.send(result);
})

app.get('/api/TodoItems/incomplete', (req, res) => {
    const incresult = todoItem.filter(item => {
        return (item.todoItemId == undefined || item.name == undefined 
            || item.priority == undefined || item.completed == undefined);
    });
    res.send(incresult);
})

app.get('/api/TodoItems/completed', (req, res) => {
    for (let i=0; i<todoItem.length; i++){
        if (todoItem[i].completed)
        {
          res.json(todoItem[i]);
          return ;
        }
    }
    res.status(500);    
})

app.get('/api/TodoItems/:number', (req,res) => {
    var number = req.params.number;
    var obj = todoItem.find((todo) => todo.todoItemId == number);
    res.send(obj);
})

app.post('/api/TodoItems', (req, res) => {
    // var addItem = [];
    // todoItem.forEach(element => {
    //     if(element == req.body){

    //     }
    // });
    if(typeof req == object){
        res.send('NOt ok');
    }
    res.status(201).send(req.body);
    
})

app.delete('/api/TodoItems/:number', (req,res) =>{
    var delnum= req.params.number;
    var deletedItems = todoItem.splice(delnum, 1)
    res.json(deletedItems[0]);// because splice is return in array but the expected result is in obeject so [0] is to return the index 0;
})

app.put('/api/todoItems/:number', (req, res) => {
    var updatenum = req.params.number;
    todoItem[updatenum] = req.body;
    res.json(todoItem[updatenum]);
})

app.patch('/api/todoItems/:number', (req, res) => {
    var updatenum = req.params.number;
    todoItem[updatenum] = req.body;
    res.json(todoItem[updatenum]);
})

module.exports = app;