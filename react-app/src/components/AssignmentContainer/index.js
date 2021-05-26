import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import AssignmentModal from "../AssignmentModal"
import * as assignmentActions from '../../store/assignment'
import './AssignmentContainer.css'

export default function AssignmentContainer({assignment, role, setChange}) {
  const dispatch = useDispatch();
  const options = { dateStyle: 'long'};

  const [messageHeight, setMessageHeight] = useState("120px")
  const [edit, setEdit] = useState(false);
  const [editedAssignment, setEditedAssignment] = useState(assignment.message);

  useEffect(() => {
    const messageEl = document.querySelector(`#assignment-${assignment.id}`);
    let height = window.getComputedStyle(messageEl, null).height.replace("px", "")
    height = Number(height) + 40
    setMessageHeight(height.toString() + "px")
  }, [assignment.id])

  const editAssignment = async () => {
    setEdit((edit) => !edit)
  }

  const saveAssignment = async () => {
    await dispatch(assignmentActions.editAssignment(assignment.id, editedAssignment))
    setEdit((edit) => !edit)
    setChange((change) => !change)
  }


  return (
    <div className="message__container">
      <div className="message__date">
        <p>{assignment.created_at.toLocaleDateString('en-US', options)} • {assignment.teacher.first_name} {assignment.teacher.last_name}</p>
        {!role &&
          <div className="assignment-buttons">
            <button className="btn btn__secondary assignment-buttons__button" onClick={editAssignment}>
              {!edit && <i className="far fa-edit"></i>}
              {edit && <i className="fas fa-times"></i>}
            </button>
            {edit && <button className="btn btn__secondary assignment-buttons__button" onClick={saveAssignment}><i className="far fa-save"></i></button>}
            <AssignmentModal assignment={assignment} setChange={setChange}></AssignmentModal>
          </div>
        }
      </div>
      {!edit && <p id={`assignment-${assignment.id}`} className="message">{assignment.message}</p>}
      {edit &&
        <textarea
          id="edit-assignment"
          className="form__input"
          value={editedAssignment}
          style={{height: messageHeight}}
          onChange={(e) => setEditedAssignment(e.target.value)}>
        </textarea>
      }
    </div>
  )
}
