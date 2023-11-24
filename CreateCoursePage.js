import React, { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react"
import { AuthContext } from "../Context/AuthContext"
import { useNavigate, Link } from "react-router-dom";


const CreateCoursePage = () => {
  const { user } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    CourseName: '',
    CourseDescription: '',
  });
  const navigate = useNavigate();
  const [courseCreated, setCourseCreated] = useState(false);
  const [courseData, setCourseData] = useState(null);


  const {
    CourseName,
    CourseDescription,
  } = formData;

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!CourseName || !CourseDescription) {
      alert('Please fill in all required fields');
      return;
    }

    const courseData = {
      UserId: user.sub,
      CourseId: Date.now().toString(),
      CourseName,
      CourseDescription,
      CourseTextEditor: "",
      CourseObjectives: [],
    };
    
    // dispatch(createCourse(courseData))
    try {
      console.log(courseData);
      const course = await axios.post(`https://d302rrgsce.execute-api.ap-south-1.amazonaws.com/dev/courses/texteditor`, courseData);
      setCourseCreated(true);
      setCourseData(course);
      console.log(course);
      navigate(`/courses/${course.data.CourseId}`);
    } catch (error) {
        console.log(error);
      console.log('Error creating course. Please try again.');
    }
    
  };

  // useEffect(() => {
  //   if (courseCreated) {
  //     navigate(`/courses/${courseData[0]?.CourseId}`);
  //   }
  // }, [courseCreated, courseData, navigate]);

  

  return (
    <div>
    <div className="loginContainer" style={{height:"auto", margin:"10px"}}>
      <h1>Create Course</h1>
      <form onSubmit={onSubmit}>
        <div className="input-container">
            <label>CourseName </label>
            <input type="text"name="CourseName" value={CourseName} onChange={onChange} required />
            {/* {renderErrorMessage("pass")} */}
          </div>
          <div className="input-container">
            <label>Course Description </label>
            <input type="text" name="CourseDescription" value={CourseDescription} onChange={onChange} required />
            {/* {renderErrorMessage("pass")} */}
          </div>
        
          
          <div className="form-group">
            <button type="submit" className="loginBut">
              Create
            </button>
          </div>
      </form>
    </div>
    </div>
  )
}

export default CreateCoursePage