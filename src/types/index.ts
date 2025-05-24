// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
  profilePicture?: string;
}

export interface Student extends User {
  role: 'student';
  rollNumber: string;
  department: string;
  year: string;
  mobileNumber: string;
  dateOfBirth?: string;
  gender?: 'Female' | 'Male' | 'Others';
  fatherName?: string;
  motherName?: string;
  firstGraduate?: boolean;
  githubLink?: string;
  linkedinLink?: string;
  enrolledCourses: string[];
  attendance: Record<string, number>;
  education?: {
    tenth?: EducationDetail;
    twelfth?: EducationDetail;
    college?: CollegeEducationDetail;
  };
}

export interface EducationDetail {
  institutionName: string;
  startYear: string;
  endYear: string;
  percentage: string;
}

export interface CollegeEducationDetail {
  institutionName: string;
  startYear: string;
  expectedGraduationYear: string;
  cgpa: string;
}

export interface Faculty extends User {
  role: 'faculty';
  facultyId: string;
  department: string;
  dateOfBirth?: string;
  gender?: 'Female' | 'Male' | 'Others';
  mobileNumber?: string;
  workExperience?: WorkExperience[];
  courses: string[];
  assignedStudents: string[];
}

export interface WorkExperience {
  id: string;
  organizationName: string;
  position: string;
  startYear: string;
  endYear: string;
}

export interface Admin extends User {
  role: 'admin';
}

// Course Types
export interface Course {
  id: string;
  name: string;
  courseId: string;
  description: string;
  facultyId?: string;
  enrolledStudents: string[];
}

// Assignment Types
export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: string;
  createdAt: string;
}