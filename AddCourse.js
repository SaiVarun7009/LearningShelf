import React, {useState} from 'react'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import CourseForm from '../Pages/CreateCoursePage'

const AddCourse = () => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <div>
    <div className='reference'>
      <h1>Add Course</h1>
        <div className="">
          
          <div className=''>
            <button className='' onClick={onOpenModal}>Explore</button>
          </div>
          
        </div>
        <Modal open={open} onClose={onCloseModal} center styles={{ modal: {  maxHeight: '80vh', // Set the maximum height of the modal to 80% of the viewport height
              overflow: 'auto',} }}>
         <div>
          <h2>Simple centered modal</h2>
          <CourseForm />

    
            
          </div>
          
        </Modal>
        
    </div>
    </div>
  )
}

export default AddCourse