import React, { useState } from 'react';
import { Trash2, Edit, Eye, Plus, Upload } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import { mockFaculty } from '../../data/mockData';
import { Faculty } from '../../types';

const AdminFaculty: React.FC = () => {
  const [faculty, setFaculty] = useState<Faculty[]>(mockFaculty);
  const [isAddingFaculty, setIsAddingFaculty] = useState(false);
  const [isUploadingCSV, setIsUploadingCSV] = useState(false);
  
  // New faculty form state
  const [newFaculty, setNewFaculty] = useState({
    name: '',
    email: '',
    facultyId: '',
    department: '',
    mobileNumber: '',
  });
  
  // CSV upload state
  const [csvData, setCsvData] = useState<string>('');
  
  // Handle new faculty form change
  const handleNewFacultyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewFaculty({ ...newFaculty, [name]: value });
  };
  
  // Handle add faculty form submission
  const handleAddFaculty = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newFaculty.name || !newFaculty.email || !newFaculty.facultyId || !newFaculty.department) {
      return;
    }
    
    const newFacultyMember: Faculty = {
      id: `f${Date.now()}`,
      name: newFaculty.name,
      email: newFaculty.email,
      role: 'faculty',
      facultyId: newFaculty.facultyId,
      department: newFaculty.department,
      mobileNumber: newFaculty.mobileNumber,
      courses: [],
      assignedStudents: [],
    };
    
    setFaculty([...faculty, newFacultyMember]);
    setNewFaculty({
      name: '',
      email: '',
      facultyId: '',
      department: '',
      mobileNumber: '',
    });
    
    setIsAddingFaculty(false);
  };
  
  // Handle CSV file upload
  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setCsvData(event.target.result as string);
      }
    };
    reader.readAsText(file);
  };
  
  // Parse CSV data and add faculty
  const handleProcessCsv = () => {
    if (!csvData) return;
    
    // Simple CSV parsing (header row + data rows)
    const rows = csvData.split('\n');
    if (rows.length < 2) return;
    
    const headers = rows[0].split(',');
    const nameIndex = headers.indexOf('name');
    const emailIndex = headers.indexOf('email');
    const facultyIdIndex = headers.indexOf('facultyId');
    const departmentIndex = headers.indexOf('department');
    const mobileNumberIndex = headers.indexOf('mobileNumber');
    
    if (nameIndex === -1 || emailIndex === -1 || facultyIdIndex === -1 || departmentIndex === -1) {
      alert('CSV must contain name, email, facultyId, and department columns');
      return;
    }
    
    const newFacultyMembers: Faculty[] = [];
    
    for (let i = 1; i < rows.length; i++) {
      if (!rows[i].trim()) continue;
      
      const columns = rows[i].split(',');
      
      const newFacultyMember: Faculty = {
        id: `f${Date.now() + i}`,
        name: columns[nameIndex],
        email: columns[emailIndex],
        role: 'faculty',
        facultyId: columns[facultyIdIndex],
        department: columns[departmentIndex],
        mobileNumber: mobileNumberIndex !== -1 ? columns[mobileNumberIndex] : '',
        courses: [],
        assignedStudents: [],
      };
      
      newFacultyMembers.push(newFacultyMember);
    }
    
    setFaculty([...faculty, ...newFacultyMembers]);
    setCsvData('');
    setIsUploadingCSV(false);
  };
  
  // Delete faculty
  const handleDeleteFaculty = (id: string) => {
    setFaculty(faculty.filter((f) => f.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Faculty Management</h1>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={() => setIsUploadingCSV(true)}
            className="flex items-center"
          >
            <Upload className="h-5 w-5 mr-1" />
            Upload CSV
          </Button>
          <Button
            variant="primary"
            onClick={() => setIsAddingFaculty(true)}
            className="flex items-center"
          >
            <Plus className="h-5 w-5 mr-1" />
            Add Faculty
          </Button>
        </div>
      </div>
      
      {/* Add Faculty Form */}
      {isAddingFaculty && (
        <Card title="Add New Faculty" className="mb-6">
          <form onSubmit={handleAddFaculty}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input
                label="Faculty Name"
                name="name"
                value={newFaculty.name}
                onChange={handleNewFacultyChange}
                required
                fullWidth
              />
              
              <Input
                label="Email ID"
                name="email"
                type="email"
                value={newFaculty.email}
                onChange={handleNewFacultyChange}
                required
                fullWidth
              />
              
              <Input
                label="Faculty ID"
                name="facultyId"
                value={newFaculty.facultyId}
                onChange={handleNewFacultyChange}
                required
                fullWidth
              />
              
              <div className="mb-4">
                <label 
                  htmlFor="department" 
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Department
                </label>
                <select
                  id="department"
                  name="department"
                  value={newFaculty.department}
                  onChange={handleNewFacultyChange}
                  className="px-3 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-purple-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  required
                >
                  <option value="">Select Department</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Physics">Physics</option>
                  <option value="Mathematics">Mathematics</option>
                </select>
              </div>
              
              <Input
                label="Mobile Number"
                name="mobileNumber"
                value={newFaculty.mobileNumber}
                onChange={handleNewFacultyChange}
                fullWidth
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddingFaculty(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="success"
              >
                Save Faculty
              </Button>
            </div>
          </form>
        </Card>
      )}
      
      {/* CSV Upload Form */}
      {isUploadingCSV && (
        <Card title="Upload Faculty CSV" className="mb-6">
          <p className="text-gray-600 mb-4">
            Upload a CSV file with the following columns: name, email, facultyId, department, and optionally mobileNumber.
          </p>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CSV File
            </label>
            <input
              type="file"
              accept=".csv"
              onChange={handleCsvUpload}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-medium
                file:bg-purple-50 file:text-purple-700
                hover:file:bg-purple-100
              "
            />
          </div>
          
          {csvData && (
            <div className="mb-4 p-4 bg-gray-50 rounded-md">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Preview:</h3>
              <pre className="text-xs text-gray-600 overflow-x-auto max-h-40">
                {csvData.slice(0, 500)}
                {csvData.length > 500 && '...'}
              </pre>
            </div>
          )}
          
          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsUploadingCSV(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="success"
              onClick={handleProcessCsv}
              disabled={!csvData}
            >
              Process CSV
            </Button>
          </div>
        </Card>
      )}
      
      {/* Faculty List */}
      <Card title="Faculty List">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Faculty ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {faculty.map((facultyMember) => (
                <tr key={facultyMember.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {facultyMember.profilePicture ? (
                        <img 
                          src={facultyMember.profilePicture} 
                          alt={facultyMember.name}
                          className="h-10 w-10 rounded-full object-cover mr-3"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                          <span className="text-purple-600 font-medium">
                            {facultyMember.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div className="text-sm font-medium text-gray-900">
                        {facultyMember.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{facultyMember.facultyId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{facultyMember.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{facultyMember.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        title="View"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        className="text-green-600 hover:text-green-900"
                        title="Edit"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                        onClick={() => handleDeleteFaculty(facultyMember.id)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AdminFaculty;