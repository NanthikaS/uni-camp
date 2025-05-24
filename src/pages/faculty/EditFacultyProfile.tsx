import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import { Faculty, WorkExperience } from '../../types';

const EditFacultyProfile: React.FC = () => {
  const { currentUser, updateUser } = useAuth();
  const faculty = currentUser as Faculty;
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<'basic' | 'experience'>('basic');
  
  // Basic details form state
  const [basicDetails, setBasicDetails] = useState({
    dateOfBirth: faculty?.dateOfBirth || '',
    gender: faculty?.gender || '',
    mobileNumber: faculty?.mobileNumber || '',
    profilePicture: faculty?.profilePicture || '',
  });
  
  // Work experience form state
  const [workExperience, setWorkExperience] = useState<WorkExperience[]>(
    faculty?.workExperience || []
  );
  
  // New experience form state
  const [newExperience, setNewExperience] = useState({
    organizationName: '',
    position: '',
    startYear: '',
    endYear: '',
  });
  
  // Handle basic details form change
  const handleBasicDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBasicDetails({ ...basicDetails, [name]: value });
  };
  
  // Handle new experience form change
  const handleNewExperienceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewExperience({ ...newExperience, [name]: value });
  };
  
  // Add new experience
  const addExperience = () => {
    if (
      !newExperience.organizationName ||
      !newExperience.position ||
      !newExperience.startYear ||
      !newExperience.endYear
    ) {
      return; // Don't add if any field is empty
    }
    
    const newExp: WorkExperience = {
      id: `we${Date.now()}`,
      ...newExperience,
    };
    
    setWorkExperience([...workExperience, newExp]);
    setNewExperience({
      organizationName: '',
      position: '',
      startYear: '',
      endYear: '',
    });
  };
  
  // Remove experience
  const removeExperience = (id: string) => {
    setWorkExperience(workExperience.filter((exp) => exp.id !== id));
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
      workExperience,
    });
    
    // Navigate back to profile
    navigate('/faculty/profile');
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
                ? 'border-b-2 border-green-500 text-green-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('basic')}
          >
            Basic Details
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'experience'
                ? 'border-b-2 border-green-500 text-green-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('experience')}
          >
            Work Experience
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
                        alt={faculty?.name}
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
                    className="mt-2 text-sm text-green-600 cursor-pointer"
                  >
                    Upload new image
                  </label>
                </div>
                
                {/* Non-editable fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <Input
                    label="Name"
                    value={faculty?.name}
                    disabled
                    fullWidth
                  />
                  <Input
                    label="Email"
                    value={faculty?.email}
                    disabled
                    fullWidth
                  />
                  <Input
                    label="Faculty ID"
                    value={faculty?.facultyId}
                    disabled
                    fullWidth
                  />
                  <Input
                    label="Department"
                    value={faculty?.department}
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
                      className="px-3 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-green-500 block w-full rounded-md sm:text-sm focus:ring-1"
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
                      className="px-3 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-green-500 block w-full rounded-md sm:text-sm focus:ring-1"
                    >
                      <option value="">Select Gender</option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Work Experience List */}
                <div className="space-y-4 mb-8">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Work Experience</h3>
                  
                  {workExperience.length > 0 ? (
                    workExperience.map((exp) => (
                      <div key={exp.id} className="bg-gray-50 p-4 rounded-md relative">
                        <button
                          type="button"
                          onClick={() => removeExperience(exp.id)}
                          className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Organization Name</h4>
                            <p className="text-gray-800">{exp.organizationName}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Position</h4>
                            <p className="text-gray-800">{exp.position}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Start Year</h4>
                            <p className="text-gray-800">{exp.startYear}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">End Year</h4>
                            <p className="text-gray-800">{exp.endYear}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">No work experience added yet.</p>
                  )}
                </div>
                
                {/* Add New Experience Form */}
                <Card title="Add Experience">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Organization Name"
                      name="organizationName"
                      value={newExperience.organizationName}
                      onChange={handleNewExperienceChange}
                      fullWidth
                    />
                    
                    <Input
                      label="Position"
                      name="position"
                      value={newExperience.position}
                      onChange={handleNewExperienceChange}
                      fullWidth
                    />
                    
                    <Input
                      label="Start Year"
                      name="startYear"
                      type="number"
                      value={newExperience.startYear}
                      onChange={handleNewExperienceChange}
                      fullWidth
                    />
                    
                    <Input
                      label="End Year"
                      name="endYear"
                      value={newExperience.endYear}
                      onChange={handleNewExperienceChange}
                      placeholder="Enter 'Present' if current"
                      fullWidth
                    />
                  </div>
                  
                  <div className="mt-4">
                    <Button
                      type="button"
                      variant="success"
                      onClick={addExperience}
                    >
                      Add Experience
                    </Button>
                  </div>
                </Card>
              </div>
            )}
            
            <div className="mt-8 flex justify-end space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/faculty/profile')}
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

export default EditFacultyProfile;