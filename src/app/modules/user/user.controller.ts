import { UserServices } from './user.service';
import createAsync from '../../utils/createAsync';
import sendResponse from '../../middlewares/sendResponse';
import status from 'http-status-codes';

const createStudent = createAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  const result = await UserServices.createStudentInfoDb(req.file,password, studentData);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'create a student successfully',
    data: result,
  });
});

const createFaculty = createAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;
  const result = await UserServices.createFacultyIntoDb(req.file,password, facultyData);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Faculty is created successfully',
    data: result,
  });
});

const createAdmin = createAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;
  const result = await UserServices.createAdminIntoDB(req.file,password, adminData);
 sendResponse(res, {
   statusCode: status.OK,
   success: true,
   message: 'Admin is created successfully',
   data: result,
 });
});

const getOnlyMe = createAsync(async (req, res) => {
  const { userId, role } = req.user;
 
  const result = await UserServices.getOnlyMeFromDB(userId, role);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'user is getting successfully',
    data: result,
  });
});

const changeStatus = createAsync(async(req,res)=>{
  const id = req.params.id;
  const result = await UserServices.changeUserStatusFromDB(id,req.body)
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: ' successfully change status',
    data: result,
  });
})

export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
  getOnlyMe,
  changeStatus
};
