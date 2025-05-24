import React, { useState } from 'react';
import { Trash2, Edit, Eye, Plus } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import { useCourses } from '../../context/CourseContext';
import { mockFaculty } from '../../data/mockData';

const AdminCourses: React.FC = () => {
  const { courses, addCourse, updateCourse, deleteCourse } = useCourses();
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [isEditingCourse, setIsEditingCourse] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  
  // New course form state
  const [newCourse, setNewCourse] = useState({
    name: '',
    courseId: '',
    description: '',
    facultyId: '',
  });
  
  // Handle new course form change
  const handleNewCourseChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };
  
  // Handle add course form submission
  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newCourse.name || !newCourse.courseId || !newCourse.description) {
      return;
    }
    
    addCourse({
      ...newCourse,
    });
    
    setNewCourse({
      name: '',
      courseId: '',
      description: '',
      facultyId: '',
    });
    
    setIsAddingCourse(false);
  };
  
  // Handle edit course
  const handleEditCourse = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (course) {
      setNewCourse({
        name: course.name,
        courseId: course.courseId,
        description: course.description,
        facultyId: course.facultyId || '',
      });
      setSelectedCourseId(courseId);
      setIsEditingCourse(true);
      setIsAddingCourse(true);
    }
  };
  
  // Handle update course
  const handleUpdateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCourseId || !newCourse.name || !newCourse.courseId || !newCourse.description) {
      return;
    }
    
    updateCourse(selectedCourseId, {
      name: newCourse.name,
      courseId: newCourse.courseId,
      description: newCourse.description,
      facultyId: newCourse.facultyId || undefined,
    });
    
    setNewCourse({
      name: '',
      courseId: '',
      description: '',
      facultyId: '',
    });
    
    setIsAddingCourse(false);
    setIsEditingCourse(false);
    setSelectedCourseId(null);
  };
  
  // Handle delete course
  const handleDeleteCourse = (courseId: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      deleteCourse(courseId);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Course Management</h1>
        <Button
          variant="primary"
          onClick={() => {
            setIsAddingCourse(true);
            setIsEditingCourse(false);
            setSelectedCourseId(null);
            setNewCourse({
              name: '',
              courseId: '',
              description: '',
              facultyId: '',
            });
          }}
          className="flex items-center"
        >
          <Plus className="h-5 w-5 mr-1" />
          Add Course
        </Button>
      </div>
      
      {/* Add/Edit Course Form */}
      {isAddingCourse && (
        <Card title={isEditingCourse ? "Edit Course" : "Add New Course"} className="mb-6">
          <form onSubmit={isEditingCourse ? handleUpdateCourse : handleAddCourse}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input
                label="Course Name"
                name="name"
                value={newCourse.name}
                onChange={handleNewCourseChange}
                required
                fullWidth
              />
              
              <Input
                label="Course ID"
                name="courseId"
                value={newCourse.courseId}
                onChange={handleNewCourseChange}
                required
                fullWidth
              />
              
              <div className="md:col-span-2 mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={newCourse.description}
                  onChange={handleNewCourseChange}
                  rows={3}
                  className="px-3 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-purple-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  required
                ></textarea>
              </div>
              
              <div className="mb-4">
                <label 
                  htmlFor="facultyId" 
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Assign Faculty
                </label>
                <select
                  id="facultyId"
                  name="facultyId"
                  value={newCourse.facultyId}
                  onChange={handleNewCourseChange}
                  className="px-3 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-purple-500 block w-full rounded-md sm:text-sm focus:ring-1"
                >
                  <option value="">Select Faculty</option>
                  {mockFaculty.map(faculty => (
                    <option key={faculty.id} value={faculty.id}>
                      {faculty.name} ({faculty.department})
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsAddingCourse(false);
                  setIsEditingCourse(false);
                  setSelectedCourseId(null);
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant={isEditingCourse ? "primary" : "success"}
              >
                {isEditingCourse ? "Update Course" : "Save Course"}
              </Button>
            </div>
          </form>
        </Card>
      )}
      
      {/* Course List */}
      <Card title="Course List">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Faculty
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Students Enrolled
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courses.length > 0 ? (
                courses.map((course) => {
                  const faculty = mockFaculty.find(f => f.id === course.facultyId);
                  
                  return (
                    <tr key={course.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{course.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{course.courseId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {faculty ? faculty.name : 'Not Assigned'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{course.enrolledStudents.length}</div>
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
                            onClick={() => handleEditCourse(course.id)}
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                            onClick={() => handleDeleteCourse(course.id)}
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    No courses available. Add a course to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AdminCourses;