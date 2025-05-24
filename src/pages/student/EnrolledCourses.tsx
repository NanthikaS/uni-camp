import React from 'react';
import { BookOpen, Users, Calendar, Award } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCourses } from '../../context/CourseContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Student } from '../../types';

const EnrolledCourses: React.FC = () => {
  const { currentUser } = useAuth();
  const student = currentUser as Student;
  const { getEnrolledCourses, getCourseAssignments, unenrollStudent } = useCourses();
  
  const enrolledCourses = getEnrolledCourses(student?.id || '');
  
  const handleUnenroll = (courseId: string) => {
    unenrollStudent(courseId, student.id);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Enrolled Courses</h1>
      
      {enrolledCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((course) => {
            const assignments = getCourseAssignments(course.id);
            const attendance = student?.attendance?.[course.courseId] || 0;
            
            return (
              <div 
                key={course.id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="bg-blue-600 p-4 text-white">
                  <h3 className="text-lg font-semibold">{course.name}</h3>
                  <p className="text-sm opacity-90">{course.courseId}</p>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-500">
                        <Award className="h-4 w-4 mr-1" />
                        <span>Attendance</span>
                      </div>
                      <div className="text-sm font-medium">
                        {attendance}%
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`rounded-full h-2 ${
                          attendance >= 85 ? 'bg-green-500' : 
                          attendance >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${attendance}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Assignments</span>
                      </div>
                      <div className="text-sm font-medium">
                        {assignments.length}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="h-4 w-4 mr-1" />
                        <span>Students</span>
                      </div>
                      <div className="text-sm font-medium">
                        {course.enrolledStudents.length}
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => handleUnenroll(course.id)}
                    className="transition-transform hover:scale-105"
                  >
                    Unenroll from Course
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Card title="">
          <div className="py-12 flex flex-col items-center justify-center">
            <BookOpen className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">No Enrolled Courses</h3>
            <p className="text-gray-500 text-center max-w-md">
              You haven't enrolled in any courses yet. Visit the Available Courses section to browse and enroll in courses.
            </p>
            <Button
              variant="primary"
              onClick={() => window.location.href = '/student/available-courses'}
              className="mt-4"
            >
              Browse Available Courses
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default EnrolledCourses;