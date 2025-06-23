// JavaScript kodları index.html dosyasından taşındı
// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in-up elements
document.querySelectorAll('.fade-in-up').forEach(el => {
    observer.observe(el);
});

// Full CV Modal Functions
function showFullCV() {
    document.getElementById('fullCVModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeFullCV() {
    document.getElementById('fullCVModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.getElementById('fullCVModal')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeFullCV();
    }
});

// Contact form handling
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Create mailto link
    const mailtoLink = `mailto:omervigorous@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`İsim: ${name}\nE-posta: ${email}\n\nMesaj:\n${message}`)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    alert('E-posta istemciniz açılıyor. Mesajınızı gönderebilirsiniz.');
    
    // Reset form
    this.reset();
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// CV'yi PDF olarak indir (geçici kopya ile)
const cvDownloadBtn = document.getElementById('cvDownloadBtn');
if (cvDownloadBtn) {
    cvDownloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const original = document.getElementById('cvModalContent');
        if (!original) return;
        // Geçici kopya oluştur
        const clone = original.cloneNode(true);
        clone.style.position = 'static';
        clone.style.background = 'white';
        clone.style.color = '#333';
        clone.style.boxShadow = 'none';
        clone.style.borderRadius = '0';
        clone.style.width = '100%';
        clone.style.maxWidth = '800px';
        clone.style.margin = '0 auto';
        clone.style.padding = '40px';
        clone.id = 'cvModalContentPdf';
        document.body.appendChild(clone);
        // PDF oluştur
        setTimeout(() => {
            const opt = {
                margin:       0.2,
                filename:     'omer-faruk-dinc-cv.pdf',
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2 },
                jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
            };
            html2pdf().set(opt).from(clone).save().then(() => {
                document.body.removeChild(clone);
            });
        }, 200);
    });
} 