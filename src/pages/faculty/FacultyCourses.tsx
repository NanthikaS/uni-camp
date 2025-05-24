import React, { useState } from 'react';
import { BookOpen, Users, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCourses } from '../../context/CourseContext';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import { Faculty } from '../../types';

const FacultyCourses: React.FC = () => {
  const { currentUser } = useAuth();
  const faculty = currentUser as Faculty;
  const { getFacultyCourses, addCourse } = useCourses();
  
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [newCourse, setNewCourse] = useState({
    name: '',
    courseId: '',
    description: '',
  });
  
  const facultyCourses = getFacultyCourses(faculty?.id || '');
  
  // Handle new course form change
  const handleNewCourseChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      facultyId: faculty.id,
    });
    
    setNewCourse({
      name: '',
      courseId: '',
      description: '',
    });
    
    setIsAddingCourse(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Faculty Courses</h1>
        <Button
          variant="primary"
          onClick={() => setIsAddingCourse(true)}
          className="flex items-center"
        >
          <Plus className="h-5 w-5 mr-1" />
          Add Course
        </Button>
      </div>
      
      {/* Add Course Form */}
      {isAddingCourse && (
        <Card title="Add New Course" className="mb-6">
          <form onSubmit={handleAddCourse}>
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
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={newCourse.description}
                onChange={handleNewCourseChange}
                rows={3}
                className="px-3 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full rounded-md sm:text-sm focus:ring-1"
                required
              ></textarea>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddingCourse(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="success"
              >
                Save Course
              </Button>
            </div>
          </form>
        </Card>
      )}
      
      {/* Course List */}
      {facultyCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facultyCourses.map((course) => (
            <div 
              key={course.id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="bg-green-600 p-4 text-white">
                <h3 className="text-lg font-semibold">{course.name}</h3>
                <p className="text-sm opacity-90">{course.courseId}</p>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{course.enrolledStudents.length} students enrolled</span>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => {}}
                  className="transition-transform hover:scale-105"
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Card title="">
          <div className="py-12 flex flex-col items-center justify-center">
            <BookOpen className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">No Courses Created</h3>
            <p className="text-gray-500 text-center max-w-md">
              You haven't created any courses yet. Click the "Add Course" button to create your first course.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default FacultyCourses;