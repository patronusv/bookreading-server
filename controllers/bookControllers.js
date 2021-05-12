 const {addBook, getBook, findOneBook, updateBook } = require('../models/services/bookServices')

 const add = async (req, res, next) => {
     const userId =  req.user._id
       try {
        const result = await addBook(userId, req.body);
        return res.status(201).json({status: 'success', code: 201, data: result})
    }catch(e) {
        next(e)
    }
 }

const get = async (req, res, next) => {
      try {
         const result = await getBook(req.user._id)
         return res.status(201).json({status: 'success', code: 201, data: result})
     } catch (e) {
         next(e)
     }
}
 
const update = async (req, res, next) => {
    try {
        const result = await findOneBook(req.params.id)
        if (!result) {
            return res.status(404).json({ status: "error", code: 404, message: "Not found" })
        }
        const newBook = await updateBook(result._id, req.body)
        if (newBook) {
            return res.status(201).json({ status: 'success', code: 201, data: newBook })
        }

    } catch (e) {
        next(e)
    }
}


 module.exports = {add, get, update}