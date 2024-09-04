import express  from 'express'
import { Todo } from '../model/TodoModel.js';


export const createTodo=async(req,res)=>{
    try {
        const {todo}=req.body;
        const data=await Todo.create({todo})
        res.status(201).json({message:'todo created',data})
    } catch (error) {
        console.log('error occured in creation',error)
    }
}

export const getTodo=async(req,res)=>{
    try {
        const data=await Todo.find()
        res.status(201).json(data)
    } catch (error) {
        console.log('error occured in gettting',error)
    }
}


export const updateTodo=async(req,res)=>{
    const { id } = req.params;
    try {
    const data=await Todo.findByIdAndUpdate(id,req.body,{new:true})
    res.status(201).json(data)
} catch (error) {
    console.log('error occured in updation',error)

}
}


export const deleteTodo=async(req,res)=>{
    const { id } = req.params;
    try {
        const data=await Todo.findByIdAndDelete(id)
        res.status(201).json({message:'item deleted'})
    } catch (error) {
        console.log('error occured in deletion',error)

    }
    }
    