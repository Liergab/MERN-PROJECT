import express from "express";
import {createNotes,getNotes,getNotebyId,updateNoteById, deletenote} from "../controllers/notesController"
const router = express.Router();

router.get('/', getNotes)

router.get('/:noteId', getNotebyId)

router.put('/:noteId',updateNoteById)

router.post("/", createNotes);

router.delete('/:noteId',deletenote)




export default router