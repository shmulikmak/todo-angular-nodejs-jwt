
const _ = require('lodash');
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const TODOS = require('./TODOS');
const USERS = require('./USERS');

app.use(bodyParser.json());
app.use(expressJwt({secret: 'todo-app-super-shared-secret'}).unless({path: ['/api/auth']}));


function getTodos(userID) {
    const todos = _.filter(TODOS, ['user_id', userID]);

    return todos;
}
function getTodo(todoID) {
    const todo = _.find(TODOS, (todo) => { return todo.id == todoID; })

    return todo;
}
function getUsers() {
    return USERS;
}


app.post('/api/auth', (req, res) => {
    const body = req.body;

    const user = USERS.find(user => user.username == body.username);
    if (!user || body.password != 'todo') return res.sendStatus(401);

    const token = jwt.sign({ userID: user.id }, 'todo-app-super-shared-secret', { expiresIn: '2h' });
    res.send({ token });
});

app.get('/', (req, res) => {
    res.send('Angular JWT Todo API Server')
});
app.get('/api/todos', (req, res) => {
    res.type("json");
    res.send(getTodos(req.user.userID));
});
app.get('/api/todos/:id', (req, res) => {
    var todoID = req.params.id;
    res.type("json");
    res.send(getTodo(todoID));
});
app.get('/api/users', (req, res) => {
    res.type("json");
    res.send(getUsers());
});


app.listen(4000, () => console.log('Example app listening on port 4000!'))