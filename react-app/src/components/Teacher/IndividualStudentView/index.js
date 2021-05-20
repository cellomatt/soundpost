import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as studentActions from '../../../store/student'
import * as statsActions from '../../../store/stats'
import * as assignmentActions from '../../../store/assignment'
import AssignmentContainer from '../../AssignmentContainer'
import './IndividualStudentView.css'

export default function IndividualStudentView(){
  const history = useHistory();
  const { studentId } = useParams();
  const dispatch = useDispatch();
  const student = useSelector(state => state.students.currentStudent);
  const stats = useSelector(state => state.stats)
  const assignments = useSelector(state => state.assignments.all)
  const orderedList = Object.values(stats.days.list).sort((a, b) => b.date - a.date)
  const options = { dateStyle: 'long'};

  useEffect(() => {window.scrollTo(0, 0);}, [])
  useEffect(() => dispatch(statsActions.getAllStats(studentId)), [dispatch, studentId])
  useEffect(() => {
    const getStudentInfo = async () => {
      try {
        await dispatch(studentActions.getOneStudent(studentId));
      }
      catch {
        history.push("/students")
      }
    };
    getStudentInfo();
    return () => {
      dispatch(studentActions.cleanupStudent())
    }
  }, [dispatch, studentId, history])
  useEffect(() => {
    dispatch(assignmentActions.getAllAssignments(studentId))
  }, [dispatch, studentId])

  return (
    <div className="main">
      <div className="dashboard_main">
        <div className="student-info__box">
          {student &&
          <>
            <h1 className="title__main">{student.first_name} {student.last_name}</h1>
            <div className="user-content">
              <div className="user-info">
                <div className="student-info__container">
                  <div className="user-info__pic">
                    {student.photo_url && <img className="user-info__pic--img" src={student.photo_url} alt="profile main"/>}
                    {!student.photo_url && <img className="user-info__pic--img" src={`https://soundpost-app.s3.us-east-2.amazonaws.com/profile_icon.png`} alt="profile main"/>}
                  </div>
                  <div className="student-info__contact">
                    <h3 className="student-info__contact-item">tel: <a href="tel:+6143019973">{student.phone}</a></h3>
                    <h3 className="student-info__contact-item">email: <a href={`mailto:${student.email_address}`}>{student.email_address}</a></h3>
                    {student.parent_name && <h3 className="student-info__contact-item">parent name: <span>{student.parent_name.toLowerCase()}</span></h3>}
                  </div>
                </div>
              </div>
              <div className="student-data">
                <div className="student-data__assignments">
                  <h1 className="title student-data__title">Practice Assignments</h1>
                  <div className="assignments__list">
                    {assignments === null &&
                          <p className="">You don't have any assignments yet.</p>
                          }
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
              </div>
            </div>
          </>
          }
        </div>
      </div>
    </div>
  )
}
