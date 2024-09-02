import React from 'react'
import { Link } from 'react-router-dom';
import { DeleteStudentById } from '../api';
import { notify } from '../utils';
function StudentTable({student,fetchStudent,handleUpdateStudent}) {
  const headers = ['Name', 'Email', 'Phone', 'Department', 'Actions'];
 
  
const handleDeleteStudent = async (id) => {
    try {
        const { success, message } = await DeleteStudentById(id);
        if (success) {
            notify(message, 'success')
        } else {
            notify(message, 'error')
        }
        fetchStudent();
    } catch (err) {
        console.error(err);
        notify('Failed to delete Student', 'error')
    }
}
   
  const TableRow = ( {student} ) => {
    return <tr>
        <td>
            <Link to={`/student/${student._id}`} className="text-decoration-none">{student.name}</Link>
               
        </td>
        
        <td>{student.email}</td>
        <td>{student.phone}</td>
        <td>{student.department}</td>
        <td>
            <i
                className='bi bi-pencil-fill text-warning me-4'
                role="button"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Edit"
                onClick={() => handleUpdateStudent(student)}

            ></i>
            <i
                    className='bi bi-trash-fill text-danger'
                    role="button"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Delete"
                    onClick={() => handleDeleteStudent(student._id)}
                ></i>
            
        </td>
    </tr>
}

return (
  <>
      <table className='table table-striped'>
          <thead>
              <tr>
                  {
                      headers.map((header, i) => (
                          <th key={i}>{header}</th>
                      ))
                  }
              </tr>
          </thead>
          <tbody>
          {
            student.map((stu)=>(
<TableRow key={stu._id} student={stu}/>
            ))
          }
          
          
          </tbody>
          </table>
          
     
      </>
)}


export default StudentTable;