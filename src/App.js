import "./App.css";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ImageUpload from "./ImageUpload";

function ToDo({ todo, deleteTodo }) {
  return (
    <li>
      <div className="Todo">
        {todo.text}
        <button className="btn" onClick={() => deleteTodo(todo.id)}>delete</button>
      </div>
    </li>
  );
}


function App() {
  //localStorage always consists out of a key / value pair
  // the value can only be a string
  // on app start load data as string from local storage
  // parse it to JSON and save it into the component state
  const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem("todos")) ?? []);
  const [currentToDo, setCurrentToDo] = useState("");
  
  // each time the internal todos state updates also save it to local storage
  useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json)
  }, [todos]);

  // add a new todo to the todos state with an unique id
  const addTodo = (e) => {
    // preventDefault() prevents a whole page rerender
    e.preventDefault();
    const newTodo = {
      id: uuidv4(),
      text: currentToDo,
    };
    setTodos([...todos, newTodo]);
    //reset the currentToDo to empty the textfield
    setCurrentToDo("");
  };

  const deleteTodo = (idToDelete) => {
    const filteredTodos = todos.filter((todo) => todo.id !== idToDelete);
    setTodos(filteredTodos);
  };

  const clearAllTodos = () => {
    localStorage.removeItem("todos");
    setTodos([]);
  };

  // in comparison to normal html input fields, you manually have to keep the state of it
  // if the input inside the textfield changes save it into the temporary currentToDo state
  return (
    <div className="App">
      <h2>My Todos</h2>
      <div className="toDos-container">
        <form className="newTodo" onSubmit={addTodo}>
          <input
            type="text"
            placeholder="Enter your todo"
            value={currentToDo}
            onChange={(e) => setCurrentToDo(e.target.value)}
          />
          <br />
          <button className="btn primary" type="submit">Add todo</button>
        </form>
        <ul className="toDos-list">
          {todos.map((todo) => (
            <ToDo todo={todo} key={todo.id} deleteTodo={deleteTodo} />
          ))}
        </ul>
        <button className="btn" onClick={clearAllTodos}>Clear all todos</button>
      </div>
      <br />
      <hr />
      <h2>Image upload</h2>
      <ImageUpload imgID="image1" />
    </div>
  );
}

export default App;
