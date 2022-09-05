const express=require('express')
const book=require('../model/book')
const rentBook=require('../model/rentBook')
const auth = require('../middleware/auth')

const router=express.Router()

router.get('/getBooks',auth,async(req,res) => {
  let r
  if(req.query.id) {
    r = await book.findAll({
      attributes: { exclude: ['ID'] },
      where:{
        book_ID:req.query.id
      }
    }) 
  }
  else {
      r = await book.findAll({
      attributes: { exclude: ['ID'] },
    })
  }
  if(r.length !== 0)
  return res.status(200).json({data:r,msg:'请求成功!'})
   else return res.status(404).json({msg:'没有这条记录'})
   
})

router.post('/changeBook',auth,async(req,res) => {
  let book_ID = req.body.book_ID
  delete req.body.book_ID
  const r=await book.update(req.body,{
    where:{
      book_ID
    }
  })
  if(!r)
  return res.status(400).json({msg:'修改失败！'})
  res.status(200).json({msg:'修改成功！'})
})

router.post('/addBook',auth,async(req,res) => {
  console.log(req.body);
  const r=await book.create(req.body)
  if(!r)
  return res.status(400).json({msg:'添加失败！'})
  res.status(200).json({msg:'添加成功！',data:r})
})

router.delete('/deleteBook/:id',auth,async(req,res) => {
  try {
   const r = await book.destroy({
     where: {
       book_ID:req.params.id
     }
   })
  } catch (error) {
    console.log(error);
    return res.status(404).json({msg:'删除失败'})
  }
   res.status(204).json({msg:'删除成功'}) 
   
 })

router.get('/getRent',auth,async(req,res) => {
  let r
  if(req.query.id) {
    r = await rentBook.findAll({
      attributes: { exclude: ['ID'] },
      where:{
        id:req.query.id
      }
    }) 
  }
  else {
      r = await rentBook.findAll({
      attributes: { exclude: ['ID'] },
    })
  }
  console.log(r);
  if(r.length !== 0)
  return res.status(200).json({data:r,msg:'请求成功!'})
   else return res.status(404).json({msg:'没有这条记录'})
   
})

router.post('/addRent',auth,async(req,res) => {
  console.log(req.body);
  const r = await book.findAll({
    where: {
      book_ID:req.body.book_ID
    }
  })
  if(!r.length)
  return res.status(404).json({msg: '没有这本书噢'})
  
  rentBook.create(req.body)
        .then(async(r) => {
          book.update({book_status:r.book_status},{
            where: {
              book_ID: r.book_ID
            }
          }).then(r1 => {
            res.status(200).json({msg:'添加成功！'})
          }).catch(err => {
            res.status(400).json({data:err})
          })
        }).catch(err => {
          res.status(400).json({data:err})
        })
})

router.delete('/deleteRent/:id',auth,async(req,res) => {
  try {
    const r = await rentBook.destroy({
      where: {
        id:req.params.id
      }
    })
   } catch (error) {
     return res.status(404).json({msg:'删除失败'})
   }
    res.status(204).json({msg:'删除成功'}) 
})

//只能修改书名，书籍id
// router.post('/changeRent',auth,async(req,res) => {
//   console.log(req.body);
//     let id = req.body.id
//     delete req.body.id
//     const r=await rentBook.update(req.body,{
//       where:{
//         id
//       }
//     })
//     if(!r)
//     return res.status(400).json({msg:'修改失败！'})
//     res.status(200).json({msg:'修改成功！'})
// })

module.exports = router