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
    const [content, setContent] = useState('');
    const [image, setImage] = useState<File | null>(null);

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
            setImage(selectedImage);
        }
    };

    const handleWritePost = async () => {
        try {
            const formData = new FormData();
            if (image) {
                formData.append('image', image);
            }
            const imageResponse = await axios.post('http://localhost:3001/board/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('imageResponse.data:', imageResponse.data.image); // 추가된 로깅 코드

            await axios.post('http://localhost:3001/board/write', {
                userName,
                title,
                image: imageResponse.data.image,
                content,
            });

            navigate('/board');
        } catch (error: any) {
            console.error('Error creating board:', error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8">
            <h2 className="text-3xl font-bold mb-4">게시글 작성</h2>

            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    제목
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="제목을 입력하세요."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 p-2 border border-gray-300 w-full rounded focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                    이미지 첨부
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

            <div className="mb-4">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                    본문 내용
                </label>
                <textarea
                    id="content"
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
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