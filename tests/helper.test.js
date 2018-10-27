const { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes } = require('../utils/helper')

test('dummy is called', () => {
  const blogs = []

  const result = dummy(blogs)
  expect(result).toBe(1)
})

describe('totalLikes', () => {

  test('returns 0 if the blog list is empty', () => {
    const blogs = []
    expect(totalLikes(blogs)).toBe(0)
  })

  test('returns the sum of likes for each blog in the list', () => {
    const blogs = getBlogs()
    const sum = 7 + 5 + 12 + 10 + 0 + 2

    expect(totalLikes(blogs)).toBe(sum)
  })
})

describe('favouriteBlog', () => {

  test('returns undefined if the blog list is empty', () => {
    const blogs = []
    expect(favouriteBlog(blogs)).toBe(undefined)
  })

  test('finds the blog with the most likes', () => {
    const blogs = getBlogs()
    const favourite = blogs[2]

    expect(favouriteBlog(blogs)).toBe(favourite)
  })
})

describe('mostBlogs', () => {

  test('returns undefined if the blog list is empty', () => {
    const blogs = []
    expect(mostBlogs(blogs)).toBe(undefined)
  })

  test('returns the name of the author if the blog list contains only a single entry', () => {
    const blogs = [getBlogs()[0]]
    expect(mostBlogs(blogs).author).toBe("Michael Chan")
  })

  test('returns 1 as the amount of blogs if the blog list contains only a single entry', () => {
    const blogs = [getBlogs()[0]]
    expect(mostBlogs(blogs).blogs).toBe(1)
  })

  test('returns the author with the most blogs written', () => {
    const blogs = getBlogs()
    expect(mostBlogs(blogs).author).toBe("Robert C. Martin")
  })

  test('returns the amount of blogs the author with the most blogs has written', () => {
    const blogs = getBlogs()
    expect(mostBlogs(blogs).blogs).toBe(3)
  })
})

describe('mostLikes', () => {

  test('returns undefined if the blog list is empty', () => {
    const blogs = []
    expect(mostLikes(blogs)).toBe(undefined)
  })

  test('returns the name of the author if the blog list contains only a single entry', () => {
    const blogs = [getBlogs()[0]]
    expect(mostLikes(blogs).author).toBe("Michael Chan")
  })

  test('returns the amount of likes if the blog list contains only a single entry', () => {
    const blogs = [getBlogs()[0]]
    expect(mostLikes(blogs).likes).toBe(7)
  })

  test('returns the author whose blogs have the most likes', () => {
    const blogs = getBlogs()
    expect(mostLikes(blogs).author).toBe("Edsger W. Dijkstra")
  })

  test('returns the amount of likes for the author whose blogs have the most likes', () => {
    const blogs = getBlogs()
    expect(mostLikes(blogs).likes).toBe(17)
  })
})

const getBlogs = () => [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]
