import React, { useState } from "react";
import './App.css';

function App() {
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);
  const [editMode, setEditMode] = useState(Array(items.length).fill(false));

  function add_item() {
    setItems([...items, name]);
    setEditMode([...editMode, false]); // Add the edit mode for the new item
    setName("");
  }

  function delete_item(index) {
    const updatedItems = items.filter((ite, ind) => ind !== index);
    setItems(updatedItems);
    // Remove the edit mode entry for the deleted item
    const updatedEditMode = editMode.filter((mode, ind) => ind !== index);
    setEditMode(updatedEditMode);
  }

  function handleInputChange(event, index) {
    const updatedItems = [...items];
    updatedItems[index] = event.target.value;
    setItems(updatedItems);
  }

  function toggleEditMode(index) {
    const updatedEditMode = [...editMode];
    updatedEditMode[index] = !updatedEditMode[index];
    setEditMode(updatedEditMode);
  }

  return (
    <div className="App">
      <input
        type="text"
        placeholder="type smt"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={add_item}>Add item</button>
      <div className='write_here'>{name}</div>
      <div className='add_here'>
        {items.map((el, index) => (
          <div key={index}>
            {editMode[index] ? (
              <input
                type="text"
                value={el}
                onChange={(e) => handleInputChange(e, index)}
              />
            ) : (
              <span>{el}</span>
            )}
            <button onClick={() => toggleEditMode(index)}>
              {editMode[index] ? "Save" : "Edit"}
            </button>
            <button onClick={() => delete_item(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
