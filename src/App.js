
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';
import Signup from "./components/Signup";
import Login from "./components/Login";
import TodoList from "./components/TodoList";
import TodoItem from "./components/TodoItem";
import NavBar from "./components/NavBar";

function App() {
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);
  const [errors, setErrors] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const navigate = useNavigate();



  const addUser = (data) => {
    const originalUsers = [...users];
    setUsers([...users, { ...data, id: parseInt(users[users.length - 1]?.id || 0) + 1 }]);
    axios.post("http://localhost:8000/users/", data)
      .then(res => setUsers([...users, res.data]))
      .catch(err => {
        setErrors(err.message);
        setUsers(originalUsers);
      });
  };
  // const addUser = (data) => {
  //   const originalUsers = [...users];
  //   axios.post("http://localhost:8000/users/", data)
  //     .then(res => {
  //       setUsers([...users, res.data]);
  //       // Optionally clear form fields or perform other actions on successful registration
  //       setUsername('');
  //       setFirstName('');
  //       setLastName('');
  //       setEmail('');
  //       setPassword('');
  //       setConfirmPassword(''); // Clear confirmPassword if needed
  //     })
  //     .catch(err => {
  //       setErrors(err.message);
  //       setUsers(originalUsers);
  //       setConfirmPassword('');
  //     });
  // };
  
  const loginUser = async (data) => {
    try {
      const response = await axios.post("http://localhost:8000/logins/", data);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      setAuthToken(token);
      setLoggedInUser(user);
      setLoggedInUser(response.data.user);
      setAuthToken(response.data.token); 
      console.log("Login successful:", response.data);
      navigate("/"); 
      window.location.reload();
    } catch (err) {
      setErrors(err.message);
      console.error("Login error:", err.message);
    }
  };


  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    
    if (storedToken && storedUser) {
      setAuthToken(storedToken);
      setLoggedInUser(storedUser);
    }
  }, []);
  useEffect(() => {
    if (loggedInUser) {
      navigate("/"); 
    }
  }, [loggedInUser, navigate]);


  const logoutUser = async () => {
    try {
      await axios.post("http://localhost:8000/logouts/", {}, { 
        headers: {
          Authorization: `Token ${authToken}` 
        }
      });
      console.log('Authentication token:', authToken); 
      localStorage.removeItem('token');
      localStorage.removeItem('loggedInUser');
      setLoggedInUser(null);
      setAuthToken(null);
      setLoggedInUser(null); 
      setAuthToken(null); 
      navigate("/login"); 
      console.log("Logout successful");
      window.location.reload();
    } catch (err) {
      localStorage.removeItem('token');
      localStorage.removeItem('loggedInUser');
      setErrors(err.message);
      console.error("Logout error:", err.message);
    }
  };
//   useEffect(() => {
//     const fetchTodos = async () => {
//       try {
//         const loggedInUserString = localStorage.getItem('loggedInUser');
//         const loggedInUser = JSON.parse(loggedInUserString);
//         const response = await axios.get(`http://127.0.0.1:8000/todos/?username=${loggedInUser.username}`, 
//           {
//             headers: {
//               Authorization: `Token ${localStorage.getItem('token')}`
//             }
//           });
//         setTodos(response.data);
//       } catch (error) {
//             console.error('Error fetching todos:', error);
//         }
//     };

//     fetchTodos();
// }, []);
useEffect(() => {
  const fetchTodos = async () => {
    try {
      const loggedInUserString = localStorage.getItem('loggedInUser');
      if (loggedInUserString) {
        const loggedInUser = JSON.parse(loggedInUserString);
        const response = await axios.get(`http://127.0.0.1:8000/todos/?username=${loggedInUser.username}`, {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
          }
        });
        setTodos(response.data);
      } else {
        throw new Error("No logged in user found in localStorage");
      }
      
      
    } catch (error) {
      if (!error.response) {
        // Network error (server might be down)
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        
        // console.error('Network error. Token and user data cleared from localStorage.');
      } else {
        console.error('Error fetching todos:', error);
      }
      // setErrors('Error');
    }
  };

  fetchTodos();
}, []);


  const addTodo = (data) => {
    const originalTodos = [...todos]
    setTodos( [ ...todos, data={...data, id:parseInt(todos[todos.length-1].id) + 1, status:"Active"}] )
    const loggedInUserString = localStorage.getItem('loggedInUser');
    const loggedInUser = JSON.parse(loggedInUserString);
    axios.post(`http://127.0.0.1:8000/todos/?username=${loggedInUser.username}`, data)
    .then(res => setTodos([...todos, res.data]))
    .catch(err => {
      setErrors(err.message)
      setTodos(originalTodos)
    })
  }

const delTodo = (id) => {
  setTodos(todos.filter( todo => todo.id != id ))
  const originalTodos = [...todos]
  axios.delete("http://localhost:8000/todos/" + id)
  .catch(err => {
    setErrors(err.message)
    setTodos(originalTodos)
  })
  
}

  const updateTodo = (e, id, text, todo) => {
    e.preventDefault();
    const updatedTodo = { ...todo, task: text };
    setTodos(todos.map(t => t.id === id ? updatedTodo : t));
    axios.patch("http://localhost:8000/todos/" + id, updatedTodo)
      .catch(err => setErrors(err.message));
  };
  const completeTodo = (e, id, todo) => {

    if(e.target.checked){
      console.log("okay")
      setTodos(todos.map(todo => todo.id == id ? { ...todo, completed:true}: todo))
      const updatedTodo = { ...todo, completed:true}
      axios.patch("http://localhost:8000/todos/" + id, updatedTodo)
    }
    else
    {
      console.log("omo")
      setTodos(todos.map(todo => todo.id == id ? { ...todo, completed:false}: todo))
      const updatedTodo = { ...todo, completed:false}
      axios.patch("http://localhost:8000/todos/" + id, updatedTodo)
    }

   
  }

  return (
    <div>
      {loggedInUser && <NavBar loggedInUser={loggedInUser} logoutUser={logoutUser} />}
      <Routes>
        <Route path="/signup" element={<Signup addUser={addUser} />} />
        <Route path="/login" element={<Login loginUser={loginUser} />} />
        <Route path="/" element={loggedInUser ? (
          <div>
            <TodoItem addTodo={addTodo} />
            <TodoList todos={todos} delTodo={delTodo} updateTodo={updateTodo} completeTodo={completeTodo} />
          </div>
        ) : (
          <Navigate to="/login" />
        )} />
      </Routes>
      {errors && <div style={{ color: 'red' }}>{errors}</div>}
    </div>

    
  );
}

export default App;
