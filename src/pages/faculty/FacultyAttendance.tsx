import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCourses } from '../../context/CourseContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Faculty } from '../../types';
import { mockStudents } from '../../data/mockData';

const FacultyAttendance: React.FC = () => {
  const { currentUser, updateUser } = useAuth();
  const faculty = currentUser as Faculty;
  const { getFacultyCourses } = useCourses();
  
  const facultyCourses = getFacultyCourses(faculty?.id || '');
  const [selectedCourse, setSelectedCourse] = useState(facultyCourses.length > 0 ? facultyCourses[0].id : '');
  
  // Get enrolled students for the selected course
  const getEnrolledStudents = () => {
    if (!selectedCourse) return [];
    
    const course = facultyCourses.find(c => c.id === selectedCourse);
    if (!course) return [];
    
    return mockStudents.filter(student => 
      course.enrolledStudents.includes(student.id)
    );
  };
  
  const enrolledStudents = getEnrolledStudents();
  
  // Attendance state
  const [attendance, setAttendance] = useState<Record<string, number>>(() => {
    const initialAttendance: Record<string, number> = {};
    enrolledStudents.forEach(student => {
      const course = facultyCourses.find(c => c.id === selectedCourse);
      if (course) {
        initialAttendance[student.id] = student.attendance[course.courseId] || 0;
      }
    });
    return initialAttendance;
  });
  
  // Handle attendance change
  const handleAttendanceChange = (studentId: string, value: number) => {
    setAttendance({
      ...attendance,
      [studentId]: value,
    });
  };
  
  // Handle save attendance
  const handleSaveAttendance = () => {
    // In a real application, this would update the attendance in the database
    // For now, we'll just update the local state
    enrolledStudents.forEach(student => {
      const course = facultyCourses.find(c => c.id === selectedCourse);
      if (course && attendance[student.id] !== undefined) {
        const updatedAttendance = {
          ...student.attendance,
          [course.courseId]: attendance[student.id],
        };
        
        updateUser({
          ...student,
          attendance: updatedAttendance,
        });
      }
    });
    
    alert('Attendance saved successfully!');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Attendance Management</h1>
      
      {facultyCourses.length > 0 ? (
        <>
          <Card title="Select Course" className="mb-6">
            <div className="mb-4">
              <label 
                htmlFor="course" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Course
              </label>
              <select
                id="course"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="px-3 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-green-500 block w-full rounded-md sm:text-sm focus:ring-1"
              >
                {facultyCourses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.name} ({course.courseId})
                  </option>
                ))}
              </select>
            </div>
          </Card>
          
          {enrolledStudents.length > 0 ? (
            <Card title="Student Attendance">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Roll Number
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Attendance (%)
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {enrolledStudents.map((student) => (
                      <tr key={student.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {student.profilePicture ? (
                              <img 
                                src={student.profilePicture} 
                                alt={student.name}
                                className="h-10 w-10 rounded-full object-cover mr-3"
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                                <span className="text-gray-500">{student.name.charAt(0)}</span>
                              </div>
                            )}
                            <div>
                              <div className="text-sm font-medium text-gray-900">{student.name}</div>
                              <div className="text-sm text-gray-500">{student.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{student.rollNumber}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={attendance[student.id] || 0}
                            onChange={(e) => handleAttendanceChange(student.id, parseInt(e.target.value) || 0)}
                            className="px-3 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-green-500 rounded-md sm:text-sm focus:ring-1 w-20"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span 
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${
                                (attendance[student.id] || 0) >= 85 
                                  ? 'bg-green-100 text-green-800' 
                                  : (attendance[student.id] || 0) >= 75 
                                    ? 'bg-yellow-100 text-yellow-800' 
                                    : 'bg-red-100 text-red-800'
                              }`}
                          >
                            {(attendance[student.id] || 0) >= 85 
                              ? 'Good' 
                              : (attendance[student.id] || 0) >= 75 
                                ? 'Average' 
                                : 'Poor'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button
                  variant="success"
                  onClick={handleSaveAttendance}
                >
                  Save Attendance
                </Button>
              </div>
            </Card>
          ) : (
            <Card title="">
              <div className="py-8 text-center">
                <p className="text-gray-500">No students enrolled in this course.</p>
              </div>
            </Card>
          )}
        </>
      ) : (
        <Card title="">
          <div className="py-12 flex flex-col items-center justify-center">
            <h3 className="text-xl font-medium text-gray-700 mb-2">No Courses Available</h3>
            <p className="text-gray-500 text-center max-w-md">
              You don't have any courses yet. Please add courses from the Courses section.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default FacultyAttendance;