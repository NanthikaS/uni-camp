import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Calendar, Award, Briefcase } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { Faculty } from '../../types';

const FacultyProfile: React.FC = () => {
  const { currentUser } = useAuth();
  const faculty = currentUser as Faculty;
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
            {faculty?.profilePicture ? (
              <img
                src={faculty.profilePicture}
                alt={faculty.name}
                className={`w-32 h-32 rounded-full object-cover border-4 ${isHovering ? 'border-green-500' : 'border-gray-200'} transition-all duration-300`}
              />
            ) : (
              <div className={`w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 ${isHovering ? 'border-green-500' : 'border-gray-200'} transition-all duration-300`}>
                <User className="h-16 w-16 text-gray-400" />
              </div>
            )}
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{faculty?.name}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-600">{faculty?.email}</span>
              </div>
              
              <div className="flex items-center">
                <Award className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-600">{faculty?.facultyId}</span>
              </div>
              
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-600">{faculty?.mobileNumber || 'Not provided'}</span>
              </div>
              
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-600">{faculty?.dateOfBirth || 'Not provided'}</span>
              </div>
            </div>
            
            <div className="mt-6 flex flex-col sm:flex-row justify-center md:justify-start space-y-3 sm:space-y-0 sm:space-x-3">
              <Button
                variant="primary"
                onClick={() => navigate('/faculty/profile/edit')}
                className="transition-transform hover:scale-105"
              >
                Edit Profile
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/faculty/profile/view')}
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
              <p className="text-gray-800">{faculty?.department}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Gender</h4>
              <p className="text-gray-800">{faculty?.gender || 'Not provided'}</p>
            </div>
          </div>
        </Card>
        
        <Card title="Course Information">
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Courses</h4>
              <p className="text-gray-800">{faculty?.courses.length || 0} courses</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Assigned Students</h4>
              <p className="text-gray-800">{faculty?.assignedStudents.length || 0} students</p>
            </div>
          </div>
        </Card>
      </div>
      
      <Card title="Work Experience" className="mt-6">
        {faculty?.workExperience && faculty.workExperience.length > 0 ? (
          <div className="space-y-6">
            {faculty.workExperience.map((exp) => (
              <div key={exp.id} className="flex">
                <div className="mr-4">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Briefcase className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-800">{exp.position}</h4>
                  <p className="text-gray-600">{exp.organizationName}</p>
                  <p className="text-sm text-gray-500">{exp.startYear} - {exp.endYear}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No work experience has been added yet.</p>
        )}
      </Card>
    </div>
  );
};

export default FacultyProfile;