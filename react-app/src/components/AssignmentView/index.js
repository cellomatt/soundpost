import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as assignmentActions from '../../store/assignment'
import AssignmentContainer from '../AssignmentContainer'
import "./AssignmentView.css"

export default function AssignmentView() {
  const dispatch = useDispatch();
  document.title = "Soundpost — Practice Assignments"
  const user = useSelector(state => state.session.user)
  const assignments = useSelector(state => state.assignments.all)

  useEffect(() => {
    dispatch(assignmentActions.getAllAssignments(user.id))
  }, [dispatch, user])

  return (
    <div className="main">
      <h1 className="title__main">Practice Assignments</h1>
      <div className="assignments__list">
        {assignments !== null &&
        <>
          {Object.values(assignments).map(assignment =>
          <div key={assignment.id}>
            <AssignmentContainer assignment={assignment} />
          </div>
          )}
        </>
        }
      </div>
    </div>
  )
}
