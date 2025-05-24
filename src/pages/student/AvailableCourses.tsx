import React from 'react';
import { BookOpen, Users, Calendar } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCourses } from '../../context/CourseContext';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { Student } from '../../types';

const AvailableCourses: React.FC = () => {
  const { currentUser } = useAuth();
  const student = currentUser as Student;
  const { getAvailableCourses, enrollStudent } = useCourses();
  
  const availableCourses = getAvailableCourses(student?.id || '');
  
  const handleEnroll = (courseId: string) => {
    enrollStudent(courseId, student.id);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Available Courses</h1>
      
      {availableCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableCourses.map((course) => (
            <div 
              key={course.id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{course.name}</h3>
                    <p className="text-sm text-gray-500">{course.courseId}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
                
                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{course.enrolledStudents.length} students enrolled</span>
                </div>
                
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => handleEnroll(course.id)}
                  className="transition-transform hover:scale-105"
                >
                  Enroll Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Card title="">
          <div className="py-12 flex flex-col items-center justify-center">
            <BookOpen className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">No Available Courses</h3>
            <p className="text-gray-500 text-center max-w-md">
              There are no courses available for enrollment at the moment. Check back later or contact your faculty advisor.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AvailableCourses;