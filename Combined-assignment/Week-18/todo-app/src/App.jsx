import './App.css'
import { useState } from 'react'

function App() {
  const [todos, setTodos] = useState([]) // [ {key: 0.123, title: "task"}, ... ]
  const [input, setInput] = useState("")

  // --- New State for Editing ---
  const [editId, setEditId] = useState(null)    // Tracks the key of the item being edited
  const [editText, setEditText] = useState("")  // Tracks the temporary text while editing

  function handleSubmit(title) {
    if (!title.trim()) return // Prevent empty todos
    setTodos([...todos, { "key": Math.random(), "title": title }])
    setInput("") // Clear the state
  }

  // --- Handlers for Editing ---
  function startEdit(todo) {
    setEditId(todo.key)       // Tells React which row to open the input box for
    setEditText(todo.title)   // Pre-populates the edit input with the current title
  }

  function saveEdit(key) {
    // Map through todos and update only the matching one
    const updatedTodos = todos.map((todo) => {
      if (todo.key === key) {
        return { ...todo, title: editText }
      }
      return todo
    })
    setTodos(updatedTodos)
    setEditId(null) // Exit editing mode
    setEditText("") // Clear edit text state
  }

  return (
    <div style={{ "minHeight": "100vh", "width": "100vw", "display": "flex", "flexDirection": "column", "alignItems": "center", "paddingTop": "40px" }}>
      <h1>THE TODO APP</h1>
      
      <div>
        <input 
          value={input} 
          onChange={(e) => { setInput(e.target.value) }} 
          placeholder="add task"
        />
        <button onClick={() => { handleSubmit(input) }} style={{ "background": "green", "color": "white", "margin": "10px", "padding": "5px 10px", "cursor": "pointer" }}>
          submit
        </button>
      </div>

      <div style={{ "border": "1px solid black", "width": "500px", "padding": "10px" }}>
        {todos.length === 0 ? (
          <p style={{ "textAlign": "center", "color": "gray" }}>No tasks available</p>
        ) : (
          todos.map((todo) => {
            // Check if THIS specific todo is the one being edited
            const isEditing = editId === todo.key;

            return (
              <div 
                key={todo.key} // React uses 'key' prop on elements inside arrays, not 'id'
                style={{ "display": "flex", "background": "pink", "margin": "10px 0", "padding": "10px", "border": "1px solid black", "alignItems": "center", "justifyContent": "space-between" }}
              >
                {isEditing ? (
                  /* --- EDIT MODE ON --- */
                  <>
                    <input 
                      type="text" 
                      value={editText} 
                      onChange={(e) => setEditText(e.target.value)}
                      style={{ "flex": "4", "padding": "5px", "marginRight": "10px" }}
                    />
                    <button 
                      onClick={() => saveEdit(todo.key)} 
                      style={{ "background": "lightgreen", "padding": "5px 10px", "cursor": "pointer" }}
                    >
                      ✔
                    </button>
                  </>
                ) : (
                  /* --- EDIT MODE OFF (Normal State) --- */
                  <>
                    <div style={{ "flex": "4", "wordBreak": "break-word" }}>{todo.title}</div>
                    <button 
                      onClick={() => startEdit(todo)} 
                      style={{ "padding": "5px 10px", "cursor": "pointer" }}
                    >
                      Edit
                    </button>
                  </>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  )
}

export default App