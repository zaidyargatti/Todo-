import  Todo  from "../model/todo.model.js";
import mongoose from "mongoose";

const AddTodo = async (req, res) => {
    try {
        const { text } = req.body;
        if(!text){
             return res
             .status(400)
             .json({
                 message: 'Text is required' 
                });
        }
        const newtodo = await Todo.create({
            text,
        })
      
        //const todo = await newtodo.save()
        res.status(200)
        .json({
                message: "Todo added ",
                todo: newtodo
            })
    } catch (error) {
        res
            .status(500)
            .json({
                message: "Failed to add Todo", error
            })
    }
}

const FetchTodo = async (req, res) => {
    try {
        const todos = await Todo.find()
        res
            .status(200)
            .json({
                message: "All todos fetched successfully",
                todos
            })
    } catch (error) {
        res
            .status(500)
            .json({
                messagae: "Failed fetched todos ", error
            })
    }
}

const UpdateTodo = async (req, res) => {
    try {
        const { id } = req.params; // Extract ID dynamically from route parameters
        const { text } = req.body;

        // Check if the 'text' field is provided
        if (!text) {
            return res.status(400).json({
                message: "Text is required to update a todo",
            });
        }

        // Use findByIdAndUpdate with the dynamic ID
        const updatedTodo = await Todo.findByIdAndUpdate(
            id, // ID fetched dynamically
            { $set: { text } }, // Update the 'text' field
            { new: true } // Return the updated document
        );

        // Handle case when the todo is not found
        if (!updatedTodo) {
            return res.status(404).json({
                message: "Todo not found",
            });
        }

        // Respond with success
        res.status(200).json({
            message: "Todo Updated Successfully",
            updatedTodo, // Return the updated todo
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update todo",
            error,
        });
    }
};


const DeleteTodo = async (req, res) => {
    try {
        const {id }= req.params
        const DeletedTodo = await Todo.findByIdAndDelete(id)
        if(!DeleteTodo){
            return res.status(404).json({
                message:"Not Found"
            })
        }
        res
            .status(200)
            .json({
                message: "Todo Deleted Successfully",
                DeleteTodo
            })
    }
    catch (error) {
        res.status(500)
            .json({
                message: "Falied to delete todo!", error
            })
    }
}


export {
    AddTodo,
    FetchTodo,
    UpdateTodo,
    DeleteTodo
}