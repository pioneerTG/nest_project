import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import BoardDetail from './BoardDetail';
import Cookies from 'js-cookie';

interface Board {
  id: number;
  title: string;
  image: string;
  content: string;
  userName: string;
}

const ITEMS_PER_PAGE = 10;

function Board() {
  const Token = Cookies.get('Token');
  const [boards, setBoards] = useState<Board[]>([]);
  const [selectedBoardId, setSelectedBoardId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await axios.get<Board[]>('http://localhost:3001/board');
        setBoards(response.data.reverse()); // 과거순서대로 정렬
      } catch (error: any) {
        console.error('Error fetching boards:', error.message);
      }
    };

    fetchBoards();
  }, []);

  const totalPages = Math.ceil(boards.length / ITEMS_PER_PAGE);

  const visibleBoards = boards.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-4">
      <h2 className="text-3xl font-bold mb-4">게시판</h2>

      {Token && (
        <Link to="/board/write" className="bg-blue-500 text-white py-2 px-4 rounded inline-block mb-4">
          글쓰기
        </Link>
      )}

      <ul className="space-y-4">
        {visibleBoards.map((board, index) => (
          <li key={board.id} className="border p-4 rounded">
            <div className="flex justify-between">
              <span className="text-gray-600">글번호: {boards.length - index}</span>
              <span className="text-gray-600">작성자: {board.userName}</span>
            </div>
            <strong
              className="text-blue-500 font-bold cursor-pointer"
              onClick={() => setSelectedBoardId(selectedBoardId === board.id ? null : board.id)}
            >
              제목:{board.title}
            </strong>
            {selectedBoardId === board.id && <BoardDetail boardId={selectedBoardId} />}
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 border rounded ${
                currentPage === index + 1 ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Board;