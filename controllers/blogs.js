const controller = require('express').Router()
const Blog = require('../models/blog')

controller.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

controller.post('/', async (request, response) => {
  const blog = request.body
  const savedBlog = await new Blog(blog).save()

  response.status(201).json(savedBlog)
})

module.exports = controller