import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const Token = Cookies.get('Token');
    const navigate = useNavigate();
    const [userName, setUserName] = useState<string | null>('');

    useEffect(() => {
        const checkTokenExpiration = () => {
            if (Token) {
                try {
                    const decodedToken: { exp: number; name: string } = jwtDecode(Token);
                    const currentTime = Math.floor(Date.now() / 1000);

                    if (decodedToken.exp < currentTime) {
                        console.error('JWT token has expired. Logging out...');
                        Cookies.remove('Token');
                        navigate('/');
                    } else {
                        setUserName(decodedToken.name);
                    }
                } catch (error) {
                    console.error('Error decoding JWT token:', error);
                }
            }
        };
        checkTokenExpiration();
    }, [Token, navigate]);

    const handleLogout = () => {
        Cookies.remove('Token');
        navigate('/');
    };

    return (
        <div className="bg-gray-800 p-4">
            <div className="flex items-center justify-between">
                <div className="flex space-x-4">
                    <Link to="/" className="text-white">
                        <span>Home</span>
                    </Link>
                    <Link to="/board" className="text-white">
                        <span>Board</span>
                    </Link>
                </div>
                <div className="flex space-x-4">
                    {Token ? (
                        <>
                            <span className="text-white px-3 py-2">환영합니다, {userName}님</span>
                            <button className="text-white bg-red-500 px-3 py-2 rounded" onClick={handleLogout}>
                                로그아웃
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <button className="text-white px-3 py-2 rounded">로그인</button>
                            </Link>
                            <Link to="/signup">
                                <button className="text-white px-3 py-2 rounded">회원가입</button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;
