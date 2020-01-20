//import * as types from "../actions/actionTypes";
import initialState from './initialState';

export default function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    case 'CREATE_COURSE_SUCCESS':
      return [...state, { ...action.course }];
    case 'UPDATE_COURSE_SUCCESS':
      return state.map(course =>
        course.id === action.course.id ? action.course : course
        )  
    case 'LOAD_COURSES_SUCCESS':
      return action.courses; //error? if we enclose action.courses in curly braces of return.and what the solutions?
    case 'DELETE_COURSE_OPTIMISTIC':
      return state.filter(course => course.id != action.course.id) 
      /** Here we are not mutating the state as JS filter() returns new array.
          and that' why we have to mutate the array in case of 'CREATE_COURSE_SUCCESS'. */
      default:
      return state;
  }
}
