import Modal from "react-modal";
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import * as lessonActions from '../../store/lesson'
import './LessonModal.css'

export default function LessonModal({scheduled, setScheduled, lesson, setChange, duration, user}) {
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

  const deleteLesson = async () => {
    await dispatch(lessonActions.deleteOneLesson(lesson.id))
    setScheduled(false);
    setShowModal(false);
    setChange(change => !change)
  }

  const scheduleLesson = async () => {
    await dispatch(lessonActions.scheduleOneLesson(lesson.id, duration, user.id))
    setScheduled(true);
    setShowModal(false);
    dispatch(lessonActions.getUserLessons(user.id))
  }

  return (
    <>
    {scheduled && <button className="btn__primary modal__btn" onClick={() => modalView()}>Cancel Lesson</button>}
    {!scheduled && <button className="btn__primary modal__btn" onClick={() => modalView()}>Schedule Lesson</button>}
    <Modal style={customStyles} isOpen={showModal} ariaHideApp={false} onRequestClose={onRequestClose}>
      {
        !scheduled ?
          <div className="modal__popup-container">
              <button className="btn__x" onClick={onRequestClose}>
                  <i className="fas fa-times"></i>
              </button>
              <p className="modal__message">Confirm schedule lesson on {lesson.start_time.toLocaleDateString('en-US', {dateStyle: 'long'})} at {lesson.start_time.toLocaleTimeString('en-US', { timeStyle: "short" })}?</p>
              <button className="btn__primary modal__btn" onClick={scheduleLesson}>Confirm</button>
          </div>
        :
          <div className="modal__popup-container">
              <button className="btn__x" onClick={onRequestClose}>
                  <i className="fas fa-times"></i>
              </button>
              <p className="modal__message">Confirm cancel lesson on {lesson.start_time.toLocaleDateString('en-US', {dateStyle: 'long'})} at {lesson.start_time.toLocaleTimeString('en-US', { timeStyle: "short" })}?</p>
              <button className="btn__primary modal__btn" onClick={deleteLesson}>Confirm</button>
          </div>
    }
    </Modal>
    </>
  )
}
