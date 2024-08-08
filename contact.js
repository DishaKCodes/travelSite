document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.querySelector('.contact-form form');
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(contactForm);
        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        alert("Thank you for your message! We will get back to you shortly.");
        contactForm.reset();
    });
});
