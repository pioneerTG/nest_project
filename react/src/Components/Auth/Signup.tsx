import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    const token = Cookies.get('Token');
    if (token) {
      alert('잘못된 접근입니다.');
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post<{ token: string }>('http://localhost:3001/user/signup', formData);
      console.log('Token:', response.data.token);

      navigate('/login');
    } catch (error: any) {
      console.error('Error during signup:', error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-4 text-center text-blue-500">회원가입</h2>
        <form onSubmit={handleSignUp} className="space-y-4">
          {Object.entries(formData).map(([field, value]) => (
            <div key={field} className="mb-4">
              <input
                type={field === 'password' ? 'password' : 'text'}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={value}
                onChange={handleChange}
                className="border p-3 w-full rounded focus:outline-none focus:ring focus:border-blue-300 bg-gray-100"
                required
              />
            </div>
          ))}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 w-full"
          >
            회원등록
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;