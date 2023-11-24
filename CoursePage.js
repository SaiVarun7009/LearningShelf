import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import CourseResources from "../Components/CourseResources";
import TextEditor from "../Components/TextEditor";
import { Icon } from '@iconify/react';
import "../Components/CourseBanner.css";
import "../Components/CourseCurriculum.css";
// import courseBannerImage from "./Banner1.jfif";

const CoursePage = () => {
  const { user } = useContext(AuthContext);
  const [course, setCourse] = useState([]);
  // const [editorContent, setEditorContent] = useState('');
  const [newObjective, setNewObjective] = useState(""); // New objective state
  const [editing, setEditing] = useState(false); // Flag to indicate if editing mode is active
  const [editedCourse, setEditedCourse] = useState({
    CourseName: "",
    CourseDescription: "",
    CourseObjectives: [],
  }); // State for storing edited course details
  const { courseId } = useParams();
  const navigate = useNavigate();
  // console.log(user);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        if (user) {
          console.log(user.sub);
          const response = await axios.get(
            `https://d302rrgsce.execute-api.ap-south-1.amazonaws.com/dev/courseDetails/${courseId}/${user.sub}`,
            { mode: "cors" }
          );
          console.log(response);
          setCourse(response.data);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };
    if (user) {
      fetchCourse();
    }
  }, [user, courseId]);

  // Load the saved editorContent from Local Storage when the component mounts
  // useEffect(() => {
  //   // const savedContent = localStorage.getItem('editorContent');
  //   const savedContent = course[0]?.CourseTextEditor;
  //   if (savedContent) {
  //     setEditorContent(savedContent);
  //   }
  // }, []);

  const handleSaveEditorContent = (content) => {
    const updatedCourse = { ...course[0] };
    updatedCourse.CourseTextEditor = content;
    setCourse([updatedCourse]); // Update the course state with the updated object
    updateCourse(updatedCourse);
  }

  const handleAddObjective = () => {
    const updatedCourse = { ...course[0] }; // Create a copy of the course object
    updatedCourse.CourseObjectives.push(newObjective); // Add the new objective to the array
    setCourse([updatedCourse]); // Update the course state with the updated object
    setNewObjective(""); // Clear the newObjective state
    updateCourse(updatedCourse);
  };

  const handleDeleteObjective = (index) => {
    const updatedCourse = { ...course[0] }; // Create a copy of the course object
    updatedCourse.CourseObjectives.splice(index, 1); // Remove the objective at the given index
    setCourse([updatedCourse]); // Update the course state with the updated object
    updateCourse(updatedCourse);
  };

  const updateCourse = async (updatedCourse) => {
    try {
      const response = await axios.put(
        `https://d302rrgsce.execute-api.ap-south-1.amazonaws.com/dev/courseDetailsText/${courseId}/${user.sub}`,
        updatedCourse,
        { mode: "cors" }
      );
      console.log(response);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const deleteCourse = async () => {
    try {
      const response = await axios.delete(
        `https://d302rrgsce.execute-api.ap-south-1.amazonaws.com/dev/course/${courseId}/${user.sub}`,
        { mode: "cors" }
      );
      console.log(response);
      navigate("/courses");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleEdit = () => {
    setEditing(true);
    setEditedCourse({
      CourseName: course[0]?.CourseName || "",
      CourseDescription: course[0]?.CourseDescription || "",
      CourseObjectives: [...(course[0]?.CourseObjectives || [])],
    });
  };

  const handleUpdateCourseInfo = async () => {
    try {
      const response = await axios.put(
        `https://d302rrgsce.execute-api.ap-south-1.amazonaws.com/dev/courseDetails/${courseId}/${user.sub}`,
        editedCourse,
        { mode: "cors" }
      );
      console.log(response);
      setCourse([editedCourse]); // Update the course state with the edited course
      setEditing(false);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleCancel = () => {
    setEditing(false);
  };

  if (!user) {
    return <p>Access denied. Please log in to view the course.</p>;
  }

  if (!course) {
    return <div>Loading...</div>;
  }

  if (course.length === 0) {
    return <p>Course not found.</p>;
  }

  return (
    <div>
      <div>
        {/* <CourseBanner title={course[0]?.CourseName} description={course[0]?.CourseDescription} /> */}
        <div className='Banner'>
          <div className='PathName'>
            <div className='BannerText'>
              {editing ? (
                <div>
                  <label>
                    Course Name:
                    <input
                      type="text"
                      value={editedCourse.CourseName}
                      onChange={(e) =>
                        setEditedCourse({ ...editedCourse, CourseName: e.target.value })
                      }
                    />
                  </label>
                  <br />
                  <label>
                    Course Description:
                    <textarea
                      value={editedCourse.CourseDescription}
                      onChange={(e) =>
                        setEditedCourse({
                          ...editedCourse,
                          CourseDescription: e.target.value,
                        })
                      }
                    />
                  </label>
                  <br />
                  <button onClick={handleUpdateCourseInfo}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </div>
              ) : (
                <div className='BannerText'>
                  <h1 className='Title'> {course[0]?.CourseName} </h1>  
                  <p className='subTitle'>{course[0]?.CourseDescription}</p>     
                  <button onClick={handleEdit}>Edit</button>
                </div>
              )}
                      
              <br></br>
            </div>
            <div className='ScrollGrid'>
              <button className='Scrollbtn'>Bootcamps</button>
              <button className='Scrollbtn'> <a href="#ScrollCourses">Courses</a></button>
              <button className='Scrollbtn'> Flowchart </button>
            </div>
          </div>
        </div>
        {/* <h1>Course Page</h1>
        <p>Course ID: {courseId}</p> */}

        {/* {editing ? (
          <div>
            <label>
              Course Name:
              <input
                type="text"
                value={editedCourse.CourseName}
                onChange={(e) =>
                  setEditedCourse({ ...editedCourse, CourseName: e.target.value })
                }
              />
            </label>
            <br />
            <label>
              Course Description:
              <textarea
                value={editedCourse.CourseDescription}
                onChange={(e) =>
                  setEditedCourse({
                    ...editedCourse,
                    CourseDescription: e.target.value,
                  })
                }
              />
            </label>
            <br />
            <button onClick={handleUpdateCourseInfo}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <div>
            <h2>{course[0]?.CourseName}</h2>
            <p>{course[0]?.CourseDescription}</p>
            <button onClick={handleEdit}>Edit</button>
          </div>
        )} */}
      </div>
      <div className="Description">
        <div className="PathwayInfo">
            {/* <h3>Description</h3> */}
            <TextEditor courseText={course[0]?.CourseTextEditor} onUpdate={handleSaveEditorContent} />
            
        </div>
        
        <div className="PathwayFeautures">
            <h3 className="FeautureHeading">What will youlearn</h3>
            <div className="Feauture">
                {course[0]?.CourseObjectives.length > 0 ? (
                  <div>
                    {course[0]?.CourseObjectives.map((objective, index) => (
                      <div className="FeautureContent">
                        <Icon icon="teenyicons:tick-circle-solid" color="orange" />
                        <span key={index} className="feauture-title"> {objective} </span>
                        <button onClick={() => handleDeleteObjective(index)}>Delete</button>                        
                      </div>
                    
                    ))}
                  </div>
                ) : (
                    <p>No objectives available.</p>
                )}
                <div className="input-container" style={{display:"flex", flexDirection:"row", width:"100%"}}>
                  <input style={{width:"80%"}} type="text" value={newObjective} onChange={(e) => setNewObjective(e.target.value)} />
                  <button onClick={handleAddObjective}>Add Objective</button>   
                </div>
            </div>
        </div>
      </div>
      {/* <div>
        <h2>Course Objectives</h2>
        {course[0]?.CourseObjectives.length > 0 ? (
          <ul>
            {course[0]?.CourseObjectives.map((objective, index) => (
              <li key={index}>
                {objective}
                <button onClick={() => handleDeleteObjective(index)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No objectives available.</p>
        )}
        <input
          type="text"
          value={newObjective}
          onChange={(e) => setNewObjective(e.target.value)}
        />
        <button onClick={handleAddObjective}>Add Objective</button>
      </div> */}
      <br/><br/>
      {/* <div>
        <button onClick={handleSaveEditorContent}>Save</button>
        <p>{editorContent}</p>
      </div> */}
      <div>
        <CourseResources CourseId={courseId} />
        <br/><br/><br/>
      </div>
      <div>
        <button className="submitButton" onClick={deleteCourse}>Delete Course</button>
      </div>
    </div>
  );
};

export default CoursePage;

