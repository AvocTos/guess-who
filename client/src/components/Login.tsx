import { useState ,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks/hooks';
import { setUserReducer } from '../slices/slices';


const Login = () => {
  
 const state = useAppSelector(state => state.updateGame);
 const dispatch = useAppDispatch();

 const navigate = useNavigate();

  const [userNameInput, setUserNameInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const address = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : '';

    const user = await fetch(`${address}/api/user/${userNameInput}`);
    const result = await user.json();
    if (result === null) {
      alert('Username or Password are incorrect');
      return;
    }
    if(result.password !== passwordInput){
      alert('Username or Password are incorrect');
      return;
    }
    if(result.password === passwordInput){
      const newSessionId = uuidv4();
      const requestOptions = {
        method: 'PUT',
        body: JSON.stringify({sessionId: newSessionId}),
        headers: {"content-type" : "application/json"},
      }
      console.log('before', userNameInput);
      fetch(`${address}/api/user/${userNameInput}`, requestOptions)
      .then(res => {
        window.localStorage.setItem('sessionId', newSessionId);
        dispatch(setUserReducer(userNameInput));
        navigate('/');
        return;
      })
    }
  };

  return (
    <div className="chatlog">
      <form onSubmit={handleSubmit}>
        <input className="form__input" autoComplete='off' required type="text" value={userNameInput} placeholder="username" onChange={e => setUserNameInput(e.target.value)}/>
        <input className="form__input" autoComplete='off' required type="password" value={passwordInput} placeholder="password" onChange={e => setPasswordInput(e.target.value)}/>
        <button className="form__ask-btn">Login</button>
      </form>
      <p>Don't have an account?
        <Link to='/signup'> Click here to sign up!</Link>
      </p>
    </div>
  );
}

export default Login;
