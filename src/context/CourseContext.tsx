import React, { createContext, useState, useContext, useEffect } from 'react';
import { Course, Assignment } from '../types';
import { mockCourses, mockAssignments } from '../data/mockData';
import { useAuth } from './AuthContext';
import { toast } from 'react-hot-toast';

interface CourseContextType {
  courses: Course[];
  assignments: Assignment[];
  addCourse: (course: Omit<Course, 'id' | 'enrolledStudents'>) => void;
  updateCourse: (courseId: string, courseData: Partial<Course>) => void;
  deleteCourse: (courseId: string) => void;
  enrollStudent: (courseId: string, studentId: string) => void;
  unenrollStudent: (courseId: string, studentId: string) => void;
  assignFaculty: (courseId: string, facultyId: string) => void;
  getAvailableCourses: (studentId: string) => Course[];
  getEnrolledCourses: (studentId: string) => Course[];
  getFacultyCourses: (facultyId: string) => Course[];
  getStudentsByCourse: (courseId: string) => string[];
  getCourseById: (courseId: string) => Course | undefined;
  addAssignment: (assignment: Omit<Assignment, 'id' | 'createdAt'>) => void;
  updateAssignment: (assignmentId: string, assignmentData: Partial<Assignment>) => void;
  deleteAssignment: (assignmentId: string) => void;
  getCourseAssignments: (courseId: string) => Assignment[];
}

const CourseContext = createContext<CourseContextType>({
  courses: [],
  assignments: [],
  addCourse: () => {},
  updateCourse: () => {},
  deleteCourse: () => {},
  enrollStudent: () => {},
  unenrollStudent: () => {},
  assignFaculty: () => {},
  getAvailableCourses: () => [],
  getEnrolledCourses: () => [],
  getFacultyCourses: () => [],
  getStudentsByCourse: () => [],
  getCourseById: () => undefined,
  addAssignment: () => {},
  updateAssignment: () => {},
  deleteAssignment: () => {},
  getCourseAssignments: () => [],
});

export const useCourses = () => useContext(CourseContext);

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const { currentUser } = useAuth();

  // Load courses and assignments from localStorage or use mock data
  useEffect(() => {
    const storedCourses = localStorage.getItem('courses');
    const storedAssignments = localStorage.getItem('assignments');
    
    if (storedCourses) {
      setCourses(JSON.parse(storedCourses));
    } else {
      setCourses(mockCourses);
    }
    
    if (storedAssignments) {
      setAssignments(JSON.parse(storedAssignments));
    } else {
      setAssignments(mockAssignments);
    }
  }, []);

  // Save to localStorage when courses or assignments change
  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('assignments', JSON.stringify(assignments));
  }, [assignments]);

  const addCourse = (course: Omit<Course, 'id' | 'enrolledStudents'>) => {
    const newCourse: Course = {
      ...course,
      id: `c${Date.now()}`,
      enrolledStudents: [],
    };
    setCourses([...courses, newCourse]);
    toast.success('Course added successfully!');
  };

  const updateCourse = (courseId: string, courseData: Partial<Course>) => {
    setCourses(
      courses.map((course) =>
        course.id === courseId ? { ...course, ...courseData } : course
      )
    );
    toast.success('Course updated successfully!');
  };

  const deleteCourse = (courseId: string) => {
    setCourses(courses.filter((course) => course.id !== courseId));
    toast.success('Course deleted successfully!');
  };

  const enrollStudent = (courseId: string, studentId: string) => {
    setCourses(
      courses.map((course) => {
        if (course.id === courseId && !course.enrolledStudents.includes(studentId)) {
          return {
            ...course,
            enrolledStudents: [...course.enrolledStudents, studentId],
          };
        }
        return course;
      })
    );
    toast.success('Enrolled in course successfully!');
  };

  const unenrollStudent = (courseId: string, studentId: string) => {
    setCourses(
      courses.map((course) => {
        if (course.id === courseId) {
          return {
            ...course,
            enrolledStudents: course.enrolledStudents.filter((id) => id !== studentId),
          };
        }
        return course;
      })
    );
    toast.success('Unenrolled from course successfully!');
  };

  const assignFaculty = (courseId: string, facultyId: string) => {
    setCourses(
      courses.map((course) =>
        course.id === courseId ? { ...course, facultyId } : course
      )
    );
    toast.success('Faculty assigned to course successfully!');
  };

  const getAvailableCourses = (studentId: string) => {
    return courses.filter((course) => !course.enrolledStudents.includes(studentId));
  };

  const getEnrolledCourses = (studentId: string) => {
    return courses.filter((course) => course.enrolledStudents.includes(studentId));
  };

  const getFacultyCourses = (facultyId: string) => {
    return courses.filter((course) => course.facultyId === facultyId);
  };

  const getStudentsByCourse = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    return course ? course.enrolledStudents : [];
  };

  const getCourseById = (courseId: string) => {
    return courses.find((course) => course.id === courseId);
  };

  const addAssignment = (assignment: Omit<Assignment, 'id' | 'createdAt'>) => {
    const newAssignment: Assignment = {
      ...assignment,
      id: `a${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setAssignments([...assignments, newAssignment]);
    toast.success('Assignment added successfully!');
  };

  const updateAssignment = (assignmentId: string, assignmentData: Partial<Assignment>) => {
    setAssignments(
      assignments.map((assignment) =>
        assignment.id === assignmentId
          ? { ...assignment, ...assignmentData }
          : assignment
      )
    );
    toast.success('Assignment updated successfully!');
  };

  const deleteAssignment = (assignmentId: string) => {
    setAssignments(assignments.filter((assignment) => assignment.id !== assignmentId));
    toast.success('Assignment deleted successfully!');
  };

  const getCourseAssignments = (courseId: string) => {
    return assignments.filter((assignment) => assignment.courseId === courseId);
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        assignments,
        addCourse,
        updateCourse,
        deleteCourse,
        enrollStudent,
        unenrollStudent,
        assignFaculty,
        getAvailableCourses,
        getEnrolledCourses,
        getFacultyCourses,
        getStudentsByCourse,
        getCourseById,
        addAssignment,
        updateAssignment,
        deleteAssignment,
        getCourseAssignments,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};