import { todoObject } from "../todo/todoObject";

export class projectObject {

    constructor(id, name, description, dueDate, todos = []) {
        this.id = id || this.generateUniqueId();
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.todos = Array.isArray(todos)
            ? todos.map(todo => todo instanceof todoObject
                ? todo
                : new todoObject(todo.id, todo.name, todo.description, todo.dueDate, todo.priority, todo.notes, todo.completed))
            : [];
    }

    addTodo(todo) {
        if (!(todo instanceof todoObject)) {
            console.error("Invalid object: Must be an instance of todoObject.");
            return;
        }
        this.todos.push(todo);
    }

    editTodo(updatedTodo) {
        this.todos = this.todos.map(todo => 
            todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo
        );
    }

    updateTodoCompletionStatus(todoId) {
        this.todos = this.todos.map(todo =>
            todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
        );
    }

    deleteTodoById(todoId) {        
        this.todos = this.todos.filter(t => t.id !== todoId);
    }

    setProject(updatedData) {
        Object.assign(this, updatedData);
    };

    getProject() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            dueDate: this.dueDate,
            todos: this.todos.map(todo => todo instanceof todoObject ? todo.getTodo() : todo)
        };
    }
    
    generateUniqueId() {
        // Generates a unique ID based on the current timestamp and a random number
        return `project-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    }
}