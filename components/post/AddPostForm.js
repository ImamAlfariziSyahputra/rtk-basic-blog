import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addNewPost } from '../../redux/slice/post/postSlice';

export default function AddPost({ users }) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const [addingPostRequestStatus, setAddingPostRequestStatus] =
    useState('idle');

  const isValid =
    [title, content, userId].every(Boolean) &&
    addingPostRequestStatus === 'idle';

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValid) {
      try {
        setAddingPostRequestStatus('pending');
        dispatch(addNewPost({ title, body: content, userId })).unwrap();

        setTitle('');
        setContent('');
        setUserId('');
      } catch (err) {
        console.log('err => ', err);
      } finally {
        setAddingPostRequestStatus('idle');
      }
    }
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <div className="max-w-md mx-auto mt-10 p-3 border rounded">
      <h2 className="text-4xl text-center mb-5">Add New Post</h2>

      <form className="block space-y-3">
        <div className="flex flex-col">
          <label htmlFor="userId">Author :</label>
          <select
            name="userId"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          >
            <option value="">Select user...</option>
            {usersOptions}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="title">Title :</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-8"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="content">Content :</label>
          <textarea
            type="text"
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <button
            className={`p-2 border hover:opacity-70 ${
              !isValid && 'disabled:cursor-not-allowed opacity-70'
            }`}
            onClick={handleSubmit}
            disabled={!isValid}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
