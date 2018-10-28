const supertest = require('supertest')
const { app, server } = require('../../index')
const api = supertest(app)
const Blog = require('../../models/blog')

const blogsRoute = "/api/blogs"
const blogRoute = id => `${blogsRoute}/${id}`

const preStoredBlogs = () => [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html"
  }
]

beforeEach(async () => {
  await Blog.remove({})

  await Promise.all(
    preStoredBlogs().map(b => new Blog(b).save())
  )
})

describe("GET /api/blogs", async () => {

  test("returns blogs in application/json format", async () => {
    await api
      .get(blogsRoute)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test("returns all blogs saved in database", async () => {
    const blogs = (await api.get(blogsRoute)).body

    expect(blogs.length).toBe(preStoredBlogs().length)
    expect(blogs.find(b => b.author === "Michael Chan").title).toBe("React patterns")
  })
})

describe("POST /api/blogs", async () => {

  test("saves a new blog in the database", async () => {
    const blog = { 'title': "New blog", 'url': "http://localhost" }

    await api
      .post(blogsRoute)
      .send(blog)

    const blogs = (await api.get(blogsRoute)).body

    expect(blogs.length).toBe(preStoredBlogs().length + 1)
    expect(blogs.find(b => b.title === "New blog")).toBeTruthy
  })

  test("accepts and saves only Blog fields", async () => {
    const blog = {
      'title': "New blog",
      'author': "Unknown",
      'url': "http://localhost",
      'likes': 3,
      'herp': "derp"
    }

    const response = await api
      .post(blogsRoute)
      .send(blog)

    const savedBlog = response.body

    expect(savedBlog.title).toBe(blog.title)
    expect(savedBlog.author).toBe(blog.author)
    expect(savedBlog.url).toBe(blog.url)
    expect(savedBlog.likes).toBe(blog.likes)
    expect(savedBlog.herp).toBeUndefined
  })

  test("stores 'likes' as 0 if it's not provided", async () => {
    const blog = { 'title': "New blog", 'url': "http://localhost" }

    const response = await api
      .post(blogsRoute)
      .send(blog)

    expect(response.body.likes).toBe(0)
  })

  describe("returns 400 if", async () => {

    test("title is not provided", async () => {
      const invalidBlog = { 'url': "http://localhost" }

      await api
        .post(blogsRoute)
        .send(invalidBlog)
        .expect(400)
    })

    test("url is not provided", async () => {
      const invalidBlog = { 'title': "New blog" }

      await api
        .post(blogsRoute)
        .send(invalidBlog)
        .expect(400)
    })
  })
})

describe("PUT /api/blogs/:id", async () => {

  test("updates a blog by its id", async () => {
    let blog = await Blog.findOne({ 'title': "React patterns" })
    blog.likes = 15

    const response = await api
      .put(blogRoute(blog._id))
      .send(blog)
      .expect(200)

    expect(response.body.likes).toBe(15)
  })

  describe("returns 400 if", async () => {

    test("title is not provided", async () => {
      let blog = await Blog.findOne({ 'title': "React patterns" })
      blog.title = undefined

      await api
        .put(blogRoute(blog._id))
        .send(blog)
        .expect(400)
    })

    test("url is not provided", async () => {
      let blog = await Blog.findOne({ 'title': "React patterns" })
      blog.url = undefined

      await api
        .put(blogRoute(blog._id))
        .send(blog)
        .expect(400)
    })

    test("id is malformed", async () => {
      const blog = {
        '_id': "4f8550e8e4604",
        'title': "New blog",
        'url': "http://localhost"
      }

      await api
        .put(blogRoute(blog._id))
        .send(blog)
        .expect(400)
    })
  })

  test("returns 404 if no blog by given id exists", async () => {
    const blog = {
      '_id': "4f8550e8e4604977920415e4",
      'title': "New blog",
      'url': "http://localhost"
    }

    await api
      .put(blogRoute(blog._id))
      .send(blog)
      .expect(404)
  })
})

describe("DELETE /api/blogs/:id", async () => {

  test("deletes a blog by its id", async () => {
    let blog = await Blog.findOne({ 'title': "React patterns" })

    await api
      .delete(blogRoute(blog._id))
      .expect(204)

    expect(await Blog.findOne({ 'title': "React patterns" })).toBeUndefined
    expect((await Blog.find({})).length).toBe(preStoredBlogs().length - 1)
  })

  test("doesn't do anything if the id doesn't belong to any blog", async () => {
    const randomId = "4f8550e8e4604977920415e4"

    await api
      .delete(blogRoute(randomId))
      .expect(204)

    expect((await Blog.find({})).length).toBe(preStoredBlogs().length)
  })

  test("returns 400 if the id is malformed", async () => {
    const malformedId = "4f8550e8e4604"

    await api
      .delete(blogRoute(malformedId))
      .expect(400)
  })
})

afterAll(() => server.close())