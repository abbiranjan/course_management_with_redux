import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from '../../redux/actions/authorActions';
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from './CourseList';
import {Redirect} from 'react-router-dom';
import Spinner from '../common/Spinner';
import { toast } from "react-toastify";

class CoursesPage extends React.Component {

  /** We are commenting these lines because we need to handle these logic in seprate files, to make it
   * more of Presentational component
   */
  // state = {
  //   course: {
  //     title: ""
  //   }
  // };

  // handleChange = event => {
  //   const course = { ...this.state.course, title: event.target.value };
  //   this.setState({ course });
  // };

  // handleSubmit = event => {
  //   event.preventDefault();
  //   this.props.actions.createCourse(this.state.course);
  // };
  state = {
    redirectToAddCoursePage: false
  }
  componentDidMount(){
    this.props.actions.loadCourses()
    .catch(error =>{
      alert('Loading course failed '+ error) //normal string concatenation
    })

    this.props.actions.loadAuthors()
    .catch(error =>{
      // alert(`Loading author failed ${error}`); // using template literal
    })
  }

  // Using "PROMISE" to handle async call
 /**  handleDeleteCourse = course => {
    toast.success("Course Deleted...");
    this.props.actions.deleteCourse(course)
    .catch(error => {
      toast.error('Delete failed...  ' + error.message, {autoClose: false});
    })
  } */

  //Using "ASYNC-AWAIT" to handle async call
  handleDeleteCourse = async course => {
    toast.success("Course Deleted...");
    try{
     await this.props.actions.deleteCourse(course)
    }
    catch(error) {
      toast.error('Delete failed...  ' + error.message, {autoClose: false});
    }
  }

  render() {
    return (
      <>
     {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>
        {this.props.loading
        ? <Spinner/>
        :(
        <><button
          style={{marginBottom: 20}}
          className="btn btn-primary add-course"
          onClick={() => this.setState({redirectToAddCoursePage: true})}
        >
         Add Course
        </button>
        <CourseList 
          courses = {this.props.courses}
          onDeleteClick = {this.handleDeleteCourse} />
        </>
         )}
      </>
    );
  }
}
function mapStateToProps(state) {
  return {
    //Adding authorName to each course object 
    courses: 
    state.authors.length == 0 
    ? []
    :state.courses.map((course) =>{
      /** Adding "authorName" attr to each course obj by matching author id */
      return{
        ...course,
        authorName: state.authors.find((a)=> a.id === course.authorId).name
      }
    }),

    authors: state.authors,
    loading: state.apiCallsInProgress>0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
     loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
     loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
     deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch),
    }
  };
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage);
