const datetimeLocalInputs = [
    {id: 'project-dueDate-input'},
    {id: 'todo-due'},
    {id: 'edit-todo-due'},
]

export function attachTodaysDateToDateTimeInputs() {
    datetimeLocalInputs.forEach((item) => {
        document.getElementById(item.id).min = toLocalISOString(new Date());
    });
}

export function toLocalISOString(date) {
    const localDate = new Date(date - date.getTimezoneOffset() * 60000);

    localDate.setSeconds(null);
    localDate.setMilliseconds(null);
    return localDate.toISOString().slice(0, -1);
}
