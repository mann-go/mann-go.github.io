import { todoObject } from "../todo/todoObject";

export class projectObject {

    constructor(name, desc, todos = [], dueDate) {
        this.name = name;
        this.desc = desc;
        this.todos = todos;
        this.dueDate = dueDate;
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
            name: this.name,
            desc: this.desc,
            todos: this.todos.map((todo) => todo.getTodo()),
            dueDate: this.dueDate,
        };
    }


}