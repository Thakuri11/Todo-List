import { useState } from "react";
import "./Add_style.css";
export default function Add() {
  const [item, setItem] = useState("");
  const [cart, setCart] = useState([]);
  const [completed, setCompleted] = useState([]);

  // function for adding task to the taskList
  const addItem = () => {
    if (item == "") return;
    setCart([...cart, { text: item, isNew: false }]);
    // setCart([...cart,item]);
    setItem("");
  };

  //function to remove task from taskList when completed
  const removeItem = (index) => {
    const completedTask = cart[index];
    setTimeout(() => {
      setCompleted([...completed, completedTask]);
      const updatedCart = cart.filter((_, i) => i !== index);
      setCart(updatedCart);
    }, 1000);
  };

  //function for changing the color of li when button is clicked
  const toggleNew = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].isNew = !updatedCart[index].isNew;
    setCart(updatedCart);
  };

  const EditTask=(index)=>{
    const updatedCart = [...cart];
    updatedCart[index]
  }

  //function to delete task fromm the completed task List
  const Delete = (index) => {
    const updatedCompleted = completed.filter((_, i) => i !== index);
    setCompleted(updatedCompleted);
  };

  return (
    <>
      <div className="inputContainer">
        <label htmlFor="name">Enter task:</label>
        <input
          type="text"
          placeholder=""
          id="name"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
      </div>
      <button onClick={addItem} className="btn">
        Add
      </button>
      <div className="display_section">
        <section className="taskList">
          <h2>Task list :</h2>
          <ul>
            {cart.map((value, index) => (
              <li key={index} style={{ color: value.isNew ? "blue" : "black" }}>
                {value.text}
                <div className="display">
                  <label htmlFor={`done-${index}`}>: Completed</label>
                  <input
                    type="checkbox"
                    id={`done-${index}`}
                    onChange={() => removeItem(index)}
                  />
                </div>
                <div className="display">
                  <label htmlFor={`new-${index}`}>new</label>
                  <input
                    type="checkbox"
                    id={`new-${index}`}
                    onChange={() => toggleNew(index)}
                  />
                </div>
                <div className="display">
                  <button id={`hello-${index}`}onClick={()=>edit(index)}>Edit</button>
                </div>
              </li>
            ))}
          </ul>
        </section>
        <section className="completedTask">
          <h2>Completed Task :</h2>
          <ul>
            {completed.map((value, index) => (
              <li key={index}>
                {value.text}
                <button className="delete-btn" onClick={() => Delete(index)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
