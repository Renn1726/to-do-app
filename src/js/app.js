const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const remainingCount = document.getElementById("remaining");
const toggleBtn = document.getElementById("theme-toggle");

const savedTasks = localStorage.getItem("tasks");
let tasks = savedTasks ? JSON.parse(savedTasks) : [];

function updateList() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.classList.add("adding");

    setTimeout(() => li.classList.remove("adding"), 300);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.onchange = () => toggleTask(index);

    const span = document.createElement("span");
    span.className = "text";
    span.textContent = task.text;

    const delBtn = document.createElement("button");
    delBtn.textContent = "×";
    delBtn.onclick = () => deleteTask(index);


    li.setAttribute("draggable", "true");
    li.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", index);
      e.currentTarget.classList.add("dragging");
    });

    li.addEventListener("dragover", (e) => {
      e.preventDefault();
      li.classList.add("drag-over");
    });

    li.addEventListener("dragleave", () => {
      li.classList.remove("drag-over");
    });

    li.addEventListener("drop", (e) => {
      e.preventDefault();
      const draggedIndex = parseInt(e.dataTransfer.getData("text/plain"));
      const targetIndex = index;

      if (draggedIndex !== targetIndex) {
        const draggedTask = tasks.splice(draggedIndex, 1)[0];
        tasks.splice(targetIndex, 0, draggedTask);
        updateList();
      }
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });

  const remaining = tasks.filter((task) => !task.completed).length;
  remainingCount.textContent = remaining;

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const text = taskInput.value.trim();
  if (text !== "") {
    tasks.push({ text, completed: false });
    taskInput.value = "";
    updateList();
  }
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  updateList();
}

function deleteTask(index) {
  const listItems = taskList.querySelectorAll("li");
  const item = listItems[index];
  item.classList.add("removing");

  setTimeout(() => {
    tasks.splice(index, 1);
    updateList();
  }, 200);
}

taskInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

toggleBtn.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  toggleBtn.textContent = isDark ? "☀️" : "🌙";
});

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
  toggleBtn.textContent = "☀️";
} else {
  toggleBtn.textContent = "🌙";
}

updateList();
