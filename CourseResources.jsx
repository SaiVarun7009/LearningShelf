import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import ResourcePanel from "./Youtube";
import CreateResourceForm from './CreateResourceForm'
import LogoComponent from "./LogoComponent";
import './CourseResources.css'


const CourseResources = ({CourseId}) => {
  const { user } = useContext(AuthContext);
  const [resources, setResources] = useState([]);
  const [newLinkDescription, setNewLinkDescription] = useState("");
  const [newLinkURL, setNewLinkURL] = useState("");
  const [selectedResourceIndex, setSelectedResourceIndex] = useState(null);


  const fetchResources = async () => {
    try {
      
      if (user) {
        // console.log(CourseId);
        const response = await axios.get(
          ` https://d302rrgsce.execute-api.ap-south-1.amazonaws.com/dev/CourseResources/${CourseId}`,
          { mode: "cors" }
        );
        console.log(response);
        // Check if resources are found or not
        if (response.data.length === 0) {
          setResources([]);
        } else {
          setResources(response.data);
        }
      //   console.log(resources);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  
  useEffect(() => {
    // const fetchResources = async () => {
    //   try {
        
    //     if (user) {
    //       // console.log(CourseId);
    //       const response = await axios.get(
    //         ` https://d302rrgsce.execute-api.ap-south-1.amazonaws.com/dev/CourseResources/${CourseId}`,
    //         { mode: "cors" }
    //       );
    //       console.log(response);
    //       // Check if resources are found or not
    //       if (response.data.length === 0) {
    //         setResources([]);
    //       } else {
    //         setResources(response.data);
    //       }
    //     //   console.log(resources);
    //     }
    //   } catch (error) {
    //     console.log("Error:", error);
    //   }
    // };
    if (user) {
      fetchResources();
    }
  }, [user, CourseId]);

  const deleteResource = async (resourceId) => {
    try {
      const response = await axios.delete(
        `https://d302rrgsce.execute-api.ap-south-1.amazonaws.com/dev/deleteCourseResource/${CourseId}/${resourceId}`,
        { mode: "cors" }
      );
      console.log(response);
      fetchResources();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleAddLink = (selectedResourceIndex) => {
    if (selectedResourceIndex !== null && newLinkDescription && newLinkURL) {
      const updatedResources = [...resources];
      const selectedResource = updatedResources[selectedResourceIndex];
      selectedResource.ResourceData.Links.push({
        Description: newLinkDescription,
        Link: newLinkURL,
      });
      setResources(updatedResources);
      setNewLinkDescription("");
      setNewLinkURL("");
      // console.log(selectedResource.CourseResourceId, selectedResource);
      updateCourseResource(selectedResource.CourseResourceId, selectedResource);
    }
  };

  const handleDeleteLink = (resourceIndex, linkIndex) => {
    const updatedResources = [...resources];
    const selectedResource = updatedResources[resourceIndex];
  
    if (selectedResource.ResourceData && Array.isArray(selectedResource.ResourceData.Links)) {
      selectedResource.ResourceData.Links.splice(linkIndex, 1);
      setResources(updatedResources);
      updateCourseResource(selectedResource.CourseResourceId, selectedResource);
    }
  };
  
  const updateCourseResource = async (updatingResourceId, updatedResource) => {
    try {
      // Add a check for 'ResourceData' and 'Links' properties
      if (updatedResource && updatedResource.ResourceData && Array.isArray(updatedResource.ResourceData.Links)) {
        const response = await axios.put(
          `https://d302rrgsce.execute-api.ap-south-1.amazonaws.com/dev/updateCourseResources/${CourseId}/${updatingResourceId}`,
          updatedResource.ResourceData,
          { mode: "cors" }
        );
        console.log(response);
      } else {
        console.log("Invalid updatedResource:", updatedResource);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const webpageUrl = 'https://www.interviewbit.com/courses/programming/';

  return (
    <div>
      <div >
        <CreateResourceForm CourseId={CourseId} fetchResources={fetchResources} />
      </div>
      <br/><br/>
      <div>
        <LogoComponent  webpageUrl={webpageUrl}/>
      </div>
      <br/><br/>
      {resources.length === 0 ? (
        <div>No resources found for the course.</div>
      ) : (
        <div>
          {/* {resources.map((resource, index) => (
            <div key={index}>
              <p>Resource Name: {resource.ResourceName}</p>
              <p>Resource ID: {resource.CourseResourceId}</p>
              <p>Resource Type: {resource.ResourceType}</p>
              <p>Course ID: {resource.CourseId}</p>
              <p>Links:</p>
              <ul>
                {resource.ResourceData.Links.map((link, idx) => (
                  <li key={idx}>
                    <a href={link.Link} target="_blank" rel="noopener noreferrer">
                      {link.Description}
                    </a>
                    <button onClick={() => handleDeleteLink(index, idx)}>
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
              <input
                type="text"
                placeholder="Link Description"
                value={newLinkDescription}
                onChange={(e) => setNewLinkDescription(e.target.value)}
              />
              <input
                type="text"
                placeholder="Link URL"
                value={newLinkURL}
                onChange={(e) => setNewLinkURL(e.target.value)}
              />
              <button onClick={() => {setSelectedResourceIndex(index); handleAddLink()}}>
                Add Link
              </button>
            </div>
          ))} */}
          <h1>Course Resources</h1>
          <div className="ResourcesContainer">
            
            {resources.map((resource, index) => (
              <div>
                <div key={index}>
                  <ResourcePanel name = {resource.ResourceName} type = {resource.ResourceType} links = {resource.ResourceData.Links} 
                           handleDeleteLink={handleDeleteLink} resourceIndex={index}/> 
                </div>
                <div>
                  <div>
                    <input type="text" placeholder="Link Description" value={newLinkDescription} 
                            onChange={(e) => setNewLinkDescription(e.target.value)} />
                  </div>
                  <div>
                  <input
                    type="text"
                    placeholder="Link URL"
                    value={newLinkURL}
                    onChange={(e) => setNewLinkURL(e.target.value)}
                  />
                  </div>
                  <button className="submitButton" onClick={() => {setSelectedResourceIndex(index); handleAddLink(index)}}>
                    Add Link
                  </button>
                  <div>
                    <button className="submitButton" onClick={() => deleteResource(resource.CourseResourceId)}>Delete Course</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      )}
    </div>
  );
  
}

export default CourseResources