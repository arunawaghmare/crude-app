import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GetStudentDetailsById } from '../api';

const StudentDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [student, setStudent] = useState({});

  const fetchStudentDetails = async () => {
      try {
          const data = await GetStudentDetailsById(id);
          setStudent(data);
      } catch (err) {
          alert('Error', err);
      }
  }
  useEffect(() => {
      fetchStudentDetails();
  }, [id])

  if (!student) {
      return <div>Student not found</div>;
  }

  return (
      <div className="container mt-5">
          <div className="card">
              <div className="card-header">
                  <h2>Student Details</h2>
              </div>
              <div className="card-body">
                  <div className="row mb-3">
                      <div className="col-md-3">
                          <img
                              src={student.profileImage}
                              alt={student.name}
                              className="img-fluid rounded"
                          />
                      </div>
                      <div className="col-md-9">
                          <h4>{student.name}</h4>
                          <p><strong>Email:</strong> {student.email}</p>
                          <p><strong>Phone:</strong> {student.phone}</p>
                          <p><strong>Department:</strong> {student.department}</p>
                          
                      </div>
                  </div>
                  <button className="btn btn-primary" onClick={() => navigate('/student')}>
                      Back
                  </button>
              </div>
          </div>
      </div>
  );
};


export default StudentDetails;