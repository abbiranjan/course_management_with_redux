import React from 'react';
import {Link} from 'react-router-dom';

const CourseList = ({courses, onDeleteClick}) => {
    console.log({courses})
    // const {courses} = props; //Same as above one.
    /**
     * {
        return(
            ...code
            )
        }

        * above code is same as below one, called "implicit return" and it is concise form of return

         (...code)
       */ 
    return(
        <table className="table">
        <thead>
            <tr>
                <th/>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th/>
            </tr>
        </thead>
        <tbody>
            {courses.map((course)=>{
                return(
                    <tr key={course.id}>
                        <td>
                            <a 
                            className="btn btn-dark"
                            href={"http://pluralsight.com/courses/"+course.slug}
                            >
                                Watch
                            </a>
                        </td>
                        <td>
                            <Link to={"/course/"+course.slug}> {course.title} </Link>
                        </td>
                        <td>{course.authorName}</td>
                        <td>{course.category}</td>
                        <td>
                            <button 
                              className="btn btn-outline-danger"
                              onClick={()=> onDeleteClick(course)}
                              >
                                Delete
                            </button>
                        </td>
                    </tr>
                )
            })}
        </tbody>
    </table>
    )
}

export default CourseList;
