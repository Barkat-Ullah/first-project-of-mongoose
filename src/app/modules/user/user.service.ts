/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../students/student.interface';
import { Student } from '../students/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generatedStudentId,
  generateFacultyId,
} from './user.utils';
import AppError from '../../error/AppError';
import { TFaculty } from '../faculty/faculty.interface';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Faculty } from '../faculty/faculty.model';
import { Admin } from '../admin/admin.model';
import { TAdmin } from '../admin/admin.interface';
import sendImageToCloudinary from '../../utils/sendImageToCloudinary';

const createStudentInfoDb = async (
  file: any,
  password: string,
  payload: TStudent,
) => {
  //   if (await Student.isUserExits(payload.id)) {
  //     throw new AppError('User already exists');
  //   }
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_pass as string);
  userData.role = 'student';
  //set a student email
  userData.email = payload.email;

  const academicAdmission = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  if (!academicAdmission) {
    throw new AppError(400, 'Admission semester not found');
  }
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'academic department not found');
  }
  payload.academicFaculty = academicDepartment.academicFaculty;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    userData.id = await generatedStudentId(academicAdmission);

    //send image to cloudinary

    if (file) {
      const imageName = `${userData.id}${payload?.name?.firstName}`;
      const path = file?.path;

      const { secure_url } = await sendImageToCloudinary(imageName, path);
      payload.profileImg = secure_url;
    }

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(500, 'Failed to create a user');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id
    //reference _id

    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(500, 'Failed to create a student');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(404, err);
  }
};

const createFacultyIntoDb = async (
  file: any,
  password: string,
  payload: TFaculty,
) => {
  const userData: Partial<TUser> = {};

  //if password is not given , use default password
  userData.password = password || (config.default_pass as string);

  //set faculty role
  userData.role = 'faculty';
  //set a student email
  userData.email = payload.email;
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );
  if (!academicDepartment) {
    throw new AppError(404, 'Failed to academic department user');
  }
  payload.academicFaculty = academicDepartment?.academicFaculty

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    userData.id = await generateFacultyId();

    //send image to cloudinary

    if (file) {
      const imageName = `${userData.id}${payload?.name?.firstName}`;
      const path = file?.path;

      const { secure_url } = await sendImageToCloudinary(imageName, path);
      payload.profileImg = secure_url;
    }
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(500, 'Failed to create a user');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    //reference _id

    const newFaculty = await Faculty.create([payload], { session });
    if (!newFaculty.length) {
      throw new AppError(500, 'Failed to create a Faculty');
    }
    await session.commitTransaction();
    await session.endSession();
    return newFaculty;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const createAdminIntoDB = async (
  file: any,
  password: string,
  payload: TAdmin,
) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_pass as string);
  userData.role = 'admin';
  //set a student email
  userData.email = payload.email;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    userData.id = await generateAdminId();
    //send image to cloudinary

    if (file) {
      const imageName = `${userData.id}${payload?.name?.firstName}`;
      const path = file?.path;

      const { secure_url } = await sendImageToCloudinary(imageName, path);
      payload.profileImg = secure_url;
    }

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(500, 'Failed to create user');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(500, 'Failed to create admin');
    }

    await session.commitTransaction();
    session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

const getOnlyMeFromDB = async (userId: string, role: string) => {
  let result = null;
  if (role === 'student') {
    result = Student.findOne({ id: userId }).populate('user');
  }
  if (role === 'faculty') {
    result = Faculty.findOne({ id: userId }).populate('user');
  }
  if (role === 'admin') {
    result = Admin.findOne({ id: userId }).populate('user');
  }

  return result;
};

const changeUserStatusFromDB = async (
  id: string,
  payload: { status: string },
) => {
  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

export const UserServices = {
  createStudentInfoDb,
  createFacultyIntoDb,
  createAdminIntoDB,
  getOnlyMeFromDB,
  changeUserStatusFromDB,
};
