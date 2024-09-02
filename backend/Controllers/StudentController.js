const StudentModel = require("../Models/StudentModel");

const createStudent = async (req, res) => {
  try {
    const body = req.body;
    body. profileImage = req.file ? req.file?.path : null;
    console.log(body);

    const stu = new StudentModel(body);

    await stu.save();
    res.status(201)
        .json({
            message: 'student Created',
            success: true,
        })
} catch (err) {
    console.log('Error ', err);
    res.status(500).json({
        message: 'Internal Server Error',
        success: false,
        error: err
    })
}
}


const getAllStudent = async (req, res) => {
    try {
    
        let {  limit, search } = req.query;
        
        limit = parseInt(limit) || 10;
        
        let searchCriteria = {};
        if (search) {
            searchCriteria = {
                name: {
                    $regex: search,
                    $options: 'i' 
                }
            }
        }
        
      

        
        const stu = await StudentModel.find(searchCriteria)
           
            .limit(limit)
            .sort({ updatedAt: -1 });

        
   

        res.status(200)
            .json({
                message: 'All Student',
                success: true,
                data: {
                    student: stu
                    
                }
            });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: err
        });
    }
};



  
const getAllStudentById = async (req, res) => {
    try {
        const id=req.params.id;
      const stu = await StudentModel.findOne({_id:id});
  
    
      res.status(200)
          .json({
              message: 'get student details',
              success: true,
              data: stu
          });
  } catch (err) {
      console.log('Error ', err);
      res.status(500).json({
          message: 'Internal Server Error',
          success: false,
          error: err
      })
  }
  }


  const deleteAllStudentById = async (req, res) => {
    try {
        const {id}=req.params;
      const stu = await StudentModel.findByIdAndDelete({_id:id});
  
    
      res.status(200)
          .json({
              message: 'student deleted',
              success: true,
      
          })
  } catch (err) {
      console.log('Error ', err);
      res.status(500).json({
          message: 'Internal Server Error',
          success: false,
          error: err
      })
  }
  }


  const updateStudentById = async (req, res) => {
    try {
      const {name,phone,email,department} = req.body;
      const {id}=req.params;
      let updateData = {
        name, email, phone, department
    }
    
    if (req.file) {
        updateData.profileImage = req.file.path;
    }
      
    const updatedStudent = await StudentModel.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
    )

    if (!updatedStudent) {
        return res.status(404).json({ message: 'Student not found' });
    }

      res.status(200)
          .json({
              message: 'student updated',
              success: true,
              data:updatedStudent
          });
  } catch (err) {
      console.log('Error ', err);
      res.status(500).json({
          message: 'Internal Server Error',
          success: false,
          error: err
      })
  }
  }
  

module.exports={
createStudent,
getAllStudent,
getAllStudentById,
deleteAllStudentById,
updateStudentById
}