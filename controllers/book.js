 const {addBook, getBook} = require('../models/services/book')

 const add = async (req, res, next) => {
    // const userId = req.user._id
    console.log(req.body)
       try {
        const result = await addBook(req.body);
        return res.json({status: 'success', code: 201, data: result})
    }catch(e) {
        next(e)
    }
 }

 const get = async(req, res, next) => {
     try {
         const result = await getBook()
         return res.json({status: 'success', code: 201, data: result})
     } catch (e) {
         next(e)
     }
 }

 module.exports = {add, get}