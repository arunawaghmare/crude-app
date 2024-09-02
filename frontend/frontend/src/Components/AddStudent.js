import React, { useEffect, useState } from 'react'
import { notify } from '../utils';
import { CreateStudent, UpdateStudentById } from '../api';


function AddStudent( {
  showModal, setShowModal, fetchStudent, studentObj
}) {
    const [student, setStudent] = useState({
        name: '',
        email: '',
        phone: '',
        department: '',
        
        profileImage: null
    });
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        if (studentObj) {
            setStudent(studentObj);
            setUpdateMode(true);
        }
    }, [studentObj]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent({ ...student, [name]: value });
    };

    const handleFileChange = (e) => {
        setStudent({ ...student, profileImage: e.target.files[0] });
    };

    const resetStudentStates = () => {
        setStudent({
            name: '',
            email: '',
            phone: '',
            department: '',
          
            profileImage: null,
        })
    }

    const handleAddStudent = async (e) => {
        e.preventDefault();
        try {
            const { success, message } = updateMode ?
                await UpdateStudentById(student, student._id)
                : await CreateStudent(student);
            console.log('create OR update ', success, message);
            if (success) {
                notify(message, 'success')
            } else {
                notify(message, 'error')
            }
            setShowModal(false);
            resetStudentStates();
            fetchStudent();
            setUpdateMode(false);
        } catch (err) {
            console.error(err);
            notify('Failed to create Student', 'error')
        }
    }

    const handleModalClose = () => {
        setShowModal(false);
        setUpdateMode(false);
        resetStudentStates();
    }
    return (
        <div className={`modal ${showModal ? 'd-block' : ''}`
        } tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title"> {
                            updateMode ? 'Update Student' : 'Add Student'
                        }</h5>
                        <button type="button" className="btn-close"
                            onClick={() => handleModalClose()}>
                        </button>
                    </div>
                    <div className="modal-body">
                <form  onSubmit={handleAddStudent}> 
                        
                      
                      <div className="mb-3">
                          <label className="form-label">Name</label>
                          <input
                              type="text"
                              className="form-control"
                              name="name"
                              value={student.name}
                              onChange={handleChange}
                              required
                          />
                      </div>
                      <div className="mb-3">
                          <label className="form-label">Email</label>
                          <input
                              type="email"
                              className="form-control"
                              name="email"
                              value={student.email}
                              onChange={handleChange}
                              required
                          />
                      </div>
                      <div className="mb-3">
                          <label className="form-label">Phone</label>
                          <input
                              type="text"
                              className="form-control"
                              name="phone"
                              value={student.phone}
                              onChange={handleChange}
                              required
                          />
                      </div>
                      <div className="mb-3">
                          <label className="form-label">Department</label>
                          <input
                              type="text"
                              className="form-control"
                              name="department"
                              value={student.department}
                              onChange={handleChange}
                              required
                          />
                      </div>
                      
                      
                      <div className="mb-3">
                          <label className="form-label">Profile Image</label>
                          <input
                              type="file"
                              className="form-control"
                              name="profileImage"
                              onChange={handleFileChange}
                              
                          />
                      </div>
                      <button type="submit"
                          className="btn btn-primary">
                          {updateMode ? 'Update' : 'Save'}
                      </button>
                      </form>
                     </div>
                     </div>
                    </div>
                    
                </div>
                
            
    

    )
}

export default AddStudent;