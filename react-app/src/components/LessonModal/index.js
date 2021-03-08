import Modal from "react-modal";
import { useState } from 'react';
import './LessonModal.css'

export default function LessonModal({scheduled, lesson}) {
  const customStyles = {
    content : {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: "1.5em",
      backgroundColor: "rgba(255, 255, 255, 0.8);",
      borderRadius: "5px",
      border: "none",
      width: "25%",
      boxSizing: "border-box",
    },
    overlay : {
        backgroundColor: "rgba(0, 0, 0, .6)",
        zIndex: "100",
    }
  };

  const [showModal, setShowModal] = useState(false);
  // const [showScheduleConfirm, setShowScheduleConfirm] = useState(false);
  // const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const modalView = () => {
    setShowModal(true)
  }

  const onRequestClose = () => {
    setShowModal(false);
  }




  return (
    <>
    {scheduled && <button className="btn__tertiary modal__btn" onClick={() => modalView()}>Cancel Lesson</button>}
    {!scheduled && <button className="btn__tertiary modal__btn" onClick={() => modalView()}>Schedule Lesson</button>}
    <Modal style={customStyles} isOpen={showModal} ariaHideApp={true} onRequestClose={onRequestClose}>
      {
        !scheduled ?
          <div className="modal__popup-container">
              <p className="modal__message">Confirm schedule lesson?</p>
              <button className="btn__x" onClick={onRequestClose}>
                  <i className="fas fa-times"></i>
              </button>
              <button>Confirm</button>
          </div>
        :
          <div className="modal__popup-container">
              <p className="modal__message">Confirm delete lesson?</p>
              <button className="btn__x" onClick={onRequestClose}>
                  <i className="fas fa-times"></i>
              </button>
              <button>Delete</button>
          </div>
    }
    </Modal>
    </>
  )
}
