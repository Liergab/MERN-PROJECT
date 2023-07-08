import { Button, Form, Modal, ModalTitle } from 'react-bootstrap'
import Notes from '../models/note'
import { useForm } from 'react-hook-form'
import { NoteInput } from '../network/notes_api'
import * as NotesApi from '../network/notes_api'

interface AddEditNoteDialogProps{
    noteToEdit?:Notes;
    onDismiss: () => void,
    onNoteSave: (note:Notes) =>  void
}

const AddEditNoteDialog = ({onDismiss,onNoteSave,noteToEdit}: AddEditNoteDialogProps) => {
    const{register, handleSubmit,watch, formState: {errors, isSubmitting}} = useForm<NoteInput>({
        defaultValues:{
            title:noteToEdit?.title || "",
            text:noteToEdit?.text || ""
        }
    });
    
    const onSubmit = async(input:NoteInput) => {
        try {
            let noteResponse:Notes;
            if(noteToEdit){
                noteResponse = await NotesApi.updateNote(noteToEdit._id, input)
            }else{
                noteResponse = await NotesApi.createNote(input);
            }
            
            onNoteSave(noteResponse);
        } catch (error) {
            console.error(error);
            alert(error)
        }
    }
    console.log(watch("title"))
    console.log(watch("text"))
  return (
   <Modal show onHide={() => onDismiss ()}>
    <Modal.Header closeButton>
        <ModalTitle>
            {noteToEdit ? "Edit note" : "Addnote"}
        </ModalTitle>
    </Modal.Header>

    <Modal.Body>
        <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className='mb-3'>
                <Form.Label>Title</Form.Label>
                <Form.Control 
                type='text'
                placeholder='Title'
                isInvalid={!!errors.title}
                {...register('title',{required:"Required"})}
                />
                <Form.Control.Feedback type='invalid'>
                    {errors.title?.message}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>Text</Form.Label>
                <Form.Control
                as="textarea"
                rows={5}
                placeholder='text'
                isInvalid={!!errors.text}
                {...register('text',{required:"Required"})}
                />
                <Form.Control.Feedback type='invalid'>
                    {errors.text?.message}
                </Form.Control.Feedback>
            </Form.Group>
        </Form>
    </Modal.Body>
    <Modal.Footer>
        <Button
        type="submit"
        form="addEditNoteForm"
        disabled={isSubmitting}
        >
            Save
        </Button>
    </Modal.Footer>
   </Modal>
  )
}

export default AddEditNoteDialog
