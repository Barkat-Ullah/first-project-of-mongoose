import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { Course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './OfferedCourse.interface';
import { OfferedCourse } from './OfferedCourse.model';
import { hasTimeConflict } from './OfferedCourse.utils';
import { Student } from '../students/student.model';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicDepartment,
    section,
    academicFaculty,
    course,
    faculty,
    days,
    startTime,
    endTime,
  } = payload;
  const isSemesterRegistrationExits =
    await SemesterRegistration?.findById(semesterRegistration);
  const academicSemester = isSemesterRegistrationExits?.academicSemester;

  if (!isSemesterRegistrationExits) {
    throw new AppError(500, 'Semester registration not found !');
  }

  const isAcademicFacultyExits =
    await AcademicFaculty.findById(academicFaculty);

  if (!isAcademicFacultyExits) {
    throw new AppError(500, 'Academic Faculty not found !');
  }

  const isAcademicDepartmentExits =
    await AcademicDepartment.findById(academicDepartment);

  if (!isAcademicDepartmentExits) {
    throw new AppError(500, 'Academic Department not found !');
  }

  const isCourseExits = await Course.findById(course);

  if (!isCourseExits) {
    throw new AppError(500, 'Course not found !');
  }

  const isFacultyExits = await Faculty.findById(faculty);

  if (!isFacultyExits) {
    throw new AppError(500, 'Faculty not found !');
  }

  // check if the department is belong to the  faculty
  const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
    _id: academicDepartment,
    academicFaculty,
  });

  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      400,
      `This ${isAcademicDepartmentExits.name} is not  belong to this ${isAcademicFacultyExits.name}`,
    );
  }

  // check if the same offered course same section in same registered semester exists

  const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection =
    await OfferedCourse.findOne({
      semesterRegistration,
      course,
      section,
    });

  if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
    throw new AppError(
      400,
      `Offered course with same section is already exist!`,
    );
  }

  // get the schedules of the faculties
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      401,
      `This faculty is not available at that time ! Choose other time or day`,
    );
  }

  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};
const getAllOfferedCoursesFromDB = async (query: Record<string, unknown>) => {
  const offeredCourseQuery = new QueryBuilder(OfferedCourse.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await offeredCourseQuery.modelQuery;
  const meta = await offeredCourseQuery.countTotal();

  return {
    meta,
    result,
  };
};
const getSingleOfferedCourseFromDB = async (id: string) => {
  const offeredCourse = await OfferedCourse.findById(id);

  if (!offeredCourse) {
    throw new AppError(404, 'Offered Course not found');
  }

  return offeredCourse;
};
const getMyOfferedCourseFromDB = async (userId: string,query:Record<string,unknown>) => {
   const page = Number(query?.page) || 1;
   const limit = Number(query?.limit) || 10;
   const skip = (page - 1) * limit;

  const student = await Student.findOne({ id: userId });
  if (!student) {
    throw new AppError(403, 'Student not found');
  }
  const currentOngoingRegistrationSemester = await SemesterRegistration.findOne(
    {
      status: 'ONGOING',
    },
  );
 const aggregationQuery = [
   {
     $match: {
       semesterRegistration: currentOngoingRegistrationSemester?._id,
       academicFaculty: student.academicFaculty,
       academicDepartment: student.academicDepartment,
     },
   },
   {
     $lookup: {
       from: 'courses',
       localField: 'course',
       foreignField: '_id',
       as: 'course',
     },
   },
   {
     $unwind: '$course',
   },
   {
     $lookup: {
       from: 'enrolledcourses',
       let: {
         currentOngoingRegistrationSemester:
           currentOngoingRegistrationSemester?._id,
         currentStudent: student._id,
       },
       pipeline: [
         {
           $match: {
             $expr: {
               $and: [
                 {
                   $eq: [
                     '$semesterRegistration',
                     '$$currentOngoingRegistrationSemester',
                   ],
                 },
                 {
                   $eq: ['$student', '$$currentStudent'],
                 },
                 {
                   $eq: ['$isEnrolled', true],
                 },
               ],
             },
           },
         },
       ],
       as: 'enrolledCourses',
     },
   },
   {
     $lookup: {
       from: 'enrolledcourses',
       let: {
         currentStudent: student._id,
       },
       pipeline: [
         {
           $match: {
             $expr: {
               $and: [
                 {
                   $eq: ['$student', '$$currentStudent'],
                 },
                 {
                   $eq: ['$isCompleted', true],
                 },
               ],
             },
           },
         },
       ],
       as: 'completedCourses',
     },
   },
   {
     $addFields: {
       completedCourseIds: {
         $map: {
           input: '$completedCourses',
           as: 'completed',
           in: '$$completed.course',
         },
       },
     },
   },
   {
     $addFields: {
       isPreRequisitesFulFilled: {
         $or: [
           { $eq: ['$course.preRequisiteCourses', []] },
           {
             $setIsSubset: [
               '$course.preRequisiteCourses.course',
               '$completedCourseIds',
             ],
           },
         ],
       },

       isAlreadyEnrolled: {
         $in: [
           '$course._id',
           {
             $map: {
               input: '$enrolledCourses',
               as: 'enroll',
               in: '$$enroll.course',
             },
           },
         ],
       },
     },
   },
   {
     $match: {
       isAlreadyEnrolled: false,
       isPreRequisitesFulFilled: true,
     },
   },
 ];

 const paginationQuery = [
   {
     $skip: skip,
   },
   {
     $limit: limit,
   },
 ];

 const result = await OfferedCourse.aggregate([
   ...aggregationQuery,
   ...paginationQuery,
 ]);

 const total = (await OfferedCourse.aggregate(aggregationQuery)).length;

 const totalPage = Math.ceil(result.length / limit);

 return {
   meta: {
     page,
     limit,
     total,
     totalPage,
   },
   result,
 };
};

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>,
) => {
  const { faculty, days, startTime, endTime } = payload;

  const isOfferedCourseExists = await OfferedCourse.findById(id);

  if (!isOfferedCourseExists) {
    throw new AppError(404, 'Offered course not found !');
  }

  const isFacultyExists = await Faculty.findById(faculty);

  if (!isFacultyExists) {
    throw new AppError(404, 'Faculty not found !');
  }

  const semesterRegistration = isOfferedCourseExists.semesterRegistration;
  // get the schedules of the faculties

  // Checking the status of the semester registration
  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistration);

  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      403,
      `You can not update this offered course as it is ${semesterRegistrationStatus?.status}`,
    );
  }

  // check if the faculty is available at that time.
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      403,
      `This faculty is not available at that time ! Choose other time or day`,
    );
  }

  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteOfferedCourseFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const isOfferedCourseExists = await OfferedCourse.findById(id);

    if (!isOfferedCourseExists) {
      throw new AppError(404, 'Offered Course not found');
    }

    const semesterRegistration = isOfferedCourseExists.semesterRegistration;

    const semesterRegistrationStatus =
      await SemesterRegistration.findById(semesterRegistration).select(
        'status',
      );

    if (semesterRegistrationStatus?.status !== 'UPCOMING') {
      throw new AppError(
        404,
        `Offered course can not delete ! because the semester ${semesterRegistrationStatus}`,
      );
    }

    const result = await OfferedCourse.findByIdAndDelete(id);

    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCoursesFromDB,
  getSingleOfferedCourseFromDB,
  getMyOfferedCourseFromDB,
  deleteOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
};
