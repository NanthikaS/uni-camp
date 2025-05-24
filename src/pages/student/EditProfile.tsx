import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import { Student } from '../../types';

const EditProfile: React.FC = () => {
  const { currentUser, updateUser } = useAuth();
  const student = currentUser as Student;
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<'basic' | 'education'>('basic');
  
  // Basic details form state
  const [basicDetails, setBasicDetails] = useState({
    dateOfBirth: student?.dateOfBirth || '',
    gender: student?.gender || '',
    fatherName: student?.fatherName || '',
    motherName: student?.motherName || '',
    firstGraduate: student?.firstGraduate || false,
    githubLink: student?.githubLink || '',
    linkedinLink: student?.linkedinLink || '',
    mobileNumber: student?.mobileNumber || '',
    profilePicture: student?.profilePicture || '',
  });
  
  // Education details form state
  const [educationDetails, setEducationDetails] = useState({
    tenth: {
      institutionName: student?.education?.tenth?.institutionName || '',
      startYear: student?.education?.tenth?.startYear || '',
      endYear: student?.education?.tenth?.endYear || '',
      percentage: student?.education?.tenth?.percentage || '',
    },
    twelfth: {
      institutionName: student?.education?.twelfth?.institutionName || '',
      startYear: student?.education?.twelfth?.startYear || '',
      endYear: student?.education?.twelfth?.endYear || '',
      percentage: student?.education?.twelfth?.percentage || '',
    },
    college: {
      institutionName: student?.education?.college?.institutionName || '',
      startYear: student?.education?.college?.startYear || '',
      expectedGraduationYear: student?.education?.college?.expectedGraduationYear || '',
      cgpa: student?.education?.college?.cgpa || '',
    },
  });
  
  // Handle basic details form change
  const handleBasicDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const isChecked = (e.target as HTMLInputElement).checked;
      setBasicDetails({ ...basicDetails, [name]: isChecked });
    } else if (type === 'radio') {
      const radioValue = value === 'yes';
      setBasicDetails({ ...basicDetails, [name]: radioValue });
    } else {
      setBasicDetails({ ...basicDetails, [name]: value });
    }
  };
  
  // Handle education details form change
  const handleEducationDetailsChange = (level: 'tenth' | 'twelfth' | 'college', field: string, value: string) => {
    setEducationDetails({
      ...educationDetails,
      [level]: {
        ...educationDetails[level],
        [field]: value,
      },
    });
  };
  
  // Handle profile picture change
  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setBasicDetails({
            ...basicDetails,
            profilePicture: event.target.result as string,
          });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update user with new details
    updateUser({
      ...basicDetails,
      education: educationDetails,
    });
    
    // Navigate back to profile
    navigate('/student/profile');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-800">Edit Profile</h2>
        </div>
        
        <div className="flex border-b">
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'basic'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('basic')}
          >
            Basic Details
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'education'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('education')}
          >
            Education Details
          </button>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            {activeTab === 'basic' ? (
              <div className="space-y-6">
                {/* Profile Picture */}
                <div className="flex flex-col items-center mb-6">
                  <div className="relative group">
                    {basicDetails.profilePicture ? (
                      <img
                        src={basicDetails.profilePicture}
                        alt={student?.name}
                        className="w-32 h-32 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No Image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 rounded-full bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <label
                        htmlFor="profile-picture"
                        className="text-white text-sm cursor-pointer"
                      >
                        Change Photo
                      </label>
                    </div>
                  </div>
                  <input
                    type="file"
                    id="profile-picture"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProfilePictureChange}
                  />
                  <label
                    htmlFor="profile-picture"
                    className="mt-2 text-sm text-blue-600 cursor-pointer"
                  >
                    Upload new image
                  </label>
                </div>
                
                {/* Non-editable fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <Input
                    label="Name"
                    value={student?.name}
                    disabled
                    fullWidth
                  />
                  <Input
                    label="Email"
                    value={student?.email}
                    disabled
                    fullWidth
                  />
                  <Input
                    label="Roll Number"
                    value={student?.rollNumber}
                    disabled
                    fullWidth
                  />
                  <Input
                    label="Department"
                    value={student?.department}
                    disabled
                    fullWidth
                  />
                </div>
                
                {/* Editable fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Mobile Number"
                    name="mobileNumber"
                    value={basicDetails.mobileNumber}
                    onChange={handleBasicDetailsChange}
                    fullWidth
                  />
                  
                  <div className="mb-4">
                    <label 
                      htmlFor="dateOfBirth" 
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={basicDetails.dateOfBirth}
                      onChange={handleBasicDetailsChange}
                      className="px-3 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full rounded-md sm:text-sm focus:ring-1"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label 
                      htmlFor="gender" 
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Gender
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={basicDetails.gender}
                      onChange={handleBasicDetailsChange}
                      className="px-3 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full rounded-md sm:text-sm focus:ring-1"
                    >
                      <option value="">Select Gender</option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                  
                  <Input
                    label="Father's Name"
                    name="fatherName"
                    value={basicDetails.fatherName}
                    onChange={handleBasicDetailsChange}
                    fullWidth
                  />
                  
                  <Input
                    label="Mother's Name"
                    name="motherName"
                    value={basicDetails.motherName}
                    onChange={handleBasicDetailsChange}
                    fullWidth
                  />
                  
                  <div className="mb-4">
                    <label 
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      First Graduate
                    </label>
                    <div className="flex space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="firstGraduate"
                          value="yes"
                          checked={basicDetails.firstGraduate === true}
                          onChange={handleBasicDetailsChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Yes</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="firstGraduate"
                          value="no"
                          checked={basicDetails.firstGraduate === false}
                          onChange={handleBasicDetailsChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">No</span>
                      </label>
                    </div>
                  </div>
                  
                  <Input
                    label="GitHub Link"
                    name="githubLink"
                    value={basicDetails.githubLink}
                    onChange={handleBasicDetailsChange}
                    fullWidth
                  />
                  
                  <Input
                    label="LinkedIn Link"
                    name="linkedinLink"
                    value={basicDetails.linkedinLink}
                    onChange={handleBasicDetailsChange}
                    fullWidth
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* 10th Education */}
                <div className="border-b pb-4 mb-4">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">10th Education</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Institution Name"
                      value={educationDetails.tenth.institutionName}
                      onChange={(e) => handleEducationDetailsChange('tenth', 'institutionName', e.target.value)}
                      fullWidth
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Start Year"
                        type="number"
                        value={educationDetails.tenth.startYear}
                        onChange={(e) => handleEducationDetailsChange('tenth', 'startYear', e.target.value)}
                        fullWidth
                      />
                      <Input
                        label="End Year"
                        type="number"
                        value={educationDetails.tenth.endYear}
                        onChange={(e) => handleEducationDetailsChange('tenth', 'endYear', e.target.value)}
                        fullWidth
                      />
                    </div>
                    <Input
                      label="Percentage"
                      value={educationDetails.tenth.percentage}
                      onChange={(e) => handleEducationDetailsChange('tenth', 'percentage', e.target.value)}
                      fullWidth
                    />
                  </div>
                </div>
                
                {/* 12th Education */}
                <div className="border-b pb-4 mb-4">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">12th Education</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Institution Name"
                      value={educationDetails.twelfth.institutionName}
                      onChange={(e) => handleEducationDetailsChange('twelfth', 'institutionName', e.target.value)}
                      fullWidth
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Start Year"
                        type="number"
                        value={educationDetails.twelfth.startYear}
                        onChange={(e) => handleEducationDetailsChange('twelfth', 'startYear', e.target.value)}
                        fullWidth
                      />
                      <Input
                        label="End Year"
                        type="number"
                        value={educationDetails.twelfth.endYear}
                        onChange={(e) => handleEducationDetailsChange('twelfth', 'endYear', e.target.value)}
                        fullWidth
                      />
                    </div>
                    <Input
                      label="Percentage"
                      value={educationDetails.twelfth.percentage}
                      onChange={(e) => handleEducationDetailsChange('twelfth', 'percentage', e.target.value)}
                      fullWidth
                    />
                  </div>
                </div>
                
                {/* College Education */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">College Education</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Institution Name"
                      value={educationDetails.college.institutionName}
                      onChange={(e) => handleEducationDetailsChange('college', 'institutionName', e.target.value)}
                      fullWidth
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Start Year"
                        type="number"
                        value={educationDetails.college.startYear}
                        onChange={(e) => handleEducationDetailsChange('college', 'startYear', e.target.value)}
                        fullWidth
                      />
                      <Input
                        label="Expected Graduation Year"
                        type="number"
                        value={educationDetails.college.expectedGraduationYear}
                        onChange={(e) => handleEducationDetailsChange('college', 'expectedGraduationYear', e.target.value)}
                        fullWidth
                      />
                    </div>
                    <Input
                      label="CGPA"
                      value={educationDetails.college.cgpa}
                      onChange={(e) => handleEducationDetailsChange('college', 'cgpa', e.target.value)}
                      fullWidth
                    />
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-8 flex justify-end space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/student/profile')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;