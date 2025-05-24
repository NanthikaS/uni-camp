import React, { useState } from 'react';
import { Trash2, Edit, Eye, Plus, Upload } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import { mockStudents } from '../../data/mockData';
import { Student } from '../../types';

const AdminStudents: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [isUploadingCSV, setIsUploadingCSV] = useState(false);
  
  // New student form state
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    rollNumber: '',
    department: '',
    year: '',
    mobileNumber: '',
  });
  
  // CSV upload state
  const [csvData, setCsvData] = useState<string>('');
  
  // Handle new student form change
  const handleNewStudentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };
  
  // Handle add student form submission
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (
      !newStudent.name ||
      !newStudent.email ||
      !newStudent.rollNumber ||
      !newStudent.department ||
      !newStudent.year ||
      !newStudent.mobileNumber
    ) {
      return;
    }
    
    const newStudentEntry: Student = {
      id: `s${Date.now()}`,
      name: newStudent.name,
      email: newStudent.email,
      role: 'student',
      rollNumber: newStudent.rollNumber,
      department: newStudent.department,
      year: newStudent.year,
      mobileNumber: newStudent.mobileNumber,
      enrolledCourses: [],
      attendance: {},
    };
    
    setStudents([...students, newStudentEntry]);
    setNewStudent({
      name: '',
      email: '',
      rollNumber: '',
      department: '',
      year: '',
      mobileNumber: '',
    });
    
    setIsAddingStudent(false);
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
  
  // Parse CSV data and add students
  const handleProcessCsv = () => {
    if (!csvData) return;
    
    // Simple CSV parsing (header row + data rows)
    const rows = csvData.split('\n');
    if (rows.length < 2) return;
    
    const headers = rows[0].split(',');
    const nameIndex = headers.indexOf('name');
    const emailIndex = headers.indexOf('email');
    const rollNumberIndex = headers.indexOf('rollNumber');
    const departmentIndex = headers.indexOf('department');
    const yearIndex = headers.indexOf('year');
    const mobileNumberIndex = headers.indexOf('mobileNumber');
    
    if (
      nameIndex === -1 ||
      emailIndex === -1 ||
      rollNumberIndex === -1 ||
      departmentIndex === -1 ||
      yearIndex === -1 ||
      mobileNumberIndex === -1
    ) {
      alert('CSV must contain name, email, rollNumber, department, year, and mobileNumber columns');
      return;
    }
    
    const newStudents: Student[] = [];
    
    for (let i = 1; i < rows.length; i++) {
      if (!rows[i].trim()) continue;
      
      const columns = rows[i].split(',');
      
      const newStudent: Student = {
        id: `s${Date.now() + i}`,
        name: columns[nameIndex],
        email: columns[emailIndex],
        role: 'student',
        rollNumber: columns[rollNumberIndex],
        department: columns[departmentIndex],
        year: columns[yearIndex],
        mobileNumber: columns[mobileNumberIndex],
        enrolledCourses: [],
        attendance: {},
      };
      
      newStudents.push(newStudent);
    }
    
    setStudents([...students, ...newStudents]);
    setCsvData('');
    setIsUploadingCSV(false);
  };
  
  // Delete student
  const handleDeleteStudent = (id: string) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Student Management</h1>
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
            onClick={() => setIsAddingStudent(true)}
            className="flex items-center"
          >
            <Plus className="h-5 w-5 mr-1" />
            Add Student
          </Button>
        </div>
      </div>
      
      {/* Add Student Form */}
      {isAddingStudent && (
        <Card title="Add New Student" className="mb-6">
          <form onSubmit={handleAddStudent}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input
                label="Student Name"
                name="name"
                value={newStudent.name}
                onChange={handleNewStudentChange}
                required
                fullWidth
              />
              
              <Input
                label="Email ID"
                name="email"
                type="email"
                value={newStudent.email}
                onChange={handleNewStudentChange}
                required
                fullWidth
              />
              
              <Input
                label="Roll Number"
                name="rollNumber"
                value={newStudent.rollNumber}
                onChange={handleNewStudentChange}
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
                  value={newStudent.department}
                  onChange={handleNewStudentChange}
                  className="px-3 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full rounded-md sm:text-sm focus:ring-1"
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
              
              <div className="mb-4">
                <label 
                  htmlFor="year" 
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Year
                </label>
                <select
                  id="year"
                  name="year"
                  value={newStudent.year}
                  onChange={handleNewStudentChange}
                  className="px-3 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  required
                >
                  <option value="">Select Year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>
              
              <Input
                label="Mobile Number"
                name="mobileNumber"
                value={newStudent.mobileNumber}
                onChange={handleNewStudentChange}
                required
                fullWidth
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddingStudent(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="success"
              >
                Save Student
              </Button>
            </div>
          </form>
        </Card>
      )}
      
      {/* CSV Upload Form */}
      {isUploadingCSV && (
        <Card title="Upload Student CSV" className="mb-6">
          <p className="text-gray-600 mb-4">
            Upload a CSV file with the following columns: name, email, rollNumber, department, year, and mobileNumber.
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
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
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
      
      {/* Student List */}
      <Card title="Student List">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Roll Number
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Year
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {student.profilePicture ? (
                        <img 
                          src={student.profilePicture} 
                          alt={student.name}
                          className="h-10 w-10 rounded-full object-cover mr-3"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <span className="text-blue-600 font-medium">
                            {student.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div className="text-sm font-medium text-gray-900">
                        {student.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.rollNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.year}</div>
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
                        onClick={() => handleDeleteStudent(student.id)}
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

export default AdminStudents;