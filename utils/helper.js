const dummy = blogs => (
  1
)

const totalLikes = blogs => {
  const sum = (total, value) => total + value

  return blogs
    .map(b => b.likes)
    .reduce(sum, 0)
}

const favouriteBlog = blogs => {
  const getLarger = (largestFound, next) =>
    largestFound.likes > next.likes ? largestFound : next

  if (blogs.length > 0) {
    return blogs.reduce(getLarger)
  }
}

const mostBlogs = blogs => {
  const authors = distinctAuthors(blogs)
  const authorsBlogs = getAuthorsBlogs(authors, blogs)

  const authorsBlogCounts = authorsBlogs.map(ab => (
    { "author": ab.author, "blogs": ab.blogs.length }
  ))

  if (authorsBlogCounts.length > 0) {
    return authorsBlogCounts
      .reduce((ab1, ab2) =>
        ab1.blogs.length > ab2.blogs.length ? ab1 : ab2
      )
  }
}

const mostLikes = blogs => {
  const authors = distinctAuthors(blogs)
  const authorsBlogs = getAuthorsBlogs(authors, blogs)

  const authorsBlogLikes = authorsBlogs.map(ab => (
    { "author": ab.author, "likes": totalLikes(ab.blogs) }
  ))

  if (authorsBlogLikes.length > 0) {
    return authorsBlogLikes
      .reduce((al1, al2) =>
        al1.likes > al2.likes ? al1 : al2
      )
  }
}

const distinctAuthors = blogs => (
  blogs
    .map(b => b.author)
    .reduce((authors, a) => (
      authors.includes(a) ?
        authors :
        authors.concat(a)
    ), [])
)

const getAuthorsBlogs = (authors, blogs) => (
  authors.map(author => {
    return {
      "author": author,
      "blogs": blogs.filter(b => b.author === author)
    }
  })
)

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}