/*===== LOADER =====*/
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const body = document.body;
    
    // Attendre un peu pour que l'animation soit visible
    setTimeout(() => {
        loader.classList.add('hidden');
        body.classList.remove('loading');
        
        // Retirer complètement le loader du DOM après l'animation
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500); // Afficher le loader pendant 1.5 secondes minimum
});

// Ajouter la classe loading au body dès le début
document.body.classList.add('loading');

// Initialiser le menu au chargement du DOM (compatible Safari)
document.addEventListener('DOMContentLoaded', () => {
    const navMenu = document.getElementById('nav-menu');
    if (navMenu) {
        navMenu.classList.remove('show');
        navMenu.style.right = '-100%';
        navMenu.style.transform = 'translateX(100%)';
        navMenu.style.webkitTransform = 'translateX(100%)';
    }
});

/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        // S'assurer que le menu est fermé au chargement (compatible Safari)
        nav.classList.remove('show');
        nav.style.right = '-100%';
        nav.style.transform = 'translateX(100%)';
        nav.style.webkitTransform = 'translateX(100%)';
        
        // Fonction pour ouvrir/fermer le menu
        const toggleMenu = (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            if (nav.classList.contains('show')) {
                nav.classList.remove('show');
                nav.style.right = '-100%';
                nav.style.transform = 'translateX(100%)';
                nav.style.webkitTransform = 'translateX(100%)';
            } else {
                nav.classList.add('show');
                nav.style.right = '0';
                nav.style.transform = 'translateX(0)';
                nav.style.webkitTransform = 'translateX(0)';
            }
        };
        
        // Support pour click et touchstart (Safari mobile)
        toggle.addEventListener('click', toggleMenu);
        toggle.addEventListener('touchend', toggleMenu);
        
        // Fermer le menu en cliquant en dehors (compatible Safari)
        const closeMenuOnOutsideClick = (e) => {
            if (!nav.contains(e.target) && !toggle.contains(e.target)) {
                nav.classList.remove('show');
                nav.style.right = '-100%';
                nav.style.transform = 'translateX(100%)';
                nav.style.webkitTransform = 'translateX(100%)';
            }
        };
        
        document.addEventListener('click', closeMenuOnOutsideClick);
        document.addEventListener('touchend', closeMenuOnOutsideClick);
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(e){
    e.preventDefault();
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class (compatible Safari)
    navMenu.classList.remove('show');
    navMenu.style.right = '-100%';
    navMenu.style.transform = 'translateX(100%)';
    navMenu.style.webkitTransform = 'translateX(100%)';
    
    // Scroll vers la section après fermeture du menu
    const targetId = this.getAttribute('href');
    if (targetId && targetId !== '#') {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            setTimeout(() => {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
        }
    }
}
navLink.forEach(n => {
    n.addEventListener('click', linkAction);
    n.addEventListener('touchend', linkAction);
})

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== HEADER SCROLL EFFECT =====*/
const header = document.querySelector('.l-header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

/*===== ANIMATION DES BARRES DE COMPÉTENCES =====*/
const animateSkills = () => {
    const skillsBars = document.querySelectorAll('.skills__bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width || getComputedStyle(bar).width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    skillsBars.forEach(bar => observer.observe(bar));
};

// Lancer l'animation au chargement
window.addEventListener('load', animateSkills);

/*===== PARALLAX EFFECT POUR L'IMAGE HOME =====*/
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const homeImg = document.querySelector('.home__img');
    if (homeImg) {
        homeImg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

/*===== ANIMATION AU SCROLL POUR LES CARTES =====*/
const animateCardsOnScroll = () => {
    const cards = document.querySelectorAll('.work__project-card, .veille__card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150);
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    cards.forEach(card => {
        observer.observe(card);
    });
};

// Lancer l'animation au chargement et au scroll
window.addEventListener('load', animateCardsOnScroll);
document.addEventListener('DOMContentLoaded', animateCardsOnScroll);

/*===== TYPING EFFECT POUR LE TITRE (OPTIONNEL) =====*/
const typingEffect = () => {
    const title = document.querySelector('.home__title');
    if (!title) return;
    
    const text = title.textContent;
    title.textContent = '';
    title.style.opacity = '1';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    // Démarrer après un court délai
    setTimeout(typeWriter, 500);
};

// Désactiver l'effet de typing pour l'instant car le HTML est déjà rempli
// typingEffect();

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200});
sr.reveal('.veille__card',{interval: 300, delay: 200});
sr.reveal('.timeline__title',{delay: 200});
sr.reveal('.timeline__item',{interval: 400, delay: 300, origin: 'bottom', distance: '50px'});

/*===== SMOOTH SCROLL POUR LES LIENS =====*/
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

/*===== ANIMATION DES CARTES PROJETS =====*/
const workCards = document.querySelectorAll('.work__img');
workCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

/*===== FORM VALIDATION ANIMATION =====*/
const contactInputs = document.querySelectorAll('.contact__input');
contactInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() !== '') {
            this.style.borderColor = 'var(--first-color)';
        } else {
            this.style.borderColor = 'var(--second-color)';
        }
    });
});

/*===== PARTICLES BACKGROUND (OPTIONNEL - LÉGER) =====*/
const createParticles = () => {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--first-color);
            border-radius: 50%;
            opacity: 0.3;
            animation: floatParticle ${10 + Math.random() * 20}s infinite ease-in-out;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        particlesContainer.appendChild(particle);
    }
    
    // Ajouter l'animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0%, 100% {
                transform: translate(0, 0);
            }
            25% {
                transform: translate(20px, -20px);
            }
            50% {
                transform: translate(-20px, 20px);
            }
            75% {
                transform: translate(20px, 20px);
            }
        }
    `;
    document.head.appendChild(style);
};

// Créer les particules au chargement
window.addEventListener('load', createParticles);

/*===== GESTION DES PROJETS - UPLOAD DE FICHIERS =====*/
const projectItems = document.querySelectorAll('.work__item');

projectItems.forEach((item, index) => {
    const fileInput = item.querySelector('.work__file-input');
    const previewContainer = item.querySelector('.work__preview-container');
    const placeholder = item.querySelector('.work__placeholder');
    
    fileInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        
        if (files.length > 0) {
            item.classList.add('has-files');
            
            files.forEach(file => {
                const previewItem = document.createElement('div');
                previewItem.className = 'work__preview-item';
                
                const removeBtn = document.createElement('button');
                removeBtn.className = 'work__remove-file';
                removeBtn.innerHTML = '<i class="bx bx-x"></i>';
                removeBtn.onclick = () => {
                    previewItem.remove();
                    if (previewContainer.children.length === 0) {
                        item.classList.remove('has-files');
                    }
                };
                
                if (file.type.startsWith('image/')) {
                    const img = document.createElement('img');
                    img.src = URL.createObjectURL(file);
                    img.alt = file.name;
                    previewItem.appendChild(img);
                    previewItem.appendChild(removeBtn);
                } else if (file.type.startsWith('video/')) {
                    const video = document.createElement('video');
                    video.src = URL.createObjectURL(file);
                    video.controls = true;
                    previewItem.appendChild(video);
                    previewItem.appendChild(removeBtn);
                } else {
                    // Fichier PDF, ZIP, etc.
                    const fileDiv = document.createElement('div');
                    fileDiv.className = 'work__preview-file';
                    const icon = document.createElement('i');
                    icon.className = 'bx bx-file';
                    const fileName = document.createElement('span');
                    fileName.textContent = file.name;
                    fileDiv.appendChild(icon);
                    fileDiv.appendChild(fileName);
                    previewItem.appendChild(fileDiv);
                    previewItem.appendChild(removeBtn);
                }
                
                previewContainer.appendChild(previewItem);
            });
        }
    });
});

/*===== FORMULAIRE DE CONTACT =====*/
const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message-text');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const message = document.getElementById('contact-message').value;
        
        // Validation des champs
        if (!name || !email || !message) {
            contactMessage.textContent = 'Veuillez remplir tous les champs.';
            contactMessage.classList.remove('success');
            contactMessage.classList.add('error');
            contactMessage.style.display = 'block';
            return;
        }
        
        // Créer le lien mailto avec les informations
        const subject = encodeURIComponent(`Contact depuis le portfolio - ${name}`);
        const body = encodeURIComponent(`Bonjour Abdelmalek,\n\nJe vous contacte depuis votre portfolio.\n\nMessage :\n${message}\n\nCordialement,\n${name}\nEmail : ${email}`);
        const mailtoLink = `mailto:abdelmalekelidrissi80@proton.me?subject=${subject}&body=${body}`;
        
        try {
            // Ouvrir le client email
            window.location.href = mailtoLink;
            
            // Afficher un message de confirmation
            contactMessage.textContent = 'Votre client email va s\'ouvrir. Merci pour votre message !';
            contactMessage.classList.remove('error');
            contactMessage.classList.add('success');
            contactMessage.style.display = 'block';
            
            // Réinitialiser le formulaire après 5 secondes
            setTimeout(() => {
                contactForm.reset();
                contactMessage.classList.remove('success');
                contactMessage.style.display = 'none';
            }, 5000);
        } catch (error) {
            contactMessage.textContent = 'Erreur lors de l\'envoi. Veuillez réessayer.';
            contactMessage.classList.remove('success');
            contactMessage.classList.add('error');
            contactMessage.style.display = 'block';
        }
    });
}

/*===== TOGGLE DARK/LIGHT MODE =====*/
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Vérifier le thème sauvegardé ou utiliser le thème système
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    body.classList.add('dark-mode');
    if (themeIcon) {
        themeIcon.className = 'bx bx-moon theme-icon';
    }
}

if (themeToggle && themeIcon) {
    themeToggle.addEventListener('click', () => {
        // Ajouter la classe de transition
        body.classList.add('theme-transitioning');
        
        // Attendre un court instant puis changer le thème
        setTimeout(() => {
            body.classList.toggle('dark-mode');
            
            if (body.classList.contains('dark-mode')) {
                themeIcon.className = 'bx bx-moon theme-icon';
                localStorage.setItem('theme', 'dark');
            } else {
                themeIcon.className = 'bx bx-sun theme-icon';
                localStorage.setItem('theme', 'light');
            }
            
            // Retirer la classe de transition après l'animation
            setTimeout(() => {
                body.classList.remove('theme-transitioning');
            }, 600);
        }, 50);
    });
}

/*===== MODAL CV - AGRANDIR L'APERÇU =====*/
const cvPreviewImg = document.getElementById('cv-preview-img');
const cvModal = document.getElementById('cv-modal');
const cvModalClose = document.getElementById('cv-modal-close');

if (cvPreviewImg && cvModal && cvModalClose) {
    // Ouvrir le modal au clic sur l'aperçu
    cvPreviewImg.addEventListener('click', () => {
        cvModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Fermer le modal
    cvModalClose.addEventListener('click', () => {
        cvModal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Fermer le modal en cliquant en dehors
    cvModal.addEventListener('click', (e) => {
        if (e.target === cvModal) {
            cvModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Fermer avec la touche Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cvModal.classList.contains('active')) {
            cvModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}
