import React, { useEffect, useState } from 'react'
import StudentTable from './StudentTable';
import { DeleteStudentById,GetAllStudent } from '../api';
import AddStudent from './AddStudent';
import { ToastContainer } from 'react-toastify';
import { notify } from '../utils';

 const StudentManagementApp =()=> {
  const [showModal, setShowModal] = useState(false);
  const [studentObj, setStudentObj] = useState(null)
  const [studentData, setStudentData] = useState({
   student: []
    
  });
  const fetchStudent = async (search = '',  limit = 5) => {
    console.log('Called fetchstudent')
    try {
      const data =await GetAllStudent(search,  limit);
      console.log(data);
      setStudentData(data);
  } catch (err) {
      console.log('Error', err);
  }
}
 

useEffect(() => {
    fetchStudent();
}, [])
const handleSearch = (e) => {
  fetchStudent(e.target.value)
}

const handleUpdateStudent = async (stu) => {
  setStudentObj(stu);
  setShowModal(true);
}
  return (
    <div className='d-flex flex-column justify-content-center align-items-center w-100 p-3'>
            <h1>Student Management App</h1>
    <div className='w-100 d-flex justify-content-center'>
    <div className='w-80 border bg-light p-3' style={{ width: '80%' }}>
        <div className='d-flex justify-content-between mb-3'>
            <button className='btn btn-primary'  onClick={() => setShowModal(true)}>Add</button>
            <input
                              onChange={handleSearch}
                            type="text"
                            placeholder="Search Student..."
                            className='form-control w-50'
                        />
            </div>
            <StudentTable
            student={studentData.student}
           
            fetchStudent={fetchStudent}
            
            handleUpdateStudent={handleUpdateStudent}
          
            />
            <AddStudent

            fetchStudent={fetchStudent}
            showModal={showModal}
            setShowModal={setShowModal}
            studentObj={studentObj}/>
        </div>
        </div>
        <ToastContainer
                position='top-right'
                autoClose={3000}
                hideProgressBar={false}
            />
        </div>
  );

};
export default StudentManagementApp;