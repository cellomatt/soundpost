import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as assignmentActions from '../../store/assignment'
import AssignmentContainer from '../AssignmentContainer'
import "./AssignmentView.css"

export default function AssignmentView() {
  document.title = "Soundpost — Practice Assignments"
  const user = useSelector(state => state.session.user)



  return (
    <div className="main">
      <h1 className="title__assignment">Practice Assignments</h1>
      <div className="assignments__list">
        {/* {Object.values(availability).map(lesson =>
          <LessonContainer lesson={lesson} key={lesson.id} duration={duration} setChange={setChange}/>
        )} */}
      </div>
    </div>
  )
}
