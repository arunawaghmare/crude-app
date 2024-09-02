
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import StudentManagementApp from './Components/StudentManagementApp';
import StudentDetails from './Components/StudentDetails';
function App() {
  return (
    <div >
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="student" />} />
          <Route path="/student" element={<StudentManagementApp />} />
          <Route path="/student/:id" element={<StudentDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
