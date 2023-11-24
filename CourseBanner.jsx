import React from 'react'
// import './CourseBanner.css'


const CourseBanner = ({ title, description}) => {
    
  return (
    <div className='Banner'>
        <div className='PathName'>
          <div className='BannerText'>
            <h1 className='Title'> {title} </h1>  
            <p className='subTitle'>{description}</p>         
            <br></br>
            
          </div>

            <div className='ScrollGrid'>
              <button className='Scrollbtn'>Bootcamps</button>
              <button className='Scrollbtn'> <a href="#ScrollCourses">Courses</a></button>
              <button className='Scrollbtn'> Flowchart </button>
            </div>



        </div>
    </div>
  )
}

export default CourseBanner