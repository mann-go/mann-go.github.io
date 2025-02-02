import { handleNewProjectSubmit, handleNewTodoSubmit } from "./formHandlers";
import { toggleModal } from "./modalManager";

export default function setupEventListeners() {

    // Navbar
    const resizeButton = document.querySelector('[data-resize-btn]');
    resizeButton.addEventListener('click', function(e) {
        e.preventDefault();
        document.body.classList.toggle('sb-expanded');
    });

    // Shared modal elements
    document.querySelectorAll(".close").forEach((closeButton) => {
        closeButton.addEventListener("click", () => {
            const modal = closeButton.closest(".modal");
            if (modal) toggleModal(modal.id, false);
        })
    })

    // My Projects button
    const loadMyProjects = document.getElementById('my-projects');
    loadMyProjects.addEventListener("click", (e) => {
        e.preventDefault();
        toggleModal('select-project-modal');
    });

    // New Project button
    const newProject = document.getElementById('create-project-btn');
    newProject.addEventListener("click", (e) => {
        e.preventDefault();
        toggleModal('new-project-modal');
    });

    const submitNewProjectForm = document.getElementById('new-project-modal');
    submitNewProjectForm.addEventListener("click", (e) => {
        if (submitNewProjectForm) {
            submitNewProjectForm.addEventListener("submit", handleNewProjectSubmit)
        }
    });

    // New todo button
    const addTodoButton = document.getElementById('add-todo');
    addTodoButton.addEventListener("click", (e) => {
        e.preventDefault();
        toggleModal('todo-add-modal');
    });

    // New todo form
    const submitNewTodoForm = document.getElementById('todo-add-modal');
    if (submitNewTodoForm) {
        submitNewTodoForm.addEventListener("submit", handleNewTodoSubmit);
    }
}