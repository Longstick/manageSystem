//账号管理
const express=require('express')
const manage=require('../model/manage')
const jwt=require('jsonwebtoken')
const crypto=require('crypto')

const router=express.Router()

router.post('/register',async(req,res) => {
  const {account,password}=req.body
  if(!account)
  return res.status(422).json({msg:'账号不能为空！'})
  if(!password)
  return res.status(422).json({msg:'密码不能为空！'})
  // 查找数据库中是否已有该用户
  let r = await manage.findAll({
    attributes: ['ID','am_account','am_password','am_limit'],
    where: {
      am_account: account
    }
  })
  console.log(r);
  if(r.length!==0)
  return res.json({msg:'账户已存在'})
  let md5=crypto.createHash("md5")
  let pass=md5.update(password).digest("hex")
  const user=await manage.create({
    am_account:account,
    am_password:pass,
    am_limit:'manager'
  })
  if(user)
  return res.status(200).json({msg:'用户注册成功',data:{id:user.id,account:user.am_account,limit:user.am_limit}})
  return res.status(500).json({msg:'创建用户失败'})
})

router.post('/login', async(req,res) => {
   console.log(req.body);
   const {account,password}=req.body
   if(!account)
   return res.status(422).json({msg:'账号不能为空！'})
   if(!password)
   return res.status(422).json({msg:'密码不能为空！'})
   let md5=crypto.createHash("md5")
  let pass=md5.update(password).digest("hex")
  const r = await manage.findOne({
    where: {
      am_account: account,
      am_password: pass
    }
  })
  console.log(r);
  if(r) {
    let token = jwt.sign({id:r.id},'Adhere',{expiresIn: 60 * 60 * 24})
    console.log('token:',token);

    token='Bearer '+token
    let data = {
      id: r.id,
      account: r.am_account,
      limit:r.am_limit 
    }
    return res.status(200).json({data,token,msg:'登录成功！'})
  }
  const ret = await manage.findOne({
    where: {
      am_account: account,
    }
  })
  if(ret) return res.status(400).json({msg:'密码错误！'})
  else return res.status(404).json({msg:'账号不存在!'})
  

})

module.exports = router;