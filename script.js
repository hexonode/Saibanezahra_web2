document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    const serviceCards = document.querySelectorAll('.service-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // If it's the services section, also fade in the cards
                if (entry.target.id === 'services') {
                    serviceCards.forEach(card => {
                        card.classList.add('visible');
                    });
                }
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});

// Page Visibility API implementation
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // User switched tabs or minimized window
        showEliminationMessage();
    }
});

function showEliminationMessage() {
    // Create message overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        animation: fadeInOverlay 0.5s ease forwards;
    `;

    // Create message container
    const messageContainer = document.createElement('div');
    messageContainer.style.cssText = `
        background-color: black;
        padding: 2rem;
        border-radius: 10px;
        text-align: center;
        max-width: 80%;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
        transform: scale(0.5);
        opacity: 0;
        animation: popIn 0.5s ease 0.3s forwards;
    `;

    // Create message
    const message = document.createElement('h2');
    message.textContent = 'You are eliminated. Refresh your page to continue.';
    message.style.cssText = `
        color: #e74c3c;
        margin-bottom: 1rem;
        font-size: 1.5rem;
        transform: translateY(-20px);
        opacity: 0;
        animation: slideIn 0.5s ease 0.6s forwards;
        text-shadow: 0 0 10px rgba(231, 76, 60, 0.5);
    `;

    // Create refresh button
    const refreshButton = document.createElement('button');
    refreshButton.textContent = 'Refresh Page';
    refreshButton.style.cssText = `
        background-color: #00bcd4;
        color: white;
        border: none;
        padding: 0.8rem 1.5rem;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1rem;
        transition: all 0.3s ease;
        transform: translateY(20px);
        opacity: 0;
        animation: slideIn 0.5s ease 0.8s forwards;
        box-shadow: 0 0 10px rgba(0, 188, 212, 0.5);
    `;

    // Add keyframes for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInOverlay {
            from { background-color: rgba(0, 0, 0, 0); }
            to { background-color: rgba(0, 0, 0, 0.8); }
        }
        @keyframes popIn {
            0% { transform: scale(0.5); opacity: 0; }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); opacity: 1; }
        }
        @keyframes slideIn {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    refreshButton.addEventListener('mouseover', () => {
        refreshButton.style.backgroundColor = '#0097a7';
        refreshButton.style.transform = 'scale(1.05)';
    });

    refreshButton.addEventListener('mouseout', () => {
        refreshButton.style.backgroundColor = '#00bcd4';
        refreshButton.style.transform = 'scale(1)';
    });

    refreshButton.addEventListener('click', () => {
        window.location.reload();
    });

    // Assemble the message
    messageContainer.appendChild(message);
    messageContainer.appendChild(refreshButton);
    overlay.appendChild(messageContainer);
    document.body.appendChild(overlay);

    // Prevent scrolling
    document.body.style.overflow = 'hidden';
} 