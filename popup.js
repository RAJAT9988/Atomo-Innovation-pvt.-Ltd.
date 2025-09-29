document.addEventListener('DOMContentLoaded', () => {
    const buyButtons = document.querySelectorAll('.buy-button');
    const popup = document.getElementById('subscription-popup');
    const subscribeButton = document.getElementById('subscribe-button');
    const emailInput = document.getElementById('email-input');

    // Show popup when any Buy button is clicked
    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            popup.classList.add('active');
        });
    });

    // Hide popup when clicking outside the popup content
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.classList.remove('active');
        }
    });

    // Handle subscription (placeholder action since form submission is restricted)
    subscribeButton.addEventListener('click', () => {
        const email = emailInput.value.trim();
        if (email) {
            alert(`Thank you for subscribing with ${email}!`);
            emailInput.value = ''; // Clear the input
            popup.classList.remove('active'); // Close the popup
        } else {
            alert('Please enter a valid email address.');
        }
    });
});