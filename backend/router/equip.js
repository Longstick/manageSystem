const express=require('express')
const equip=require('../model/equip')
const auth = require('../middleware/auth')

const router=express.Router()

router.get('/getEquip',auth,async(req,res) => {
     let r
    if(req.query.id) {
      r = await equip.findAll({
        attributes: { exclude: ['ID'] },
        where:{
          id:req.query.id
        }
      }) 
    }
    else {
        r = await equip.findAll({
        attributes: { exclude: ['ID'] },
      })
    }
    if(r.length !== 0)
    return res.status(200).json({data:r,msg:'请求成功!'})
     else return res.status(404).json({msg:'没有这条记录'})
})

router.post('/addEquip',auth,async(req,res) => {
    console.log(req.body);
    const r=await equip.create(req.body)
    if(!r)
    return res.status(400).json({msg:'添加设备失败！'})
    res.status(200).json({msg:'添加设备成功！',data:r})
})

router.post('/addEquip',auth,async(req,res) => {
  console.log(req.body);
  const r=await equip.create(req.body)
  if(!r)
  return res.status(400).json({msg:'添加设备失败！'})
  res.status(200).json({msg:'添加设备成功！',data:r})
})

router.post('/changeEquip',auth,async(req,res) => {
    console.log(req.body);
    let id = req.body.id
    delete req.body.id
    const r=await equip.update(req.body,{
      where:{
        id
      }
    })
    if(!r)
    return res.status(400).json({msg:'修改设备失败！'})
    res.status(200).json({msg:'修改设备成功！'})
})

router.delete('/deleteEquip/:id',auth,async(req,res) => {
 try {
  const r = await equip.destroy({
    where: {
      id:req.params.id
    }
  })
 } catch (error) {
   return res.status(404).json({msg:'删除失败'})
 }
  res.status(204).json({msg:'删除成功'}) 
  
})



module.exports = router