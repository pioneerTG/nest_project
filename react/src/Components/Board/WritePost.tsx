import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function WritePost() {
    const navigate = useNavigate();
    const Token = Cookies.get('Token');
    const [userName, setUserName] = useState<string | null>('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState<File | null>(null);

    useEffect(() => {
        if (Token) {
            try {
                const decodedToken: { name: string } = jwtDecode(Token);
                setUserName(decodedToken.name);
            } catch (error) {
                console.error('Error decoding JWT token:', error);
            }
        } else {
            alert('로그인이 필요한 서비스입니다');
            navigate('/login');
        }
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedImage = e.target.files?.[0];
        if (selectedImage) {
            setContent(selectedImage);
        }
    };

    const handleWritePost = async () => {
        try {
            const formData = new FormData();
            if (content) {
                formData.append('content', content);
            }
            const imageResponse = await axios.post('http://localhost:3001/board/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            await axios.post('http://localhost:3001/board/write', {
                userName,
                title,
                content: imageResponse.data.content,
            });

            navigate('/board');
        } catch (error: any) {
            console.error('Error creating board:', error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8">
            <h2 className="text-3xl font-bold mb-4">Create Board</h2>

            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter the title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 p-2 border border-gray-300 w-full rounded focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                    Image
                </label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mt-1 p-2 border border-gray-300 w-full rounded focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>

            <button
                onClick={handleWritePost}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
                게시글 작성
            </button>
        </div>
    );
}

export default WritePost;
