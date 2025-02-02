export function toggleModal(modalId, show = true) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = show ? "block" : "none";
}

export function resetForm(formId) {
    const form = document.getElementById(formId);
    if (form) form.reset();
}
