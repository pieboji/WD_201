/* eslint-disable no-unneeded-ternary */
const express = require('express')
const app = express()
const { Todo } = require('./models')
const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.get('/', async (request, response) => {
  console.log('List todos')
  try {
    const alltodos = await Todo.getAllTodos()
    return response.json(alltodos)
  } catch (error) {
    console.log(error)
    return response.status(422).json(error)
  }
})

app.get('/todos', async function (_request, response) {
  console.log('Processing list of all Todos ...')
  try {
    const alltodos = await Todo.getAllTodos()
    return response.json(alltodos)
  } catch (error) {
    console.log(error)
    return response.status(422).json(error)
  }
})

app.get('/todos/:id', async function (request, response) {
  try {
    const todo = await Todo.findByPk(request.params.id)
    return response.json(todo)
  } catch (error) {
    console.log(error)
    return response.status(422).json(error)
  }
})

app.post('/todos', async function (request, response) {
  try {
    const todo = await Todo.addTodo(request.body)
    return response.json(todo)
  } catch (error) {
    console.log(error)
    return response.status(422).json(error)
  }
})

app.put('/todos/:id/markAsCompleted', async function (request, response) {
  const todo = await Todo.findByPk(request.params.id)
  try {
    const update = await todo.markAsCompleted()
    return response.json(update)
  } catch (error) {
    console.log(error)
    return response.status(422).json(error)
  }
})
app.delete('/todos/:id', async function (request, response) {
  console.log('We have to delete a Todo with ID: ', request.params.id)
  try {
    const delte = await Todo.destroy({ where: { id: request.params.id } })
    return response.json(delte ? true : false)
  } catch (error) {
    console.log(error)
    return response.status(422).json(error)
  }
})

module.exports = app