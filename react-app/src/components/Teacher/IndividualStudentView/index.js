import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as studentActions from '../../../store/student'
import './IndividualStudentView.css'

export default function IndividualStudentView(){
  const history = useHistory();
  const { studentId } = useParams();
  const dispatch = useDispatch();
  const student = useSelector(state => state.students.currentStudent);

  // useEffect(() => {
  //   const getStudentInfo = async () => {
  //     try {
  //       await dispatch(studentActions.getOneStudent(studentId));
  //     }
  //     catch {
  //       history.push("/students")
  //     }
  //   };
  //   getStudentInfo();
  //   return () => {
  //     dispatch(studentActions.cleanupStudent())
  //   }
  // }, [dispatch, studentId, history])

  return (
    <div className="main">Test</div>
  )
}
