         // Sticky navbar with color change
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    const navLinks = document.getElementById('navLinks');
    const scrollPosition = window.scrollY;

    if (scrollPosition > 50) {
        navbar.classList.add('scrolled');
        navLinks.style.backgroundColor = '#fff';
    } else {
        navbar.classList.remove('scrolled');
        navLinks.style.backgroundColor = '#1877f2';
    }
});

// Fixed navigation on scroll
// Sticky Navbar on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
  // Simple script to toggle training details
        document.querySelectorAll('.btn-training').forEach(button => {
            button.addEventListener('click', function(e) {
                if(e.target.textContent === 'Show Details') {
                    e.target.textContent = 'Enroll Now';
                    e.target.previousElementSibling.style.display = 'none';
                } else if(e.target.textContent === 'Enroll Now') {
                    // In a real implementation, this would redirect to enrollment
                    const details = e.target.previousElementSibling;
                    if(details) {
                        details.style.display = details.style.display === 'block' ? 'none' : 'block';
                        e.target.textContent = details.style.display === 'block' ? 'Show Less' : 'Enroll Now';
                    }
                }
            });
        });