const dialog = document.getElementById('order-dialog');

document.querySelectorAll('[data-order]').forEach((button) => {
    button.addEventListener('click', () => {
        const form = dialog.querySelector('form');
        form.reset();
        form.querySelector('[role="status"]').hidden = true;
        form.elements.product.value = button.dataset.order;
        dialog.showModal();
    });
});

document.getElementById('close-dialog').addEventListener('click', () => dialog.close());

document.querySelectorAll('[data-order-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        form.querySelector('[role="status"]').hidden = false;
    });
    form.addEventListener('reset', () => {
        form.querySelector('[role="status"]').hidden = true;
    });
    form.addEventListener('input', () => {
        form.querySelector('[role="status"]').hidden = true;
    });
});
