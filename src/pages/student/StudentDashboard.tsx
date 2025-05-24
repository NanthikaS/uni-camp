import React from 'react';
import { PieChart, BarChartBig, BookOpen } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCourses } from '../../context/CourseContext';
import Card from '../../components/common/Card';
import { Student } from '../../types';

const StudentDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const student = currentUser as Student;
  const { getEnrolledCourses, getCourseAssignments } = useCourses();

  const enrolledCourses = getEnrolledCourses(student?.id || '');
  
  // Calculate overall attendance
  const calculateOverallAttendance = () => {
    if (!student?.attendance || Object.keys(student.attendance).length === 0) {
      return 0;
    }
    
    const totalAttendance = Object.values(student.attendance).reduce((sum, att) => sum + att, 0);
    return Math.round(totalAttendance / Object.values(student.attendance).length);
  };
  
  // Get total assignments across all enrolled courses
  const getTotalAssignments = () => {
    let total = 0;
    enrolledCourses.forEach(course => {
      const assignments = getCourseAssignments(course.id);
      total += assignments.length;
    });
    return total;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Student Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Attendance Summary Card */}
        <Card title="Attendance" className="transform transition-all hover:scale-105">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <PieChart className="h-8 w-8" />
            </div>
            <div>
              <div className="text-3xl font-bold">{calculateOverallAttendance()}%</div>
              <div className="text-sm text-gray-500">Overall Attendance</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${calculateOverallAttendance()}%` }}
              ></div>
            </div>
          </div>
        </Card>
        
        {/* Enrolled Courses Card */}
        <Card title="Enrolled Courses" className="transform transition-all hover:scale-105">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <BookOpen className="h-8 w-8" />
            </div>
            <div>
              <div className="text-3xl font-bold">{enrolledCourses.length}</div>
              <div className="text-sm text-gray-500">Active Courses</div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {enrolledCourses.slice(0, 2).map(course => (
              <div key={course.id} className="flex justify-between items-center">
                <span className="text-sm font-medium truncate">{course.name}</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  {course.courseId}
                </span>
              </div>
            ))}
            {enrolledCourses.length > 2 && (
              <div className="text-sm text-blue-600 font-medium">
                +{enrolledCourses.length - 2} more
              </div>
            )}
          </div>
        </Card>
        
        {/* Assignments Card */}
        <Card title="Assignments" className="transform transition-all hover:scale-105">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
              <BarChartBig className="h-8 w-8" />
            </div>
            <div>
              <div className="text-3xl font-bold">{getTotalAssignments()}</div>
              <div className="text-sm text-gray-500">Total Assignments</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-sm text-gray-600">
              {getTotalAssignments() === 0 ? (
                <p>No pending assignments</p>
              ) : (
                <p>You have assignments to complete</p>
              )}
            </div>
          </div>
        </Card>
      </div>
      
      {/* Recent Activity */}
      <Card title="Recent Activity">
        <div className="space-y-4">
          {enrolledCourses.length > 0 ? (
            <div className="relative">
              <div className="absolute left-3 inset-y-0 flex items-center">
                <div className="h-full w-0.5 bg-gray-200"></div>
              </div>
              
              {enrolledCourses.map((course, index) => (
                <div key={course.id} className="relative flex items-start pl-8 pb-4">
                  <div className="absolute left-0 mt-1">
                    <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-white text-xs">{index + 1}</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">{course.name} ({course.courseId})</p>
                    <p className="text-sm text-gray-500">Course enrollment successful</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-500">No recent activity to display</p>
              <p className="text-sm text-gray-400 mt-1">Enroll in courses to see your activity here</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default StudentDashboard;