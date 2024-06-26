// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// // import './Signup.css';  // Assuming you save the CSS in Signup.css

// const Signup = ({ addUser }) => {
//   const [username, setUsername] = useState('');
//   const [first_name, setFirstName] = useState('');
//   const [last_name, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const userData = { username, first_name, last_name, email, password };

//     addUser(userData);

//     setUsername('');
//     setFirstName('');
//     setLastName('');
//     setEmail('');
//     setPassword('');
//   };

//   return (
//     <div className="box">
//       <h2>Signup</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="username">Username:</label>
//           <input
//             type="text"
//             id="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="first_name">First Name:</label>
//           <input
//             type="text"
//             id="first_name"
//             value={first_name}
//             onChange={(e) => setFirstName(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="last_name">Last Name:</label>
//           <input
//             type="text"
//             id="last_name"
//             value={last_name}
//             onChange={(e) => setLastName(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="confirmpassword">Password:</label>
//           <input
//             type="password"
//             id="confirmpassword"
//             value={confirmpassword}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <div className="text_inline">
//           <button type="submit">Signup</button>
//           <p>Already have an account?</p>
//           <button type="button" onClick={() => navigate('/login')}>Login</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Signup;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './Signup.css';  // Assuming you save the CSS in Signup.css

const Signup = ({ addUser }) => {
  const [username, setUsername] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    
    const userData = { username, first_name, last_name, email, password };

    addUser(userData);

    setUsername('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="box">
      <h2>Signup</h2>
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
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            id="first_name"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            id="last_name"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div>
          <label htmlFor="confirmpassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmpassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="text_inline">
          <button type="submit">Signup</button>
          <p>Already have an account?</p>
          <button type="button" onClick={() => navigate('/login')}>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
