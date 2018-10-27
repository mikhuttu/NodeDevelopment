const supertest = require('supertest')
const { app, server } = require('../../index')
const api = supertest(app)
//const Blog = require('../../models/blog')

const blogsRoute = "/api/blogs"

//beforeEach(async () => await Blog.remove({}))

//const insertBlogs = blogs => async () =>
//  await Promise.all(
//    blogs.map(b => new Blog(b).save())
//  )

describe("GET /api/blogs", async () => {

  test("returns blogs in application/json format", async () => {
    await api
      .get(blogsRoute)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  /*test("returns all blogs saved in database", async () => {
    await insertBlogs(blogs)
    const body = await api.get(blogsRoute).body

    expect(body.blogs.length).toBe(blogs.length)
  })*/
})

afterAll(() => server.close())

const blogs = [
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
