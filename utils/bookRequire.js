const bookRequire = (req, res, next) => {
  const { title, pages } = req.body
  let requireMessage = ''
  if (!title) {
    requireMessage += 'Title of a book is required. '
  }
  if (!pages) {
    requireMessage += 'Amount of pages is required.'
  }
  requireMessage.trim()
  if (requireMessage) {
    return res.status(400).json({
      code: 400,
      message: requireMessage,
    })
  }
  next()
}

module.exports = bookRequire