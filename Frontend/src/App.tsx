import { useEffect, useState } from 'react';
import { Notes as NoteModel} from './models/note';
import Note from './components/Note';
import { Button, Col, Container, Row } from 'react-bootstrap';
import styles from './styles/NotePage.module.css';
import stylesUtils from './styles/utils.module.css';
import * as NotesApi from './network/notes_api';
import AddNoteDialog from './components/AddEditNoteDialog';
import {FaPlus} from 'react-icons/fa'


function App() {
  const [notes, setNotes] = useState<NoteModel[]>([])

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false)
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

  
 
  useEffect(() => {
    
    async function loadnotes() {
      try {
        const notes = await NotesApi.fetchNote();
        setNotes(notes)
      }catch(error){
        console.error(error);
        alert(error);
      }
     
    }
    loadnotes();
  
  },[]);

  const deleteNote = async(note:NoteModel) => {
    try {
      await NotesApi.deleteNote(note._id)
      setNotes(notes.filter(existingNote => existingNote._id !==note._id))
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Container className='mt-3'>
      <Button style={{display:"flex", alignItems:"center", justifyContent:"center",gap:"4px"}}
      className={`mb-4 ${stylesUtils.blockCenter}`}
      onClick={() =>  setShowAddNoteDialog(true)}>

        <FaPlus/>
        <span >Add New Note</span>
      </Button>
      <Row xs={1} md={2} xl={3} className='g-4'>
        
      {notes.map((note) => {
      return(
        <Col key={note._id}>
         <Note 
         note={note}
          className={styles.note}
          onDeleteNoteCLicked={deleteNote} 
          onNoteClicked={setNoteToEdit}/>
         
        </Col>
      )
    })}
      </Row>

      {showAddNoteDialog && 
        <AddNoteDialog 
         onDismiss={() => setShowAddNoteDialog(false)}
         onNoteSave={(newNote) => {
          setNotes([...notes, newNote])
          setShowAddNoteDialog(false)
         }}
         />
      }
      {noteToEdit &&
                <AddNoteDialog
                    noteToEdit={noteToEdit}
                    onDismiss={() => setNoteToEdit(null)}
                    onNoteSave={(updatedNote) => {
                        setNotes(notes.map(existingNote => existingNote._id === updatedNote._id ? updatedNote : existingNote));
                        setNoteToEdit(null);
                        
                    }}
                />
            }
    </Container>
  )
}

export default App
