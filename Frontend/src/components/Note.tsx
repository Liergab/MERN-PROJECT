import { Card } from 'react-bootstrap';
import {Notes as NoteModel} from '../models/note'
import styles from '../styles/Note.module.css'
import { formatDate } from '../utils/formatData';
import{MdDelete} from 'react-icons/md'
import stylesUtils from '../styles/utils.module.css'

interface NoteProps {
    note:NoteModel;
    className?:string;
    onDeleteNoteCLicked: (note:NoteModel) => void
}

const Note = ({ note, onDeleteNoteCLicked, className }:NoteProps) => {
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
            <Card.Title className={stylesUtils.flexCenter} >
             {title} 
             <MdDelete style={{marginRight:"30px"}} className="text-muted ms-auto"
             onClick={(e) => {
              onDeleteNoteCLicked(note);
              e.stopPropagation();

             }}
             />
            </Card.Title>
            
            <Card.Text className={styles.cardText}>
                {text}
            </Card.Text>
        </Card.Body>
        <Card.Footer className='text-muted' >
          {createdUpdatedText}
        </Card.Footer>
      </Card>
    
  )
}

export default Note
