import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import toast from 'react-hot-toast';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { role, userId } = await login(credentials.email, credentials.password);
      
      if (role === 'student') {
        navigate('/student');
      } else if (role === 'faculty') {
        navigate('/faculty');
      } else if (role === 'admin') {
        navigate('/admin');
      }
    } catch (error) {
      toast.error('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <Card title="Login" className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              label="Email"
              name="email"
              type="email"
              value={credentials.email}
              onChange={handleChange}
              required
              fullWidth
              icon={<Mail className="h-5 w-5 text-gray-400" />}
            />
          </div>

          <div>
            <Input
              label="Password"
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
              required
              fullWidth
              icon={<Lock className="h-5 w-5 text-gray-400" />}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;