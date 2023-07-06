import { Card } from 'react-bootstrap';
import {Notes as NoteModel} from '../models/note'
import styles from '../styles/Note.module.css'
import { formatDate } from '../utils/formatData';

interface NoteProps {
    note:NoteModel;
    className?:string;
}

const Note = ({ note, className }:NoteProps) => {
  const {
    title,
    text,
    _id,
    createdAt,
    updatedAt
  } = note


  let createdUpdatedText: string;
  if (updatedAt > createdAt) {
      createdUpdatedText = "Updated: " + formatDate(updatedAt);
  } else {
      createdUpdatedText = "Created: " + formatDate(createdAt);
  }
  
  return (
 
      <Card  style={{ background: '#fef6e4', height: '200px'  }} className={`${styles.noteCard} ${className} `}>
        <Card.Body className={styles.cardBody}>
            <Card.Title >
            <small>Title</small>: {title} <br/>
                
            </Card.Title>
            <Card.Text className={styles.cardText}>
                {text}
            </Card.Text>
        </Card.Body>
        <Card.Footer >
          {createdUpdatedText}
        </Card.Footer>
      </Card>
    
  )
}

export default Note
