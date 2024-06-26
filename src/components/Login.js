import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = ({ loginUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { username, password };
    loginUser(userData);
    setUsername('');
    setPassword('');
  };

  return (
    <div className="box">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="text_inline">
          <button type="submit">Login</button>
          <p>Don't have an account?</p>
          <button type="button" onClick={() => navigate('/signup')}>Signup</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
