module.exports.addTrainingPagesRequire = (req, res, next) => {
  const { date, pages } = req.body
  let requireMessage = ''
  if (!date) {
    requireMessage += 'Date is required. '
  }
  if (!pages) {
    requireMessage += 'Pages is required.'
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
