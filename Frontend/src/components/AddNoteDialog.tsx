import { Button, Form, Modal, ModalTitle } from 'react-bootstrap'
import Notes from '../models/note'
import { useForm } from 'react-hook-form'
import { NoteInput } from '../network/notes_api'
import * as NotesApi from '../network/notes_api'
interface AddNoteDialogProps{
    onDismiss: () => void,
    onNoteSave: (note:Notes) =>  void
}

const AddNoteDialog = ({onDismiss,onNoteSave}: AddNoteDialogProps) => {
    const{register, handleSubmit,watch, formState: {errors, isSubmitting}} = useForm<NoteInput>();
    
    async function onSubmit(input:NoteInput) {
        try {
            const noteResponse = await NotesApi.createNote(input);
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
            Add Note
        </ModalTitle>
    </Modal.Header>

    <Modal.Body>
        <Form id="addNoteForm" onSubmit={handleSubmit(onSubmit)}>
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
        form="addNoteForm"
        disabled={isSubmitting}
        >
            Save
        </Button>
    </Modal.Footer>
   </Modal>
  )
}

export default AddNoteDialog
