export default function deleteTodo(todo) {    
    const confirmDelete = confirm('Are you sure you want to delete this todo item?');
    if(confirmDelete) {
        todo.remove();
        console.log('Todo item deleted');
    }
}