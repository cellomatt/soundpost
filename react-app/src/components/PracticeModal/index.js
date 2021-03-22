import Modal from "react-modal";
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import * as practiceActions from '../../store/practice'
import * as statsActions from '../../store/stats'
import './PracticeModal.css'

export default function PracticeModal({practice, setPractice, date, setChange, student}) {
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

  const deletePractice = async () => {
    await dispatch(practiceActions.deleteOneLog(student.id, date))
    await dispatch(statsActions.getAllStats(student.id))
    setPractice(false);
    setShowModal(false);
    setChange(change => !change)
  }

  const createPractice = async () => {
    await dispatch(practiceActions.practiced(student.id, date))
    await dispatch(statsActions.getAllStats(student.id))
    setPractice(true);
    setShowModal(false);
    setChange(change => !change)
  }

  return (
    <>
    {practice && <button className="btn__tertiary modal__btn" onClick={() => modalView()}>Edit</button>}
    {!practice && <button className="btn__tertiary modal__btn" onClick={() => modalView()}>Edit</button>}
    <Modal style={customStyles} isOpen={showModal} ariaHideApp={false} onRequestClose={onRequestClose}>
      {
        !practice ?
          <div className="modal__popup-container">
              <button className="btn__x" onClick={onRequestClose}>
                  <i className="fas fa-times"></i>
              </button>
              <p className="modal__message">Did you practice on {date}?</p>
              <button className="btn__tertiary modal__btn" onClick={createPractice}>Confirm</button>
          </div>
        :
          <div className="modal__popup-container">
              <button className="btn__x" onClick={onRequestClose}>
                  <i className="fas fa-times"></i>
              </button>
              <p className="modal__message">Delete practice log for {date}?</p>
              <button className="btn__tertiary modal__btn" onClick={deletePractice}>Confirm</button>
          </div>
    }
    </Modal>
    </>
  )
}
