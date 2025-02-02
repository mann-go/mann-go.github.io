export function createProjectElement(projectObject) {
    console.log("Rendering project:", projectObject.name);
    console.log("Project contents:", projectObject);
    const template = document.getElementById('project-template');
    const gridContainer = document.getElementById('grid-container-modal');

    // Clone template content
    const projectTemplate = template.content.cloneNode(true);
    const projectElement = projectTemplate.querySelector('.project');

    projectElement.setAttribute('data-id', projectObject.id);

    // Populate project name
    const name = projectTemplate.getElementById('project-name');
    name.textContent = projectObject.name;

    const desc = projectTemplate.getElementById('project-desc');
    desc.textContent = projectObject.desc;
    
    const dueDate = projectTemplate.getElementById('project-dueDate');
    dueDate.textContent = projectObject.dueDate;

    // Append project to grid container
    gridContainer.appendChild(projectTemplate);
}
