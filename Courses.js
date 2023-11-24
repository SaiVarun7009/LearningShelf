import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import axios from "axios";
import { useContext } from "react"
import { AuthContext } from "../Context/AuthContext"
import AddCourse from "../Components/AddCourse";
import CourseCard from "../Components/CourseCards";
import '../PageStyles/CoursesPageStyles.css'

const Courses = () => {
    const { user, sessionDetails } = useContext(AuthContext)
    const [courses, setCourses] = useState([]);
    const [singleCourse, setSingleCourse] = useState([]);
    // useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         // const token = sessionDetails.idToken.jwtToken;
    //         // console.log(token);
    //         console.log(user.sub);
    //         const response = await axios.get(`https://d302rrgsce.execute-api.ap-south-1.amazonaws.com/dev/userCourses/${user.sub}`, {mode:'cors'});
    //         const response2 = await axios.get(`https://d302rrgsce.execute-api.ap-south-1.amazonaws.com/dev/courseDetails/Course13329/User23398`, {mode:'cors'});
    //         // const response2 = await axios.get(
    //         //   "https://d302rrgsce.execute-api.ap-south-1.amazonaws.com/dev/courseDetails/Course13329/User23398",
    //         //   { headers: { Authorization: `Bearer ${token}` } }, {mode:'cors'}
    //         // );
      
    //         console.log("response.data",response.data); // log the response data to the console
    //         setCourses(response.data);
    //         setSingleCourse(response2.data);
    //         // console.log(singleCourse);
    //       } catch (error) {
    //         console.error(error);
    //       }
    //     };
    //     fetchData();
    // }, []);
    useEffect(() => {
      const fetchData = async () => {
        try {
          if (user) {
            console.log(user.sub);
            const response = await axios.get(
              `https://d302rrgsce.execute-api.ap-south-1.amazonaws.com/dev/userCourses/${user.sub}`,
              { mode: "cors" }
            );
            // const response2 = await axios.get(
            //   `https://d302rrgsce.execute-api.ap-south-1.amazonaws.com/dev/courseDetails/Course13329/User23398`,
            //   { mode: "cors" }
            // );
            console.log("response.data", response.data);
            setCourses(response.data);
            // setSingleCourse(response2.data);
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }, [user]);
    // useEffect(() => {
    //   console.log(singleCourse);
    // }, [singleCourse]);

    if (!user) {
      <p>Access denied. Please log in to create a course</p>
    } 

    return (
        <div className="All_Courses_Div" >
          <h1>Your Courses</h1>
          {/* <p>{user.sub}</p> */}
          {/* <div style={{display:'flex', flexWrap:'wrap', gap:'15px', justifyContent:'center', margin:'15px'}}>
            {courses.map((course) => (
                <p>{course.CourseName}</p>
            //   <CourseCard key={course._id} course={course} navigate={navigate} />
            ))}
            <h3>Single Course Fetched</h3>
            <p>{singleCourse[0]?.CourseName}</p>
          </div> */}
          <AddCourse/>
          <div className="CourseCardContainer">
            {courses.map((course) => (
              <CourseCard key={course.CourseId} course={course} />
            ))}
          </div>
        </div>
    
      )

}

export default Courses