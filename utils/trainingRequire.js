module.exports.trainingRequire = (req, res, next) => {
  const { startDate, finishDate, books } = req.body
  let requireMessage = ''
  if (!startDate) {
    requireMessage += 'Start date is required. '
  }
  if (!finishDate) {
    requireMessage += 'Finish date is required. '
  }
  if (!books.length) {
    requireMessage += 'Books is required (at least one).'
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
