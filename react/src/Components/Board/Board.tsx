import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import BoardDetail from './BoardDetail';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface Board {
    id: number;
    title: string;
    content: string;
    userName: string;
}

function Board() {
    const Token = Cookies.get('Token');
    const [boards, setBoards] = useState<Board[]>([]);
    const [selectedBoardId, setSelectedBoardId] = useState<number | null>(null);

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const response = await axios.get<Board[]>('http://localhost:3001/board');
                setBoards(response.data);
            } catch (error: any) {
                console.error('Error fetching boards:', error.message);
            }
        };

        fetchBoards();
    }, []);

    return (
        <div className="max-w-4xl mx-auto my-8">
            <h2 className="text-3xl font-bold mb-4">게시판</h2>

            {Token && (
                <Link to="/board/write" className="bg-blue-500 text-white py-2 px-4 rounded inline-block mb-4">
                    글쓰기
                </Link>
            )}

            <ul>
                {boards.map((board) => (
                    <li key={board.id} className="mb-4">
                        <strong>
                            <button
                                onClick={() => setSelectedBoardId(selectedBoardId === board.id ? null : board.id)}
                                className="text-blue-500 font-bold"
                            >
                                {board.title}
                            </button>
                            {` 작성자(${board.userName})`}
                            {selectedBoardId === board.id && <BoardDetail boardId={selectedBoardId} />}
                        </strong>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Board;
