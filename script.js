// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            const bars = this.querySelectorAll('.bar');
            if (navMenu.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translate(4px, 5px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(4px, -5px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const bars = hamburger.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            });
        });
    }
    
    // Active page highlight based on current URL
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Smooth scroll for anchor links (if any)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
// Contact Form Submission with FormSubmit
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            formStatus.innerHTML = '<div class="form-error">❌ Please fill in all fields.</div>';
            return;
        }
        
        if (!email.includes('@') || !email.includes('.')) {
            formStatus.innerHTML = '<div class="form-error">❌ Please enter a valid email address.</div>';
            return;
        }
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        formStatus.innerHTML = '<div style="color: #666;">📧 Sending your message...</div>';
        
        // Prepare form data
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('subject', subject);
        formData.append('message', message);
        formData.append('_captcha', 'false');
        formData.append('_template', 'table');
        
        try {
            const response = await fetch('https://formsubmit.co/ajax/velocetechcompany@gmail.com', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            if (response.ok) {
                formStatus.innerHTML = '<div class="form-success">✅ Message sent successfully! We\'ll get back to you soon.</div>';
                contactForm.reset(); // Clear all fields
            } else {
                throw new Error('Failed to send');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            formStatus.innerHTML = '<div class="form-error">❌ Oops! Something went wrong. Please try again or email us directly at velocetechcompany@gmail.com</div>';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
            
            // Auto-hide success message after 5 seconds
            setTimeout(() => {
                if (formStatus.innerHTML.includes('successfully')) {
                    formStatus.innerHTML = '';
                }
            }, 5000);
        }
    });
}