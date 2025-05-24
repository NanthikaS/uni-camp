import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Calendar, MapPin, Github, Linkedin, GraduationCap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { Student } from '../../types';

const ViewProfile: React.FC = () => {
  const { currentUser } = useAuth();
  const student = currentUser as Student;
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Basic Info */}
      <Card title="Personal Information" className="mb-6">
        <div className="flex flex-col md:flex-row">
          <div className="flex justify-center md:justify-start mb-6 md:mb-0 md:mr-8">
            {student?.profilePicture ? (
              <img
                src={student.profilePicture}
                alt={student.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="h-16 w-16 text-gray-400" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center md:text-left">{student?.name}</h2>
            <p className="text-gray-600 mb-4 text-center md:text-left">{student?.department} - {student?.year}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-600">{student?.email}</span>
              </div>
              
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-600">{student?.mobileNumber || 'Not provided'}</span>
              </div>
              
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-600">{student?.dateOfBirth || 'Not provided'}</span>
              </div>
              
              <div className="flex items-center">
                <User className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-600">{student?.gender || 'Not provided'}</span>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-y-3">
              {student?.fatherName && (
                <div>
                  <span className="text-sm font-medium text-gray-500">Father's Name</span>
                  <p>{student.fatherName}</p>
                </div>
              )}
              
              {student?.motherName && (
                <div>
                  <span className="text-sm font-medium text-gray-500">Mother's Name</span>
                  <p>{student.motherName}</p>
                </div>
              )}
              
              <div>
                <span className="text-sm font-medium text-gray-500">First Graduate</span>
                <p>{student?.firstGraduate ? 'Yes' : 'No'}</p>
              </div>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-3">
              {student?.githubLink && (
                <a
                  href={student.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-gray-600 hover:text-blue-600"
                >
                  <Github className="h-4 w-4 mr-1" />
                  GitHub Profile
                </a>
              )}
              
              {student?.linkedinLink && (
                <a
                  href={student.linkedinLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-gray-600 hover:text-blue-600"
                >
                  <Linkedin className="h-4 w-4 mr-1" />
                  LinkedIn Profile
                </a>
              )}
            </div>
          </div>
        </div>
      </Card>
      
      {/* Education Information */}
      <Card title="Education Information" className="mb-6">
        <div className="space-y-6">
          {/* 10th Education */}
          {student?.education?.tenth && (
            <div className="border-b pb-4">
              <div className="flex items-center mb-2">
                <GraduationCap className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="text-lg font-medium text-gray-800">10th Standard</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Institution Name</span>
                  <p>{student.education.tenth.institutionName}</p>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-gray-500">Duration</span>
                  <p>{student.education.tenth.startYear} - {student.education.tenth.endYear}</p>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-gray-500">Percentage</span>
                  <p>{student.education.tenth.percentage}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* 12th Education */}
          {student?.education?.twelfth && (
            <div className="border-b pb-4">
              <div className="flex items-center mb-2">
                <GraduationCap className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="text-lg font-medium text-gray-800">12th Standard</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Institution Name</span>
                  <p>{student.education.twelfth.institutionName}</p>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-gray-500">Duration</span>
                  <p>{student.education.twelfth.startYear} - {student.education.twelfth.endYear}</p>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-gray-500">Percentage</span>
                  <p>{student.education.twelfth.percentage}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* College Education */}
          {student?.education?.college && (
            <div>
              <div className="flex items-center mb-2">
                <GraduationCap className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="text-lg font-medium text-gray-800">College Education</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Institution Name</span>
                  <p>{student.education.college.institutionName}</p>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-gray-500">Duration</span>
                  <p>{student.education.college.startYear} - {student.education.college.expectedGraduationYear} (Expected)</p>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-gray-500">CGPA</span>
                  <p>{student.education.college.cgpa}</p>
                </div>
              </div>
            </div>
          )}
          
          {!student?.education?.tenth && !student?.education?.twelfth && !student?.education?.college && (
            <p className="text-gray-500 text-center py-4">No education details have been added yet.</p>
          )}
        </div>
      </Card>
      
      <div className="flex justify-center">
        <Button
          variant="primary"
          onClick={() => navigate('/student/profile/edit')}
          className="transition-transform hover:scale-105"
        >
          Edit Profile
        </Button>
      </div>
    </div>
  );
};

export default ViewProfile;