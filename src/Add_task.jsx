import { useState } from "react";
import "./Add_style.css";
export default function Add() {
  const [item, setItem] = useState("");
  const [cart, setCart] = useState([]);
  const [completed, setCompleted] = useState([]);

  const addItem = () => {
    if (item == "") return;
    setCart([...cart, { text: item, isNew: false }]);
    // setCart([...cart,item]);
    setItem("");
  };

  const removeItem = (index) => {
    const completedTask = cart[index];
    setCompleted([...completed, completedTask]);
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  const toggleNew = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].isNew = !updatedCart[index].isNew;
    setCart(updatedCart);
  };
  const Delete=(index)=>{
     const updatedCompleted = completed.filter((_, i) => i !== index);
     setCompleted(updatedCompleted);
  }

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
        <section className="cartList">
          <h4>Task list</h4>
          <ul>
            {cart.map((value, index) => (
              <li key={index} style={{ color: value.isNew ? "blue" : "black" }}>
                {value.text}
                <div className="display">
                  <label htmlFor={`done-${index}`}>Completed</label>
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
              </li>
            ))}
          </ul>
        </section>
        <section className="completedTask">
          <h4>Completed Task</h4>
          <ul>
            {completed.map((value, index) => (
              <li key={index}>{value.text}
              <button className="delete-btn" onClick={()=>Delete(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
