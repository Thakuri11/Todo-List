import { useEffect, useState } from "react";
import "./Add_style.css";
export default function Add() {
  const [item, setItem] = useState("");
  const [cart, setCart] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // function for adding task to the taskList
  const addItem = () => {
    if (item == "") return;
    setCart([...cart, { id: Date.now(), text: item, isNew: false }]);
    // setCart([...cart,item]);
    setItem("");
  };

  // updateCart() is used whenever we have to modify the cart.
  // In React we don't change the original state.
  // We copy it ,make change to the copied one  and update the original state

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

  //function to delete task fromm the completed task List
  const Delete = (index) => {
    setTimeout(() => {
      const updatedCompleted = completed.filter((_, i) => i !== index);
      setCompleted(updatedCompleted);
    }, 1000);
  };

  // just for diplaying time using useEffect hook
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const [hr, setHr] = useState(0);
  useEffect(() => {
    const inter = setInterval(() => {
      setSec((prev) => prev + 1);
    }, 1000);
    return () => {
      clearInterval(inter);
    }; //In strict mode, react runs setup  and cleanup one extra time before the actual setup
  }, []);

  useEffect(() => {
    if (sec == 60) {
      setMin((prev) => prev + 1);
      setSec(0);
    }
  }, [sec]);

  useEffect(() => {
    if (min == 60) {
      setHr((prev) => prev + 1);
      setMin(0);
    }
  }, [min]);

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
      <button onClick={addItem} className="Add-Btn">
        Add
      </button>
      <div className="display_section">
        <section className="taskList">
          <h2>Task List :</h2>
          <ul>
            {cart.map((value, index) => (
              <li
                key={value.id}
                style={{ color: value.isNew ? "blue" : "black" }}
              >
                {value.text}
                <div className="taskListOption">
                  <label htmlFor={`done-${index}`}>: Completed</label>
                  <input
                    type="checkbox"
                    id={`done-${index}`}
                    onChange={() => removeItem(index)}
                  />
                </div>
                <div className="taskListOption">
                  <label htmlFor={`new-${index}`}>New</label>
                  <input
                    type="checkbox"
                    id={`new-${index}`}
                    onChange={() => toggleNew(index)}
                  />
                </div>
                <div className="taskListOption">
                  <button
                    className="edit-Btn"
                    onClick={() => {
                      if (editIndex == index) {
                        const updatedCart = [...cart];
                        updatedCart[index].text = item;
                        setCart(updatedCart);
                        setItem("");
                        setEditIndex(null);
                      } else {
                        setItem(cart[index].text);
                        setEditIndex(index);
                      }
                    }}
                  >
                    {editIndex == index ? "Save" : "Edit"}
                  </button>
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
                <button className="delete-Btn" onClick={() => Delete(index)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <div className="timeDisplay">
        <h5>Time :</h5>
        <span>{hr}:</span>
        <span>{min}:</span>
        <span>{sec}</span>
      </div>
    </>
  );
}
