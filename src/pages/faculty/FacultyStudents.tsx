import React from 'react';
import { Users, User, Mail, Phone } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import { Faculty } from '../../types';
import { mockStudents } from '../../data/mockData';

const FacultyStudents: React.FC = () => {
  const { currentUser } = useAuth();
  const faculty = currentUser as Faculty;
  
  // Get assigned students from mock data
  const assignedStudents = mockStudents.filter(student => 
    faculty?.assignedStudents.includes(student.id)
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Assigned Students</h1>
      
      {assignedStudents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignedStudents.map((student) => (
            <div 
              key={student.id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  {student.profilePicture ? (
                    <img 
                      src={student.profilePicture} 
                      alt={student.name}
                      className="h-12 w-12 rounded-full object-cover mr-4"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                      <User className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{student.name}</h3>
                    <p className="text-sm text-gray-500">{student.rollNumber}</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>{student.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{student.mobileNumber}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Department</span>
                    <span className="font-medium text-gray-800">{student.department}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-gray-500">Year</span>
                    <span className="font-medium text-gray-800">{student.year}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Card title="">
          <div className="py-12 flex flex-col items-center justify-center">
            <Users className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">No Assigned Students</h3>
            <p className="text-gray-500 text-center max-w-md">
              You don't have any students assigned to you yet. The admin will assign students to you.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default FacultyStudents;