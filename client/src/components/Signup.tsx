import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from '../hooks/hooks';
import { setUserReducer } from '../slices/slices';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [userNameInput, setUserNameInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newUser = {
      username: userNameInput,
      password: passwordInput,
      score: 0,
    };
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: { 'content-type': 'application/json' },
    };
    const newSessionId = uuidv4();
    const address = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : '';
    const result = await fetch(`${address}/api/user/${userNameInput}`);
    const data = await result.json();
    if (data === null) {
      await fetch(`${address}/api/users`, requestOptions);
      window.localStorage.setItem('sessionId', newSessionId);
      dispatch(setUserReducer(userNameInput));
      navigate('/');
    }
    if (data !== null) {
      alert('This username is already taken...');
    }
  };

  return (
    <div className="chatlog">
      <form onSubmit={handleSubmit}>
        <input
          className="form__input"
          autoComplete="off"
          required
          type="text"
          value={userNameInput}
          placeholder="username"
          onChange={(e) => setUserNameInput(e.target.value)}
        />
        <input
          className="form__input"
          autoComplete="off"
          required
          type="password"
          value={passwordInput}
          placeholder="password"
          onChange={(e) => setPasswordInput(e.target.value)}
        />
        <button type="button" className="form__ask-btn">Sign Up</button>
      </form>
      <p>
        Already have an account?
        <Link to="/login">Click here to Login!</Link>
      </p>
    </div>
  );
};

export default Signup;
