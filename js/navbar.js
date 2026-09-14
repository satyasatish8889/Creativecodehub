// Function to load the navigation bar
function loadNavbar() {
    const navbar = `
    <nav class="navbar navbar-expand-lg navbar-light fixed-top">
        <div class="container">
            <a class="navbar-brand" href="index.html">
                <img src="images/logo/cc-hub-logo.png" alt="Creative Code Hub">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav mx-auto">
                    <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="internship.html">Internship</a></li>
                    <li class="nav-item"><a class="nav-link" href="courses.html">Courses</a></li>
                    <li class="nav-item"><a class="nav-link" href="project.html">Projects</a></li>
                    <li class="nav-item dropdown">
                        <a class="nav-link" href="about.html" id="aboutDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            About Us
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="aboutDropdown">
                            <li><a class="dropdown-item" href="about.html#company">Company</a></li>
                            <li><a class="dropdown-item" href="about.html#ceo">CEO</a></li>
                            <li><a class="dropdown-item" href="about.html#team">Team</a></li>
                            <li><a class="dropdown-item" href="about.html#gallery">Gallery</a></li>
                        </ul>
                    </li>
                    <li class="nav-item"><a class="nav-link" href="career.html">Career</a></li>
                </ul>
                <a href="login.html" class="cc-hub-cta-btn ">LMS Access</a>
            </div>
        </div>
    </nav>`;
    
    // Insert navbar at the beginning of the body
    document.body.insertAdjacentHTML('afterbegin', navbar);
    
    // Set active class based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
            
            // If it's a dropdown parent, also add active class to parent
            const dropdown = link.closest('.dropdown');
            if (dropdown) {
                dropdown.querySelector('.dropdown-toggle').classList.add('active');
            }
        } else {
            link.classList.remove('active');
        }
    });
}

// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', loadNavbar);
