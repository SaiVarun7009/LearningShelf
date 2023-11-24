import React, { useState } from "react";
import './CourseCurriculum.css';

const CourseCurriculum = ({objectives}) => {
    const [showMore, setShowMore] = useState(false);

    const toggleShowMore = () => {
        setShowMore(!showMore);
    }

    return(
        <div className="Description">
            <div className="PathwayInfo">
                <h3>Description</h3>
            </div>
            <div className="PathwayFeautures">
                <h3 className="FeautureHeading">What will youlearn</h3>
                <div className="Feauture">
                    {course[0]?.CourseObjectives.length > 0 ? (
                        <ul>
                            {course[0]?.CourseObjectives.map((objective, index) => (
                                
                            <p key={index}>
                                {objective}
                                <button onClick={() => handleDeleteObjective(index)}>Delete</button>
                            </p>
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

                    <div className="FeautureContent">
                        {/* <div className="Feautureicon">
                            <iconify-icon style={{color:"red", fontSize:"2em"}} icon="mdi:flowchart-outline"></iconify-icon>
                        </div> */}
                        
                        <div className="FeautureInfo">
                            <span className="feature-title"> A structured course tree</span>
                            <p className="feauture-description">
                            A carefully tailored list of courses for best experience developing your skills, including only the essentials and skipping the usual college surpluses
                            </p>
                        </div>
                        
                    </div>
                                 
                    
                </div>
            </div>
            
        </div>
    )
}


export default CourseCurriculum;