// import { StudentModel } from './student.interface';
import { Model, Types } from 'mongoose';

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  user: Types.ObjectId;
  id: string;
  password: string;
  name: TUserName;
  gender: 'male' | 'female';
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  admissionSemester: Types.ObjectId;
  isDeleted: boolean;
};

export interface StudentModel extends Model<TStudent>
 {
  isUserExits(id:string):Promise<TStudent | null>
}

// export type studentMethods = {
//   isUserExits(id: string): Promise<TStudent | null>;
// };
// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   studentMethods
// >;
