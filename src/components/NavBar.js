import React from 'react';

function NavBar({ loggedInUser, logoutUser }) {
  return (
    <nav className="nav">
      <div className="navItem">Task</div>
      <div className="navItem">Welcome, {loggedInUser.username}</div>
      <button className="navButton" onClick={logoutUser}>Logout</button>
    </nav>
  );
}



export default NavBar;
