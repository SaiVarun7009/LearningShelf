import React, { useState } from "react";
import axios from "axios";
import './CourseResources.css'


const CourseResourceForm = ({ CourseId, fetchResources }) => {
  const [resourceName, setResourceName] = useState("");
  const [resourceType, setResourceType] = useState("");
//   const [newResources, setNewResources] = useState([]);

  const handleResourceNameChange = (event) => {
    setResourceName(event.target.value);
  };

  const handleResourceTypeChange = (event) => {
    setResourceType(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!resourceName || !resourceType) {
      alert("Please fill in all required fields");
      return;
    }

    const resourceData = {
      CourseId: CourseId,
      ResourceId: Date.now().toString(),
      ResourceName: resourceName,
      ResourceType: resourceType,
      Links: []
    };

    try {
      console.log(resourceData);
      const response = await axios.post(
        `https://d302rrgsce.execute-api.ap-south-1.amazonaws.com/dev/course/course-resources`,
        resourceData
      );

      if (response.status === 201) {
        setResourceName("");
        setResourceType("");
        fetchResources();
      } else {
        console.error("Error creating resource");
      }
    } catch (error) {
      console.log(error);
      console.error("Error communicating with the server");
    }
  };

  const handleCancel = () => {
    setResourceName("");
    setResourceType("");
  };


  return (
    <div className="ResourceFormContainer">
        <div>
            <h3>Create a Resource and make you learning more organized</h3>
        </div>
        {/* <div>
            <form onSubmit={handleSubmit}>
                <label>
                Resource Name:
                <input
                    type="text"
                    value={resourceName}
                    onChange={handleResourceNameChange}
                />
                </label>
                <br />
                <label>
                Resource Type:
                <select value={resourceType} onChange={handleResourceTypeChange}>
                    <option value="">Select Type</option>
                    <option value="Type 1">Type 1</option>
                    <option value="Type 2">Type 2</option>
                </select>
                </label>
                <br />
                <button type="submit">Create Resource</button>
                <button type="button" onClick={handleCancel}>
                Cancel
                </button>
            </form>
        </div> */}
        <div >
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                {/* <label>Resource Name:</label> */}
                <input
                    type="text"
                    value={resourceName}
                    onChange={handleResourceNameChange}
                    placeholder="Resource Name"
                />
                </div>
                <div className="input-container">
                {/* <label>Resource Type:</label> */}
                <select value={resourceType} onChange={handleResourceTypeChange}>
                    <option value="">Select Resource Type</option>
                    <option value="Google">Google Web Pages</option>
                    <option value="Youtube">Youtube Videos</option>
                    <option value="Github">Github</option>
                    <option value="Other">Other</option>
                    {/* Add more options as needed */}
                </select>
                </div>

                <div className="form-group">
                <button type="submit" className="submitButton">
                    Create Resource
                </button>
                <button type="button" onClick={handleCancel} className="submitButton">
                    Cancel
                </button>
                </div>
            </form>
        </div>

    </div>
  );
};

export default CourseResourceForm;
