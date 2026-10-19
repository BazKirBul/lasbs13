const dialog = document.getElementById('order-dialog');
const prices = { 'Товар 1': '1000 руб.', 'Товар 2': '1500 руб.' };
let dialogOpener = null;

function updateSelection() {
    const product = dialog.querySelector('[name="product"]').value;
    document.getElementById('dialog-selection').textContent = prices[product]
        ? `${product} · ${prices[product]}` : 'Выберите доступный товар в форме ниже.';
}

document.querySelectorAll('[data-order]').forEach((button) => {
    button.addEventListener('click', () => {
        const form = dialog.querySelector('form');
        form.reset();
        form.elements.product.value = button.dataset.order;
        form.elements.subject.value = 'order';
        updateSelection();
        dialogOpener = button;
        dialog.showModal();
        document.body.classList.add('dialog-open');
        form.elements.name.focus();
    });
});

document.getElementById('close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => {
    document.body.classList.remove('dialog-open');
    dialogOpener?.focus({ preventScroll: true });
});
let pointerStartedOutside = false;
function outsideDialog(event) {
    const box = dialog.getBoundingClientRect();
    return event.target === dialog && (event.clientX < box.left || event.clientX > box.right
        || event.clientY < box.top || event.clientY > box.bottom);
}
dialog.addEventListener('pointerdown', (event) => {
    pointerStartedOutside = outsideDialog(event);
});
dialog.addEventListener('click', (event) => {
    if (pointerStartedOutside && outsideDialog(event)) dialog.close();
    pointerStartedOutside = false;
});
dialog.querySelector('[name="product"]').addEventListener('change', updateSelection);

document.querySelectorAll('[data-order-form]').forEach((form) => {
    const status = form.querySelector('[role="status"]');
    const error = form.querySelector('[role="alert"]');
    form.addEventListener('invalid', (event) => {
        event.target.setAttribute('aria-invalid', 'true');
        error.hidden = false;
        status.hidden = true;
    }, true);
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        error.hidden = true;
        status.textContent = `Проверка пройдена. ${form.elements.product.value}: демонстрационная заявка заполнена. Данные не отправлены и не сохранены.`;
        status.hidden = false;
        status.focus();
    });
    form.addEventListener('reset', () => {
        status.hidden = true;
        error.hidden = true;
        form.querySelectorAll('[aria-invalid]').forEach((field) => field.removeAttribute('aria-invalid'));
        if (form.closest('dialog')) requestAnimationFrame(updateSelection);
    });
    form.addEventListener('input', (event) => {
        status.hidden = true;
        event.target.removeAttribute('aria-invalid');
        error.hidden = form.querySelector('[aria-invalid="true"]') === null;
    });
});
