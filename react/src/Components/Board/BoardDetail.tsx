import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Board from './Board';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

interface BoardDetailProps {
  boardId: number;
}

interface Comment {
  id: number;
  comment: string;
  userName: string;
}

const BoardDetail: React.FC<BoardDetailProps> = ({ boardId }) => {
  const navigate = useNavigate();
  const Token = Cookies.get('Token');
  const [userName, setUserName] = useState<string | null>('');
  const [board, setBoard] = useState<Board | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingComment, setEditingComment] = useState('');
  const [isEditingBoard, setIsEditingBoard] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState<string | null>(null);
  const [updatedContent, setUpdatedContent] = useState<string | null>(null);
  const [updatedImage, setUpdatedImage] = useState<string | null>(null);

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
  }, [Token, boardId]);

  const handleEditBoard = async () => {
    setUpdatedTitle(board?.title || '');
    setUpdatedContent(board?.content || '');
    setUpdatedImage(board?.image || null);
    setIsEditingBoard(true);
  };

  const handleSaveBoardChanges = async () => {
    try {
      await axios.patch(`http://localhost:3001/board/${board?.id}`, {
        title: updatedTitle,
        content: updatedContent,
        image: updatedImage,
      });
      setIsEditingBoard(false);
      navigate('/board/deletepage');
    } catch (error:any) {
      console.error('Error updating board details:', error.message);
    }
  };

  const handleCancelBoardEdit = () => {
    setUpdatedTitle(board?.title || '');
    setUpdatedContent(board?.content || '');
    setUpdatedImage(board?.image || null);
    setIsEditingBoard(false);
  };

  const handleDeleteBoard = async () => {
    const confirmDelete = window.confirm('게시글을 삭제하시겠습니까?');

    if (confirmDelete) {
      await axios.delete(`http://localhost:3001/board/${board?.id}`);
      navigate('/board/deletepage');
    }
  };

  const handleEditComment = (commentId: number) => {
    const commentToUpdate = findCommentById(commentId);

    if (commentToUpdate) {
      setEditingCommentId(commentId);
      setEditingComment(commentToUpdate.comment);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    const confirmDelete = window.confirm('댓글을 삭제하시겠습니까?');

    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3001/comment/${commentId}`);
        setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
      } catch (error: any) {
        console.error('Error deleting comment:', error.message);
      }
    }
  };

  const handleCommentSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (editingCommentId !== null) {
        await axios.patch(`http://localhost:3001/comment/${editingCommentId}`, { comment: editingComment });
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === editingCommentId ? { ...comment, comment: editingComment } : comment
          )
        );
        setEditingCommentId(null);
      } else {
        const response = await axios.post<Comment>(`http://localhost:3001/comment/${boardId}/write`, {
          userName,
          boardId,
          comment: newComment,
        });

        const updatedCommentsResponse = await axios.get<Comment[]>(`http://localhost:3001/comment/${boardId}`);
        setComments(updatedCommentsResponse.data);

        setNewComment('');
      }
    } catch (error: any) {
      console.error('Error submitting comment:', error.message);
    }
  };

  const findCommentById = (commentId: number): Comment | undefined => {
    return comments.find((comment) => comment.id === commentId);
  };

  return (
    <div className="mt-8">
      {board && (
        <>
          <h2 className="text-2xl font-bold mb-4">{board.title}</h2>
          {board.image && <img src={`http://localhost:3001/board${board.image}`} alt="Board" className="mb-4" />}
          {board.content && <p className="mb-4">{board.content}</p>}
          {board.userName === userName && (
            <div className="mb-4">
              <button onClick={handleEditBoard} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                작성글 수정
              </button>
              <button onClick={handleDeleteBoard} className="bg-red-500 text-white px-4 py-2 rounded">
                작성글 삭제
              </button>
            </div>
          )}
        </>
      )}
      <p className="text-lg font-bold mb-2">댓글</p>
      {comments.length > 0 && (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id} className="mb-2">
              <strong>{comment.userName}: </strong>
              {comment.comment}
              {comment.userName === userName && (
                <div className="mt-2">
                  <button onClick={() => handleEditComment(comment.id)} className="text-blue-500 font-bold mr-2">
                    수정
                  </button>
                  <button onClick={() => handleDeleteComment(comment.id)} className="text-red-500 font-bold">
                    삭제
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
      {Token && (
        <form onSubmit={handleCommentSubmit} className="mt-4">
          <textarea
            placeholder="댓글을 입력해 주세요."
            value={editingCommentId !== null ? editingComment : newComment}
            onChange={(e) =>
              editingCommentId !== null ? setEditingComment(e.target.value) : setNewComment(e.target.value)
            }
            className="border border-gray-300 p-2 w-full rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            {editingCommentId !== null ? '수정' : '댓글 등록'}
          </button>
        </form>
      )}

      {isEditingBoard && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-white p-8 rounded-md max-w-md">
            <h3 className="text-lg font-semibold mb-4">게시글 수정</h3>
            <label className="block mb-2">
              제목:
              <input
                type="text"
                className="border border-gray-300 p-2 w-full rounded"
                value={updatedTitle || ''}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
            </label>
            <label className="block mb-2">
              이미지 URL:
              <input
                type="text"
                className="border border-gray-300 p-2 w-full rounded"
                value={updatedImage || ''}
                onChange={(e) => setUpdatedImage(e.target.value)}
              />
            </label>
            <label className="block mb-4">
              내용:
              <textarea
                className="border border-gray-300 p-2 w-full rounded"
                value={updatedContent || ''}
                onChange={(e) => setUpdatedContent(e.target.value)}
              />
            </label>
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleSaveBoardChanges}
              >
                저장
              </button>
              <button
                type="button"
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                onClick={handleCancelBoardEdit}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardDetail;