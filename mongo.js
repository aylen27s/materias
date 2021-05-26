const mongoose = require('mongoose')
const pass = require('./pass.js')
const dbname = 'app'

const conexion = `mongodb+srv://aylen27s:${pass}@cluster0.0axqh.mongodb.net/${dbname}?retryWrites=true&w=majority`

mongoose.connect(conexion,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
  useFindAndModify:false,
  useCreateIndex:true
})
.then(()=>{
  console.log('Base de datos conectada')
}).catch( err =>{
  console.log(err)
})

module.exports = mongoose
