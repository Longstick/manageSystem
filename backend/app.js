const express = require('express')
const cors = require('cors')
// const test = require('./model/test')
const router = require('./router')
const app = express()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded());

const PORT = process.env.PORT || 3000

app.use('/api',router)

// app.get('/',async(req,res) => {
//   const test_ids=await test.findAll({
//     attributes: ['test_id']
//   })
//   console.log(test_ids);
//   res.json(test_ids)
// })

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
})