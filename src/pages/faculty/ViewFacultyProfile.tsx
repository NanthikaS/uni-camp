import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Calendar, MapPin, Briefcase } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { Faculty } from '../../types';

const ViewFacultyProfile: React.FC = () => {
  const { currentUser } = useAuth();
  const faculty = currentUser as Faculty;
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Basic Info */}
      <Card title="Personal Information" className="mb-6">
        <div className="flex flex-col md:flex-row">
          <div className="flex justify-center md:justify-start mb-6 md:mb-0 md:mr-8">
            {faculty?.profilePicture ? (
              <img
                src={faculty.profilePicture}
                alt={faculty.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="h-16 w-16 text-gray-400" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center md:text-left">{faculty?.name}</h2>
            <p className="text-gray-600 mb-4 text-center md:text-left">{faculty?.department}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-600">{faculty?.email}</span>
              </div>
              
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-600">{faculty?.mobileNumber || 'Not provided'}</span>
              </div>
              
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-600">{faculty?.dateOfBirth || 'Not provided'}</span>
              </div>
              
              <div className="flex items-center">
                <User className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-600">{faculty?.gender || 'Not provided'}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Faculty Information */}
      <Card title="Faculty Information" className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Courses</h3>
            {faculty?.courses.length ? (
              <ul className="space-y-2">
                {faculty.courses.map((courseId, index) => (
                  <li key={index} className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    <span>{courseId}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No courses assigned</p>
            )}
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Assigned Students</h3>
            <p className="text-gray-700">{faculty?.assignedStudents.length} students</p>
          </div>
        </div>
      </Card>
      
      {/* Work Experience */}
      <Card title="Work Experience">
        {faculty?.workExperience && faculty.workExperience.length > 0 ? (
          <div className="space-y-6">
            {faculty.workExperience.map((exp, index) => (
              <div key={exp.id} className="relative pl-8 pb-6">
                {index < faculty.workExperience.length - 1 && (
                  <div className="absolute top-0 left-[0.9375rem] h-full w-px bg-gray-200"></div>
                )}
                <div className="absolute top-0 left-0">
                  <div className="h-7 w-7 rounded-full bg-green-500 flex items-center justify-center">
                    <Briefcase className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-800">{exp.position}</h4>
                  <p className="text-gray-600">{exp.organizationName}</p>
                  <p className="text-sm text-gray-500 mt-1">{exp.startYear} - {exp.endYear}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No work experience has been added yet.</p>
        )}
      </Card>
      
      <div className="flex justify-center mt-6">
        <Button
          variant="primary"
          onClick={() => navigate('/faculty/profile/edit')}
          className="transition-transform hover:scale-105"
        >
          Edit Profile
        </Button>
      </div>
    </div>
  );
};

export default ViewFacultyProfile;