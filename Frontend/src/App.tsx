import { useEffect, useState } from 'react';
import { Notes as NoteModel} from './models/note';
import Note from './components/Note';
import { Button, Col, Container, Row } from 'react-bootstrap';
import styles from './styles/NotePage.module.css';
import * as NotesApi from './network/notes_api';
import AddNoteDialog from './components/AddNoteDialog';


function App() {
  const [notes, setNotes] = useState<NoteModel[]>([])

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false)
 
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


  return (
    <Container className='mt-3'>
      <Button onClick={() =>  setShowAddNoteDialog(true)}>
        Add New Note
      </Button>
      <Row xs={1} md={2} xl={3} className='g-4'>
        
      {notes.map((note) => {
      return(
        <Col key={note._id}>
         <Note note={note} className={styles.note} />
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
    </Container>
  )
}

export default App
