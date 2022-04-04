import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const [userNameInput, setUserNameInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');

  const handleSubmit = () => {
    const newUser = {
      username: userNameInput,
      password: passwordInput,
      score: 0,
    }
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {"content-type" : "application/json"},
    }
    const address = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : '';

    fetch(`${address}/api/users`, requestOptions);

    // login the new user
    
    navigate('/');
  };

  return (
    <div className="chatlog">
      <form onSubmit={handleSubmit}>
        <input className="form__input" autoComplete='off' required type="text" value={userNameInput} placeholder="username" onChange={e => setUserNameInput(e.target.value)}/>
        <input className="form__input" autoComplete='off' required type="password" value={passwordInput} placeholder="password" onChange={e => setPasswordInput(e.target.value)}/>
        <button className="form__ask-btn">Sign Up</button>
      </form>
      <p>Already have an account?
        <Link to='/login'>Click here to Login!</Link>
      </p>
    </div>
  );
}

export default Signup;
