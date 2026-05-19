document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const contactForm = document.querySelector('#contact-form');
    const formMessage = document.querySelector('#form-message');

    function setActiveNav() {
        const scrollPosition = window.scrollY + window.innerHeight / 3;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (link) {
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }

    function showFormMessage(message, type = 'success') {
        if (!formMessage) return;
        formMessage.textContent = message;
        formMessage.className = 'form-message';
        formMessage.style.background = type === 'success' ? 'rgba(255, 111, 181, 0.12)' : 'rgba(255, 111, 181, 0.18)';
        formMessage.style.borderColor = type === 'success' ? 'rgba(255, 111, 181, 0.24)' : 'rgba(194, 66, 110, 0.38)';
        formMessage.style.color = type === 'success' ? 'var(--pink-dark)' : '#a72f55';
        formMessage.style.display = 'block';
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            if (!contactForm.checkValidity()) {
                showFormMessage('Mohon isi semua bidang dengan benar sebelum mengirim.', 'error');
                contactForm.reportValidity();
                return;
            }

            showFormMessage('Terima kasih! Pesan Anda berhasil dikirim.', 'success');
            contactForm.reset();

            setTimeout(() => {
                if (formMessage) {
                    formMessage.style.display = 'none';
                }
            }, 4000);
        });
    }

    window.addEventListener('scroll', setActiveNav);
    setActiveNav();
});
