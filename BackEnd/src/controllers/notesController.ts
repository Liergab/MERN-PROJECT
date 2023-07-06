import { RequestHandler } from "express";
import Notemodel from "../models/note"
import createHttpError from "http-errors";
import mongoose from "mongoose";

type Note = {
    noteId:string;
    title:string;
    text:string;
}

export const getNotes:RequestHandler = async(req,res,next) => {
    
    try {
        
        const noteData = await Notemodel.find().exec();
        res.status(200).json(noteData)
    } catch (error) {
        next(error)
    }
};

// Data type
type getById = Pick<Note,'noteId'>

export const getNotebyId:RequestHandler<getById,unknown,unknown,unknown> = async(req,res,next) => {
   const noteId = (req.params.noteId).trim()
  
    try {

       if(!mongoose.isValidObjectId(noteId)){
        throw createHttpError(404,'Invalid Note Id')
       }
        const indNote = await Notemodel.findById(noteId).exec();
        
        if(!indNote){
            throw createHttpError(404,'Note not Found')
        }
        res.status(200).json({message:"successful", Data:indNote })
    } catch (error) {
        next(error)
    }
};

interface CreateNoteBody {
    title?: string,
    text?: string,
}

export const createNotes: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;
  

    try {
       

        if (!title) {
            throw createHttpError(400, "Note must have a title");
        }

        const newNote = await Notemodel.create({
          
            title: title,
            text: text,
        });

        res.status(201).json(newNote);
    } catch (error) {
        next(error);
    }
};


// Data type
// type CreateNoteBody = Omit<Note,'noteId'>

// export const createNotes:RequestHandler = async(req,res,next) => {
//     const{title, text} = req.body
//     try {
//         if(!title || !text){
//            throw createHttpError(400,"All fields id required")
//         }
//         const data = await Notemodel.create({title:title, text:text})
//         res.status(201).json({Data:data})
//     } catch (error) {
//        next(error)
//     }
// };

// Data type
type updateTypeId = Pick<Note,'noteId'>
type updateTypeBody = Omit<Note,'noteId'>

export const updateNoteById:RequestHandler<updateTypeId,unknown, updateTypeBody, unknown> = async(req,res,next) => {
    const noteId = (req.params.noteId).trim()
   const{title,text} = req.body
    try {
            if(!mongoose.isValidObjectId(noteId)){
                throw createHttpError(404,'Invalid Note Id')
            }
            if(!title || !text){
                throw createHttpError(400,'All Fields are required')
            }

        const updateNote = await Notemodel.findByIdAndUpdate(noteId,
            {$set:{
                title:title,
                text:text
            }});

            if(!updateNote){
                throw createHttpError(404,'Note not Found')
            }

             res.status(201).json({message:"successfully Updated", Data:updateNote})
    } catch (error) {
        next(error)
    }
};

// Data type
type deleteTypeId = Pick<Note,'noteId'>

export const  deletenote:RequestHandler<deleteTypeId,unknown,unknown,unknown> = async(req, res,next) =>{
    const noteId = (req.params.noteId).trim()
    try {
        if(!mongoose.isValidObjectId(noteId)){
            throw createHttpError(404,'Invalid Note Id')
        }
        const deleteNote = await Notemodel.findByIdAndDelete(noteId)
        
        if(!deleteNote){
            throw createHttpError(404,'Note not Found')
        }
        res.status(204).json({message:"successfully Deleted", data:deleteNote})
    } catch (error) {
        next(error)
    }
}

