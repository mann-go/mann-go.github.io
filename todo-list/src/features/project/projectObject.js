import { todoObject } from "../todo/todoObject";

export class projectObject {

    constructor(id, name, desc, dueDate, todos = []) {
        this.id = id || this.generateUniqueId();
        this.name = name;
        this.desc = desc;
        this.dueDate = dueDate;
        this.todos = todos;
    }

    addTodo(todo) {
        if (!(todo instanceof todoObject)) {
            console.error("Invalid object: Must be an instance of todoObject.");
            return;
        }
        this.todos.push(todo);
    }

    setProject(updatedData) {
        Object.assign(this, updatedData);
    };

    getProject() {
        return {
            id: this.id,
            name: this.name,
            desc: this.desc,
            dueDate: this.dueDate,
            todos: Array.isArray(this.todos) ? this.todos.map((todo) => todo.getTodo()) : [],
        };
    }
    
    generateUniqueId() {
        // Generates a unique ID based on the current timestamp and a random number
        return `project-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    }
}