const controller = require('express').Router()
const Blog = require('../models/blog')

controller.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  asJson(response, 200, blogs)
})

controller.post('/', async (request, response) => {
  let blog = request.body

  if (! (blog.title && blog.url)) {
    return errorAsJson(response, 400, "'title' and 'url' must be provided")
  }

  blog.likes = blog.likes ? blog.likes : 0

  const savedBlog = await new Blog(blog).save()
  asJson(response, 201, savedBlog)
})

controller.put('/:id', async (request, response) => {
  const blog = request.body
  const id = request.params.id

  if (! (blog.title && blog.url)) {
    errorAsJson(response, 400, "'title' and 'url' must be provided")
  } else {
    try {
      const existingBlog = await Blog.findById(id)

      if (! existingBlog) {
        return errorAsJson(response, 404, `Blog by id ${id} not found`)
      }

      const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
      asJson(response, 200, updatedBlog)
    } catch(e) {
      errorAsJson(response, 400, `Malformed id '${request.params.id}' provided`)
    }
  }
})

controller.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch(e) {
    errorAsJson(response, 400, `Malformed id '${request.params.id}' provided`)
  }
})

const asJson = (response, status, blog) => response.status(status).json(blog)
const errorAsJson = (response, status, msg) => response.status(status).json({ "error": msg })

module.exports = controller