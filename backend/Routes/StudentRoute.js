const { createStudent, getAllStudent, getAllStudentById, updateStudentById, deleteAllStudentById } = require('../Controllers/StudentController');
const { cloudinaryFileUploader } = require('../Middleware/FileUpload');


const routes = require('express').Router();
routes.get('/',getAllStudent);
routes.post('/',cloudinaryFileUploader.single('profileImage'),createStudent)
routes.put('/:id',cloudinaryFileUploader.single('profileImage'),updateStudentById)
routes.get('/:id',getAllStudentById);
routes.delete('/:id',deleteAllStudentById);
module.exports=routes;