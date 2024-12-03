import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { academicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../students/student.interface';
import { Student } from '../students/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generatedStudentId } from './user.utils';

const createStudentInfoDb = async (password: string, payload: TStudent) => {
  //   if (await Student.isUserExits(payload.id)) {
  //     throw new Error('User already exists');
  //   }
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_pass as string);
  userData.role = 'student';

  const academicAdmission = await academicSemester.findById(
    payload.admissionSemester,
  );

  userData.id = await generatedStudentId(academicAdmission);

  const newUser = await User.create(userData);
  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id;
    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentInfoDb,
};
