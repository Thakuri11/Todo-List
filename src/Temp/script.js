const body = document.getElementById("div");

const input = document.createElement("input");
const subBtn = document.createElement("input");
const listContainer = document.createElement("ul");
const clearAllBtn = document.createElement("button");

let todoData = JSON.parse(localStorage.getItem("TO_DO_DATA")) || [];

const addStyles = () => {
  input.type = "text";
};
const addInput = () => {
  input.placeholder = `Enter To-Do`;
  body.append(input);
};
const addBtn = () => {
  subBtn.type = "submit";
  subBtn.value = "ADD-TODO";
  body.append(subBtn);
};
const addListContainer = () => {
  body.append(listContainer);
};
const addList = () => {
  if (input.value.trim()) {
    todoData.push(input.value);
    localStorage.setItem("TO_DO_DATA", JSON.stringify(todoData.reverse()));
    input.value = "";
    renderList();
  }
};
const renderList = () => {
  listContainer.innerHTML = "";
  todoData.forEach((value, index) => {
    const list = document.createElement("li");
    let p = document.createElement("p");
    const delBtn = document.createElement("button");
    p.textContent = value;
    listContainer.append(list);
    list.append(p);
    list.append(delBtn);
    handleDel(delBtn, index);
    handleDone(p, index);
  });
};
const handleDone = (p, index) => {
  p.addEventListener("click", () => {
    ok = window.confirm("Task Done ?");
    if (!ok) {
      return;
    }

    p.style.textDecoration = "line-through";

    setTimeout(() => {
      deleteList(p, index);
    }, 5000);
    return;
  });
};
const handleDel = (delBtn, index) => {
  delBtn.innerText = "DELETE";
  delBtn.addEventListener("click", () => {
    deleteList(delBtn, index);
  });
};
const deleteList = (delBtn, index) => {
  console.log("wanna delete: ", delBtn, "of index: ", index);
  delBtn.removeEventListener("click", deleteList);
  todoData.splice(index, 1);
  localStorage.setItem("TO_DO_DATA", JSON.stringify(todoData));
  renderList();
};
const clearAllToDO = () => {
  ok = window.confirm("Are U sure to Clear all ?");
  if (ok) {
    localStorage.clear("TO_DO_DATA");
    todoData = [];
    renderList();
    return;
  }
  return;
};

const init = () => {
  addStyles();
  addInput();
  addBtn();
  addListContainer();
  renderList();
};

init();
subBtn.addEventListener("click", addList);
body.append(clearAllBtn);
clearAllBtn.innerText = `Clear All ToDo`;
clearAllBtn.addEventListener("click", clearAllToDO);
