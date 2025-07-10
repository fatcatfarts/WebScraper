document.addEventListener('DOMContentLoaded', () => {

    const toggleButtons = document.querySelectorAll('.expand-toggle-btn');

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.save-card');

            if (card) {
                const currentState = card.getAttribute('data-state');

                if (currentState === 'collapsed') {
                    card.setAttribute('data-state', 'expanded');
                } else {
                    card.setAttribute('data-state', 'collapsed');
                }
            }
        });
    });
});