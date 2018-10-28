const supertest = require('supertest')
const { app, server } = require('../../index')
const api = supertest(app)
const Blog = require('../../models/blog')

const blogsRoute = "/api/blogs"

const getBlogs = () => [
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
    getBlogs().map(b => new Blog(b).save())
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

    expect(blogs.length).toBe(getBlogs().length)
    expect(blogs.find(b => b.author === "Michael Chan").title).toBe("React patterns")
  })
})

describe("POST /api/blogs", async () => {

  test("saves a new blog in the database", async () => {
    const blog = { 'title': "New blog" }

    await api
      .post(blogsRoute)
      .send(blog)

    const blogs = (await api.get(blogsRoute)).body

    expect(blogs.length).toBe(getBlogs().length + 1)
    expect(blogs.find(b => b.title === "New blog")).toBeTruthy
  })

  test("accepts and saves only Blog fields", async () => {
    const blog = {
      'title': "New blog",
      'author': "Unknown",
      'url': "http://localhost",
      'likes': 0,
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
})

afterAll(() => server.close())