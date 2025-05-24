import React from 'react';
import { Users, GraduationCap, BookOpen, UserCog } from 'lucide-react';
import { useCourses } from '../../context/CourseContext';
import Card from '../../components/common/Card';
import { mockStudents, mockFaculty } from '../../data/mockData';

const AdminDashboard: React.FC = () => {
  const { courses } = useCourses();
  
  // Statistics
  const totalStudents = mockStudents.length;
  const totalFaculty = mockFaculty.length;
  const totalCourses = courses.length;
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Students Card */}
        <Card title="Students" className="transform transition-all hover:scale-105">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <GraduationCap className="h-8 w-8" />
            </div>
            <div>
              <div className="text-3xl font-bold">{totalStudents}</div>
              <div className="text-sm text-gray-500">Total Students</div>
            </div>
          </div>
        </Card>
        
        {/* Faculty Card */}
        <Card title="Faculty" className="transform transition-all hover:scale-105">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <Users className="h-8 w-8" />
            </div>
            <div>
              <div className="text-3xl font-bold">{totalFaculty}</div>
              <div className="text-sm text-gray-500">Total Faculty</div>
            </div>
          </div>
        </Card>
        
        {/* Courses Card */}
        <Card title="Courses" className="transform transition-all hover:scale-105">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
              <BookOpen className="h-8 w-8" />
            </div>
            <div>
              <div className="text-3xl font-bold">{totalCourses}</div>
              <div className="text-sm text-gray-500">Total Courses</div>
            </div>
          </div>
        </Card>
        
        {/* Activity Card */}
        <Card title="System Status" className="transform transition-all hover:scale-105">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
              <UserCog className="h-8 w-8" />
            </div>
            <div>
              <div className="text-base font-medium text-green-600">Active</div>
              <div className="text-sm text-gray-500">System Running</div>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Department Overview */}
      <Card title="Department Overview" className="mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Students
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Faculty
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Courses
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Computer Science */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">Computer Science</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {mockStudents.filter(s => s.department === 'Computer Science').length}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {mockFaculty.filter(f => f.department === 'Computer Science').length}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {courses.filter(c => {
                      const faculty = mockFaculty.find(f => f.id === c.facultyId);
                      return faculty?.department === 'Computer Science';
                    }).length}
                  </div>
                </td>
              </tr>
              
              {/* Electronics */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">Electronics</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {mockStudents.filter(s => s.department === 'Electronics').length}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {mockFaculty.filter(f => f.department === 'Electronics').length}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {courses.filter(c => {
                      const faculty = mockFaculty.find(f => f.id === c.facultyId);
                      return faculty?.department === 'Electronics';
                    }).length}
                  </div>
                </td>
              </tr>
              
              {/* Mechanical Engineering */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">Mechanical Engineering</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {mockStudents.filter(s => s.department === 'Mechanical Engineering').length}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {mockFaculty.filter(f => f.department === 'Mechanical Engineering').length}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {courses.filter(c => {
                      const faculty = mockFaculty.find(f => f.id === c.facultyId);
                      return faculty?.department === 'Mechanical Engineering';
                    }).length}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
      
      {/* Recent Activity */}
      <Card title="Recent System Activity">
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute left-3 inset-y-0 flex items-center">
              <div className="h-full w-0.5 bg-gray-200"></div>
            </div>
            
            <div className="relative flex items-start pl-8 pb-4">
              <div className="absolute left-0 mt-1">
                <div className="h-6 w-6 rounded-full bg-purple-600 flex items-center justify-center">
                  <UserCog className="h-3 w-3 text-white" />
                </div>
              </div>
              <div>
                <p className="font-medium">System Started</p>
                <p className="text-sm text-gray-500">University Portal System initialized</p>
              </div>
            </div>
            
            <div className="relative flex items-start pl-8 pb-4">
              <div className="absolute left-0 mt-1">
                <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center">
                  <Users className="h-3 w-3 text-white" />
                </div>
              </div>
              <div>
                <p className="font-medium">Users Loaded</p>
                <p className="text-sm text-gray-500">{totalStudents} students and {totalFaculty} faculty members</p>
              </div>
            </div>
            
            <div className="relative flex items-start pl-8">
              <div className="absolute left-0 mt-1">
                <div className="h-6 w-6 rounded-full bg-green-600 flex items-center justify-center">
                  <BookOpen className="h-3 w-3 text-white" />
                </div>
              </div>
              <div>
                <p className="font-medium">Courses Loaded</p>
                <p className="text-sm text-gray-500">{totalCourses} courses available in the system</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;