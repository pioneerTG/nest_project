// Header.tsx
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
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-4">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex space-x-4">
                    <Link to="/" className="text-white text-2xl font-extrabold">
                        홈으로
                    </Link>
                    <Link to="/board" className="text-white text-2xl font-extrabold">
                        게시판
                    </Link>
                </div>
                <div className="flex space-x-4 items-center">
                    {Token ? (
                        <>
                            <span className="text-white text-lg">
                                환영합니다, <span className="font-semibold">{userName}</span>님
                            </span>
                            <button
                                className="text-white bg-red-600 px-4 py-2 rounded-full hover:bg-red-700"
                                onClick={handleLogout}
                            >
                                로그아웃
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <button className="text-white bg-green-600 px-4 py-2 rounded-full hover:bg-green-700">
                                    로그인
                                </button>
                            </Link>
                            <Link to="/signup">
                                <button className="text-white bg-yellow-500 px-4 py-2 rounded-full hover:bg-yellow-600">
                                    회원가입
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;