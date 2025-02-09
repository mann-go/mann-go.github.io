export class todoObject {
    constructor(id, name, description, dueDate, priority, notes, completed) {
        this.id = id || this.generateUniqueId();
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.completed = (completed === undefined) ? false : completed;
    }

    setTodo(updatedData) {
        Object.assign(this, updatedData);
    };

    getTodo() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            dueDate: this.dueDate,
            priority: this.priority,
            notes: this.notes,
            completed: this.completed,
        };
    }
    
    generateUniqueId() {
        // Generates a unique ID based on the current timestamp and a random number
        return `todo-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    }


}