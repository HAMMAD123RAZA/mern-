import express from "express"
import mongoose from "mongoose"
import { createTodo, deleteTodo, getTodo, updateTodo } from "./controllers/crud.js"
import cors from 'cors'
import { Login, SignUp } from "./controllers/UserAuth.js"

const app=express()
app.use(express.json())
app.use(cors())
// app.use(express.static())

mongoose.connect('mongodb://localhost:27017',{
    dbName:'TodoCrud'
}).then(()=>{
    console.log('database connected')
}).catch(()=>{
    console.log('error in db connection')
})

app.post('/create', createTodo);
app.get('/get', getTodo);
app.put('/update/:id', updateTodo);    
app.delete('/delete/:id', deleteTodo);
app.post('/signup',SignUp)
app.post('/login',Login)


app.listen(8080,()=>{
console.log('server started')
})