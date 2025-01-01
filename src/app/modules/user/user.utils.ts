import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudent = async () => {
  const findStudentId = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  return findStudentId?.id ? findStudentId.id : undefined;
};
//year,semester code 4digit code
export const generatedStudentId = async (payload: TAcademicSemester) => {
  // first time 0000
  let currentId = (0).toString();
  const lastId = await findLastStudent();
  const lastStudentYear = lastId?.substring(0, 4);
  const lastStudentCode = lastId?.substring(4, 6);

  const currentSemesterCode = payload.code;
  const currentSemesterYear = payload.year;

  if (
    lastId &&
    lastStudentCode === currentSemesterCode &&
    lastStudentYear === currentSemesterYear
  ) {
    currentId = lastId.substring(6);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};

const findLastFaculty = async () => {
  const findFaculty = await User.findOne(
    {
      role: 'faculty',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean();
  return findFaculty?.id ? findFaculty.id : undefined;
};

export const generateFacultyId = async () => {
  let currentId = (0).toString();
  const lastFacultyId = await findLastFaculty();

  if (lastFacultyId) {
    currentId = lastFacultyId.substring(2);
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `F-${incrementId}`;
  return incrementId;
};

const findLastAdmin = async () => {
  const findAdmin = await User.findOne(
    {
      role: 'admin',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean();
  return findAdmin?.id ? findAdmin.id : undefined;
};

export const generateAdminId = async () => {
  let currentId = (0).toString();
  const lastAdminId = await findLastAdmin();

  if (lastAdminId) {
    currentId = lastAdminId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `A-${incrementId}`;
  return incrementId;
};