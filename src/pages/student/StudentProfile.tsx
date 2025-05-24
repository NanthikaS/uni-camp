import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Calendar, Award } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { Student } from '../../types';

const StudentProfile: React.FC = () => {
  const { currentUser } = useAuth();
  const student = currentUser as Student;
  const navigate = useNavigate();
  
  // Animation states
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card title="My Profile" className="mb-6">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div 
            className="w-32 h-32 mb-4 md:mb-0 md:mr-8 relative group"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {student?.profilePicture ? (
              <img
                src={student.profilePicture}
                alt={student.name}
                className={`w-32 h-32 rounded-full object-cover border-4 ${isHovering ? 'border-blue-500' : 'border-gray-200'} transition-all duration-300`}
              />
            ) : (
              <div className={`w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 ${isHovering ? 'border-blue-500' : 'border-gray-200'} transition-all duration-300`}>
                <User className="h-16 w-16 text-gray-400" />
              </div>
            )}
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{student?.name}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-600">{student?.email}</span>
              </div>
              
              <div className="flex items-center">
                <Award className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-600">{student?.rollNumber}</span>
              </div>
              
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-600">{student?.mobileNumber || 'Not provided'}</span>
              </div>
              
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-600">{student?.dateOfBirth || 'Not provided'}</span>
              </div>
            </div>
            
            <div className="mt-6 flex flex-col sm:flex-row justify-center md:justify-start space-y-3 sm:space-y-0 sm:space-x-3">
              <Button
                variant="primary"
                onClick={() => navigate('/student/profile/edit')}
                className="transition-transform hover:scale-105"
              >
                Edit Profile
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/student/profile/view')}
                className="transition-transform hover:scale-105"
              >
                View Profile
              </Button>
            </div>
          </div>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Department Information">
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Department</h4>
              <p className="text-gray-800">{student?.department}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Year</h4>
              <p className="text-gray-800">{student?.year}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">First Graduate</h4>
              <p className="text-gray-800">{student?.firstGraduate ? 'Yes' : 'No'}</p>
            </div>
          </div>
        </Card>
        
        <Card title="Course Information">
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Enrolled Courses</h4>
              <p className="text-gray-800">{student?.enrolledCourses.length || 0} courses</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Average Attendance</h4>
              <p className="text-gray-800">
                {student?.attendance && Object.keys(student.attendance).length > 0
                  ? `${Math.round(
                      Object.values(student.attendance).reduce((sum, att) => sum + att, 0) /
                        Object.values(student.attendance).length
                    )}%`
                  : 'No data'}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StudentProfile;