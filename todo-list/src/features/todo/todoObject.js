export class todoObject {
    constructor(id, name, desc, dueDate, priority, notes) {
        this.id = id || this.generateUniqueId();
        this.name = name;
        this.desc = desc;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
    }

    setTodo(updatedData) {
        Object.assign(this, updatedData);
    };

    getTodo() {
        return {
            id: this.id,
            name: this.name,
            desc: this.desc,
            dueDate: this.dueDate,
            priority: this.priority,
            notes: this.notes,
        };
    }
    
    generateUniqueId() {
        // Generates a unique ID based on the current timestamp and a random number
        return `todo-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    }


}