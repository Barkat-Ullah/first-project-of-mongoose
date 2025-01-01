import QueryBuilder from '../../builder/QueryBuilder';
import { AcademicFacultySearchableFields } from './academicFaculty.constant';
import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyIntoDb = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};
const getAllAcademicFacultiesIntoDb = async (
  query: Record<string, unknown>,
) => {
 const academicFacultyQuery = new QueryBuilder(AcademicFaculty.find(), query)
   .search(AcademicFacultySearchableFields)
   .filter()
   .sort()
   .paginate()
   .fields();

 const result = await academicFacultyQuery.modelQuery;
 const meta = await academicFacultyQuery.countTotal();

 return {
   meta,
   result,
 };
};

const getSingleAcademicFacultyIntoDb = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

const updateAcademicFacultyIntoDb = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDb,
  getAllAcademicFacultiesIntoDb,
  getSingleAcademicFacultyIntoDb,
  updateAcademicFacultyIntoDb,
};
