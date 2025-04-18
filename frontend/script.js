const apiUrl = "http://localhost:5000/api/todos";

async function fetchtodo() {
    try {
        const response = await fetch(`${apiUrl}/`);
        if (!response.ok) {
            throw new Error("Failed to fetch todos");
        }
        
        const todos = await response.json();
        const todoList = document.getElementById('todoList');
        todoList.innerHTML = ""; // Clear the list

        todos.todos.forEach(todo => {
            const todoItem = document.createElement("li");
            todoItem.classList.add("p-4", "bg-gray-200", "rounded", "flex", "justify-between", "items-center");
            todoItem.innerHTML = `
                <span class="text-lg ${todo.completed ? 'line-through text-gray-500' : ''}" id="todo-text-${todo._id}">${todo.text}</span>
                <div>
                    <button onclick="editTodo('${todo._id}', '${todo.text}')" class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mr-2">Edit</button>
                    <button onclick="deleteTodo('${todo._id}')" class="bg-red-500 text-white p-2 rounded hover:bg-red-600">Delete</button>
                </div>
            `;
            todoList.appendChild(todoItem);
        });
    } catch (error) {
        console.error('Error fetching todos:', error.message);
        alert(`Error: ${error.message}`);
    }
}

async function addTodo() {
    try {
        const todoText = document.getElementById("todoInput").value;
        if (todoText.trim() === '') {
            alert('Todo text cannot be empty!');
            return;
        }

        const response = await fetch(`${apiUrl}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: todoText })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to add todo: ${errorText}`);
        }

        // Clear the input field
        document.getElementById('todoInput').value = '';

        // Refresh the list by calling fetchtodo
        fetchtodo();
    } catch (error) {
        console.error('Error adding todo:', error.message);
        alert(`Error: ${error.message}`);
    }
}

async function editTodo(id, currentText) {
    try {
        // Prompt user to edit the todo text
        const newText = prompt("Edit your todo:", currentText);

        if (newText === null || newText.trim() === "") {
            alert("Todo text cannot be empty!");
            return;
        }

        const response = await fetch(`${apiUrl}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: newText })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to edit todo: ${errorText}`);
        }

        // Refresh the list by calling fetchtodo
        fetchtodo();
    } catch (error) {
        console.error('Error editing todo:', error.message);
        alert(`Error: ${error.message}`);
    }
}

async function deleteTodo(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to delete todo: ${errorText}`);
        }

        // Refresh the list by calling fetchtodo
        fetchtodo();
    } catch (error) {
        console.error('Error deleting todo:', error.message);
        alert(`Error: ${error.message}`);
    }
}

// Fetch todos immediately when the page loads
window.onload = fetchtodo;
