
import { UserServices } from './user.service';
import createAsync from '../../utils/createAsync';

const createStudent = createAsync(async (req, res, next) => {

    const { password, student: studentData } = req.body;
    // zod code
    // const zodValidation = studentSchema.parse(studentData);
    const result = await UserServices.createStudentInfoDb(
      password,
      studentData,
    );
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
})

export const UserControllers = {
  createStudent,
};
