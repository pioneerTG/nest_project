import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Board from './Board';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { redirect, useNavigate } from 'react-router-dom';

interface BoardDetailProps {
    boardId: number;
}

interface Comment {
    id: number;
    comment: string;
    userName: string;
}

const BoardDetail: React.FC<BoardDetailProps> = ({ boardId }) => {
    let navigate = useNavigate();
    const Token = Cookies.get('Token');
    const [userName, setUserName] = useState<string | null>('');
    const [board, setBoard] = useState<Board | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        if (Token) {
            try {
                const decodedToken: { name: string } = jwtDecode(Token);
                setUserName(decodedToken.name);
            } catch (error) {
                console.error('Error decoding JWT token:', error);
            }
        }
        const fetchBoardAndComments = async () => {
            try {
                const [boardResponse, commentsResponse] = await Promise.all([
                    axios.get<Board>(`http://localhost:3001/board/${boardId}`),
                    axios.get<Comment[]>(`http://localhost:3001/comment/${boardId}`),
                ]);

                setBoard(boardResponse.data);
                setComments(commentsResponse.data);
            } catch (error: any) {
                console.error('Error fetching board and comments:', error.message);
            }
        };

        fetchBoardAndComments();
    }, [board, comments]);

    const handleEditBoard = async (boardId: number) => {
        const updatedTitle = prompt('Enter new title:', board?.title);

        if (updatedTitle) {
            await axios.patch(`http://localhost:3001/board/${boardId}`, { title: updatedTitle });
            navigate('/board/deletepage');
        }
    };

    const handleDeleteBoard = async (boardId: number) => {
        const confirmDelete = window.confirm('게시글을 삭제하시겠습니까?');

        if (confirmDelete) {
            await axios.delete(`http://localhost:3001/board/${boardId}`);
            navigate('/board/deletepage');
        }
    };

    const handleEditComment = async (commentId: number) => {
        const commentToUpdate = findCommentById(commentId);

        if (commentToUpdate) {
            const updatedComment = prompt('Enter updated comment:', commentToUpdate.comment);

            if (updatedComment) {
                await axios.patch(`http://localhost:3001/comment/${commentId}`, { comment: updatedComment });
            }
        }
    };

    const findCommentById = (commentId: number): Comment | undefined => {
        return comments.find((comment) => comment.id === commentId);
    };

    const handleDeleteComment = async (commentId: number) => {
        const confirmDelete = window.confirm('댓글을 삭제하시겠습니까?');

        if (confirmDelete) {
            await axios.delete(`http://localhost:3001/comment/${commentId}`);
        }
    };

    const handleCommentSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post<Comment>(`http://localhost:3001/comment/${boardId}/write`, {
                userName,
                boardId,
                comment: newComment,
            });

            setComments([...comments, response.data]);
            setNewComment('');
        } catch (error: any) {
            console.error('Error submitting comment:', error.message);
        }
    };

    return (
        <div className="mt-8">
            {board && (
                <>
                    <h2 className="text-2xl font-bold mb-4">{board.title}</h2>
                    {board.content && (
                        <img src={`http://localhost:3001/board${board.content}`} alt="Board" className="mb-4" />
                    )}
                    {board.userName === userName && (
                        <div className="mb-4">
                            <button
                                onClick={() => handleEditBoard(board.id)}
                                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                            >
                                수정
                            </button>
                            <button
                                onClick={() => handleDeleteBoard(board.id)}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                삭제
                            </button>
                        </div>
                    )}
                </>
            )}
            <p className="text-lg font-bold mb-2">댓글</p>
            {comments.length > 0 && (
                <>
                    <ul>
                        {comments.map((comment) => (
                            <li key={comment.id} className="mb-2">
                                <strong>{comment.userName}: </strong>
                                {comment.comment}
                                {comment.userName === userName && (
                                    <div className="mt-2">
                                        <button
                                            onClick={() => handleEditComment(comment.id)}
                                            className="text-blue-500 font-bold mr-2"
                                        >
                                            수정
                                        </button>
                                        <button
                                            onClick={() => handleDeleteComment(comment.id)}
                                            className="text-red-500 font-bold"
                                        >
                                            삭제
                                        </button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </>
            )}
            {Token && (
                <form onSubmit={handleCommentSubmit} className="mt-4">
                    <textarea
                        placeholder="댓글을 입력해 주세요"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="border border-gray-300 p-2 w-full rounded"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                    >
                        Submit
                    </button>
                </form>
            )}
        </div>
    );
};

export default BoardDetail;
