import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = Cookies.get('Token');
        if (token) {
            alert('잘못된 접근입니다.');
            navigate('/');
        }
    }, [navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post<{ token: string }>('http://localhost:3001/user/login', {
                email,
                password,
            });
            console.log('Token:', response.data.token);
            Cookies.set('Token', response.data.token);
            setError(null);
            setEmail('');
            setPassword('');
            navigate('/');
        } catch (error: any) {
            console.error('Error during login:', error.message);
            setError('로그인에 실패했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-300 p-2 mb-2 w-full rounded"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-300 p-2 mb-4 w-full rounded"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
