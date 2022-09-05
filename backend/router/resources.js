const express=require('express')
const resourceDistribute=require('../model/resourceDistribute')
const resourceManage=require('../model/resourceManage')
const auth = require('../middleware/auth')

const router=express.Router()

router.get('/getResource',auth,async(req,res) => {
  let r
  if(req.query.resourceID) {
    r = await resourceManage.findAll({
      where:{
        resourceID:req.query.resourceID
      }
    }) 
  }
  else {
      r = await resourceManage.findAll()
  }
  if(r.length !== 0)
  return res.status(200).json({data:r,msg:'请求成功!'})
   else return res.status(404).json({msg:'没有这条记录'})
})

router.post('/addResource',auth,async(req,res) => {
  const r=await resourceManage.create(req.body)
  if(!r)
  return res.status(400).json({msg:'添加失败！'})
  res.status(200).json({msg:'添加成功！',data: r})
})

router.post('/changeResource',auth,async(req,res) => {
  let resourceID = req.body.resourceID
  delete req.body.resourceID
  const r=await resourceManage.update(req.body,{
    where:{
      resourceID
    }
  })
  if(!r)
  return res.status(400).json({msg:'修改失败！'})
  res.status(200).json({msg:'修改成功！'})
})

router.delete('/deleteResource/:id',auth,async(req,res) => {
  try {
   const r = await resourceManage.destroy({
     where: {
      resourceID:req.params.id
     }
   })
  } catch (error) {
    console.log(error);
    return res.status(404).json({msg:'删除失败'})
  }
   res.status(204).json({msg:'删除成功'}) 
   
 })


 router.get('/getDistribute',auth,async(req,res) => {
  let r
  if(req.query.id) {
    r = await resourceDistribute.findAll({
      where:{
        id:req.query.id
      }
    }) 
  }
  else {
      r = await resourceDistribute.findAll()
  }
  if(r.length !== 0)
  return res.status(200).json({data:r,msg:'请求成功!'})
   else return res.status(404).json({msg:'没有这条记录'})
})


router.post('/addDistribute',auth,async(req,res) => {
  const r = await resourceManage.findAll({
    where: {
      resourceID:req.body.resourceID
    }
  })
  if(!r.length)
  return res.status(404).json({msg: '没有这个器材'})


  resourceDistribute.create(req.body)
  .then(async(r) => {
    try {
      const ret = await resourceManage.findAll({
        where: {
          resourceID: r.resourceID
        }
      })
      let r1 = JSON.parse(JSON.stringify(ret))[0]
      console.log(r1);
      if(r.rd_status===1)
      r1.count-=r.count
      else
      r1.count+=r.count
      await resourceManage.update({count: r1.count},{
        where: {
          resourceID:r1.resourceID
        }
      })
      res.status(200).json({msg:'添加成功！'})
    } catch (err) {
      res.status(400).json({data:err})
    }
  })
  .catch(err => {
    res.status(400).json({data:err})
  })
       
})

router.delete('/deleteDistribute/:id',auth,async(req,res) => {
  try {
    const r = await resourceDistribute.destroy({
      where: {
        id:req.params.id
      }
    })
   } catch (error) {
     return res.status(404).json({msg:'删除失败',data:error})
   }
    res.status(204).json({msg:'删除成功'}) 
})

router.post('/changeDistribute',auth,async(req,res) => {
  if(!req.body.id) {
    return res.status(422).json({msg:'id is required'})
  }
  let flag = false
  let oldCount
  if(req.body.count) {
    // console.log(1);
     flag=true
     const r = await resourceDistribute.findAll({
      where:{
        id:req.body.id
      }
    }) 
    let r1 = JSON.parse(JSON.stringify(r))[0]
    oldCount = r1.rd_status === 1 ? -r1.count:r1.count
  }
  
  let id = req.body.id
  delete req.body.id
  
  // 不修改count的情况
  if(!flag) {
    // console.log(2);
    try {
      await resourceDistribute.update(req.body,{
        where: {
          id
        }
      })
      return res.status(200).json({msg: '修改成功'})
    } catch (error) {
      return res.status(400).json({msg:'修改失败',data:error})
    } 
  }

  // 修改count的情况
  let newCount=req.body.rd_status === 1 ? -req.body.count : req.body.count
  let allCount=newCount-oldCount
  resourceDistribute.update(req.body,{
    where: {
      id
    }
  }).then(async(r) => {
   try {
    const ret = await resourceManage.findAll({
      where: {
        resourceID: req.body.resourceID
      }
    })
    let r2 = JSON.parse(JSON.stringify(ret))[0]
    r2.count+=allCount
    console.log(r2);
    const rm = await resourceManage.update({count:r2.count}, {
      where: {
        resourceID:r2.resourceID
      }
    })
    console.log(rm);
    res.status(200).json({msg:'添加成功！'})
   } catch (error) {
    res.status(400).json({msg:'修改失败',data:error})
   }
  }).catch(err => {
    res.status(400).json({msg:'修改失败',data:err})
  })
 
})

module.exports = router