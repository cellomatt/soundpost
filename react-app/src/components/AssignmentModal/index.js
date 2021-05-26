import Modal from "react-modal";
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import * as assignmentActions from '../../store/assignment'
import './AssignmentModal.css'

export default function AssignmentModal({assignment, setChange}) {
  const dispatch = useDispatch();

  const customStyles = {
    content : {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: ".5em",
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      borderRadius: "5px",
      border: "none",
      boxSizing: "border-box",
    },
    overlay : {
        backgroundColor: "rgba(0, 0, 0, .6)",
        zIndex: "100",
    }
  };

  const [showModal, setShowModal] = useState(false);

  const modalView = () => {
    setShowModal(true)
  }

  const onRequestClose = () => {
    setShowModal(false);
  }

  const deleteAssignment = async () => {
    await dispatch(assignmentActions.deleteAssignment(assignment.id))
    setChange((change) => !change)
    setShowModal(false);
  }

  return (
    <>
    <button className="btn btn__secondary assignment-buttons__button" onClick={() => modalView()}><i className="far fa-trash-alt"></i></button>
    <Modal style={customStyles} isOpen={showModal} ariaHideApp={false} onRequestClose={onRequestClose}>
          <div className="modal__popup-container">
              <button className="btn__x" onClick={onRequestClose}>
                  <i className="fas fa-times"></i>
              </button>
              <p className="modal__message">Delete this assignment?</p>
              <button className="btn__primary modal__btn" onClick={deleteAssignment}>Confirm</button>
          </div>
    </Modal>
    </>
  )
}
