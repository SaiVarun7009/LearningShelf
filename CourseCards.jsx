import React from 'react';
import { useNavigate } from 'react-router-dom'
import './CourseCard.css'
import CourseImage from './CourseImage.png'

const CourseCard = ({ course }) => {
  const navigate = useNavigate()
  return (
    <>
      <div className="courseCard" key={course.id}>
        <div className="courseImage" style={{marginBottom:'20px'}}>
          <img src={CourseImage}/>
          <div class="courseImageHover">
            <div class="courseCardDescription">
              <h4>{course.CourseDescription}</h4>
            </div>
          </div>
        </div>
        <div className="courseCardInfo" style={{margin:'15px', color:'black'}}>
          <h4 style={{ color:'black'}}>{course.CourseName}</h4>
          <p style={{color: 'black', fontSize:'13px', height:'70px'}}>{course.CourseDescription}</p>
          <div >
            <button className="courseCardBtnCSS" onClick={() => navigate(`/courses/${course.CourseId}`)}>
              {course.CourseName}
            </button>
          </div>
        </div>
      </div>
    </>
    // <div key={course.id} className="singleCourse">
    //   <div className="imageDiv">
    //     <img src={course.image} alt={course.courseName} />
    //   </div>
    //   <div className="courseInfo">
    //     <p style={{ height: '3rem', font: 'Clinton' }}>{course.instructor}</p>
    //     <h4 style={{ height: '4rem', font: 'Clinton', marginBottom: '15px' }}>
    //       {course.title}
    //     </h4>
    //     {/* <div className="duration" style={{ marginBottom: '15px' }}>
    //       {course.lecturesTotalTime}
    //     </div> */}
    //     <div className="price" style={{ marginBottom: '15px' }}>
    //       <h3>Free</h3>
    //     </div>
    //     <div>
    //       <button
    //         className="butn"
    //         onClick={() => navigate(`/course/${course._id}`)}
    //       >
    //         {course.id} Start Learning
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default CourseCard;
