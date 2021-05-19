import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as studentActions from '../../../store/student'
import * as statsActions from '../../../store/stats'
import './IndividualStudentView.css'

export default function IndividualStudentView(){
  const history = useHistory();
  const { studentId } = useParams();
  const dispatch = useDispatch();
  const student = useSelector(state => state.students.currentStudent);
  const stats = useSelector(state => state.stats)
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

  return (
    <div className="main">
      <div className="dashboard_main">
        <div className="student-info__box">
          
        </div>
      </div>
    </div>
  )
}
