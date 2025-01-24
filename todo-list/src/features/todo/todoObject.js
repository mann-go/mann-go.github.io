export class todoObject {
    constructor(name, desc, dueDate, priority, notes) {
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
            name: this.name,
            desc: this.desc,
            dueDate: this.dueDate,
            priority: this.priority,
            notes: this.notes,
        };
    }


}