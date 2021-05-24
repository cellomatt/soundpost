import { useState } from "react";
import { useDispatch } from "react-redux";
import * as assignmentActions from '../../store/assignment'
import './AssignmentContainer.css'

export default function AssignmentContainer({assignment, role, change, setChange}) {
  const dispatch = useDispatch();
  const options = { dateStyle: 'long'};
  const [edit, setEdit] = useState(false);
  const [editedAssignment, setEditedAssignment] = useState(assignment.message);

  const editAssignment = async () => {
    setEdit((edit) => !edit)
  }

  const saveAssignment = async () => {
    setEdit((edit) => !edit)
  }

  const deleteAssignment = () => {
    dispatch(assignmentActions.deleteAssignment(assignment.id))
    setChange(change => !change)
  }

  return (
    <div className="message__container">
      <p className="message__date">{assignment.created_at.toLocaleDateString('en-US', options)} • {assignment.teacher.first_name} {assignment.teacher.last_name}</p>
      {!edit && <p className="message">{assignment.message}</p>}
      {edit &&
        <textarea
          id="new-assignment"
          className="form__input"
          value={editedAssignment}
          onChange={(e) => setEditedAssignment(e.target.value)}>
        </textarea>
      }
      {!role &&
        <div className="assignment-buttons">
          <button className="btn btn__secondary assignment-buttons__button" onClick={editAssignment}><i className="far fa-edit"></i></button>
          {edit && <button className="btn btn__secondary assignment-buttons__button" onClick={saveAssignment}><i className="far fa-save"></i></button>}
          <button className="btn btn__secondary assignment-buttons__button" onClick={deleteAssignment}><i className="far fa-trash-alt"></i></button>
        </div>
      }
    </div>
  )
}
