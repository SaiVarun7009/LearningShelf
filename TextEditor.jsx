import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill's styles

const TextEditor = ({courseText, onUpdate}) => {
  const [content, setContent] = useState(courseText);

  // Modules and formats for the Quill editor
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      [{ align: [] }],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'link',
    'image',
    'align',
  ];

  // Load the saved content from Local Storage when the component mounts
  useEffect(() => {
    // const savedContent = localStorage.getItem('editorContent');
    let savedContent = courseText;
    console.log("savedContent",savedContent);
    if (savedContent) {
      setContent(savedContent);
    }
  }, [courseText]);

  const handleChange = (value) => {
    console.log('handleChange', value);
    setContent(value);
    // Save the content to Local Storage when the user types or modifies the content
    // localStorage.setItem('editorContent', value);
  };

  const handleSave = () => {
    onUpdate(content); // Notify the parent (CoursePage) about the updated content
  };

  return (
    <div>
      <h2>Text Editor for Students</h2>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        style={{ height: '200px'}} // Set the desired height of the editor
      />
      <br/><br/><br/><br/><br/><br/>
      <div>
      <button onClick={handleSave}>Save</button> {/* New "Save" button */}
      </div>
      
      {/* <div>
        <h3>Preview:</h3>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div> */}
    </div>
  );
};

export default TextEditor;
