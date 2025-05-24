import React from 'react';
import { Users, BookOpen, CheckSquare } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCourses } from '../../context/CourseContext';
import Card from '../../components/common/Card';
import { Faculty } from '../../types';
import { mockStudents } from '../../data/mockData';

const FacultyDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const faculty = currentUser as Faculty;
  const { getFacultyCourses, getCourseAssignments } = useCourses();
  
  const facultyCourses = getFacultyCourses(faculty?.id || '');
  
  // Get total students assigned to faculty
  const totalAssignedStudents = faculty?.assignedStudents?.length || 0;
  
  // Get total students enrolled in faculty's courses
  const totalEnrolledStudents = facultyCourses.reduce(
    (total, course) => total + course.enrolledStudents.length,
    0
  );
  
  // Get total assignments across all courses
  const totalAssignments = facultyCourses.reduce(
    (total, course) => total + getCourseAssignments(course.id).length,
    0
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Faculty Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Courses Card */}
        <Card title="Courses" className="transform transition-all hover:scale-105">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <BookOpen className="h-8 w-8" />
            </div>
            <div>
              <div className="text-3xl font-bold">{facultyCourses.length}</div>
              <div className="text-sm text-gray-500">Active Courses</div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {facultyCourses.slice(0, 2).map(course => (
              <div key={course.id} className="flex justify-between items-center">
                <span className="text-sm font-medium truncate">{course.name}</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {course.courseId}
                </span>
              </div>
            ))}
            {facultyCourses.length > 2 && (
              <div className="text-sm text-blue-600 font-medium">
                +{facultyCourses.length - 2} more
              </div>
            )}
          </div>
        </Card>
        
        {/* Students Card */}
        <Card title="Students" className="transform transition-all hover:scale-105">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <Users className="h-8 w-8" />
            </div>
            <div>
              <div className="text-3xl font-bold">{totalEnrolledStudents}</div>
              <div className="text-sm text-gray-500">Enrolled Students</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Assigned Students</span>
              <span className="text-sm font-bold">{totalAssignedStudents}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-green-600 h-2.5 rounded-full" 
                style={{ width: totalAssignedStudents > 0 ? `${(totalAssignedStudents / totalEnrolledStudents) * 100}%` : '0%' }}
              ></div>
            </div>
          </div>
        </Card>
        
        {/* Assignments Card */}
        <Card title="Assignments" className="transform transition-all hover:scale-105">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
              <CheckSquare className="h-8 w-8" />
            </div>
            <div>
              <div className="text-3xl font-bold">{totalAssignments}</div>
              <div className="text-sm text-gray-500">Total Assignments</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-sm text-gray-600">
              {totalAssignments === 0 ? (
                <p>No assignments created yet</p>
              ) : (
                <p>Across {facultyCourses.length} courses</p>
              )}
            </div>
          </div>
        </Card>
      </div>
      
      {/* Course Enrollment Overview */}
      <Card title="Course Enrollment Overview">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Students Enrolled
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assignments
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {facultyCourses.length > 0 ? (
                facultyCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{course.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{course.courseId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{course.enrolledStudents.length}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{getCourseAssignments(course.id).length}</div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                    No courses available. Add a course to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default FacultyDashboard;