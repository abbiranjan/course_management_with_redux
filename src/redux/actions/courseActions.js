import * as types from "./actionTypes";
import * as courseApi from '../../api/courseApi';
import {beginApiCall, apiCallError} from './apiStatusActions';

// export function createCourse(course) {
//   return { type: types.CREATE_COURSE, course };
// } 
// replaced by saveCourses thunk below

/** Just notice here that if call is synchronous(no need of thunk), action returns object
 * but if call is asynchronous(need of thunk) then action returns function with dispatch as parameter 
*/

// export function loadCoursesSuccess(courses){
//   return{
//     type: 'LOAD_COURSES_SUCCESS',
//     courses
//   }
// }

export function loadCourses() {
  return function(dispatch){
    dispatch(beginApiCall())
    return courseApi.getCourses()
    .then(courses => {
      // dispatch(loadCoursesSuccess(courses))
      dispatch(
        {
          type: 'LOAD_COURSES_SUCCESS',
          courses
        }
      )
    })
    .catch((error)=> {
      dispatch(apiCallError(error))
      throw error;
    })
  }
}

export function updateCourseSuccess(course){
  return{
    type: 'UPDATE_COURSE_SUCCESS',
    course
  }
}
export function createCourseSuccess(course){
  return{
    type: 'CREATE_COURSE_SUCCESS',
    course
  }
}
export function saveCourse(course){
  return function(dispatch, getState){
    dispatch(beginApiCall())
    return courseApi.saveCourse(course)
    .then((savedCourse)=>{
      course.id 
      ? dispatch(updateCourseSuccess(savedCourse))
      : dispatch(createCourseSuccess(savedCourse))
    })
    .catch(error => {
      dispatch(apiCallError(error));
      throw error;
    })
  }
}

export function deleteCourseOptimistic(course){
  return{
    type: 'DELETE_COURSE_OPTIMISTIC',
    course
  }
}

export function deleteCourse(course){
  return function(dispatch) {
    dispatch(deleteCourseOptimistic(course));
    return courseApi.deleteCourse(course.id);
  }
}
