// Tunnel de vente - Extended Wallet - JavaScript interactif
document.addEventListener('DOMContentLoaded', function() {
    
    // Configuration du countdown
    initCountdown();
    
    // Animations et effets visuels
    initAnimations();
    
    // Tracking des interactions
    initTracking();
    
    // Gestion du bouton Stripe
    initStripeIntegration();
});

// Fonction de countdown avec urgence
function initCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;

    // Récupération ou création de l'heure de fin
    let endTime = localStorage.getItem('countdown_end');
    if (!endTime) {
        // Défini le countdown à 24 heures à partir de maintenant
        endTime = new Date().getTime() + (24 * 60 * 60 * 1000);
        localStorage.setItem('countdown_end', endTime);
    } else {
        endTime = parseInt(endTime);
    }

    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = endTime - now;

        if (timeLeft <= 0) {
            // Countdown terminé - augmentation du prix
            showPriceIncrease();
            return;
        }

        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        // Mise à jour de l'affichage
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');

        if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
        if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
        if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');

        // Effet d'urgence quand il reste moins de 1 heure
        if (timeLeft < 3600000) {
            countdownElement.classList.add('urgent');
        }
    }

    // Mise à jour toutes les secondes
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Gestion de l'augmentation de prix
function showPriceIncrease() {
    // Mise à jour de tous les prix sur la page
    const currentPrices = document.querySelectorAll('.current-price, .new-price');
    const oldPrices = document.querySelectorAll('.old-price');

    currentPrices.forEach(price => {
        price.textContent = '67€';
        price.style.color = '#e74c3c';
    });

    oldPrices.forEach(price => {
        price.textContent = '97€';
    });

    // Notification d'augmentation
    showNotification('⚠️ Le prix promotionnel a expiré. Nouveau prix : 67€', 'warning');
    
    // Mise à jour du texte d'urgence
    const urgencySection = document.querySelector('.urgency');
    if (urgencySection) {
        urgencySection.innerHTML = `
            <div class="container">
                <div class="urgency-box">
                    <h2><i class="fas fa-exclamation-triangle"></i> Prix promotionnel expiré</h2>
                    <p>L'extension est maintenant à son prix normal de 67€</p>
                    <p class="limited-spots">⚠️ Plus que 15 licences disponibles à ce prix</p>
                </div>
            </div>
        `;
    }
}

// Gestion de l'intégration Stripe
function initStripeIntegration() {
    // Attendre que le bouton Stripe soit chargé
    const checkStripeButton = setInterval(() => {
        const stripeButton = document.querySelector('stripe-buy-button');
        if (stripeButton) {
            clearInterval(checkStripeButton);
            
            // Tracking du clic sur le bouton Stripe
            stripeButton.addEventListener('click', function() {
                trackEvent('stripe_button_click', {
                    product: 'Extended Wallet',
                    price: getCurrentPrice()
                });
            });
            
            // Ajouter une classe pour le styling personnalisé
            stripeButton.classList.add('stripe-button-loaded');
        }
    }, 100);
}

// Gestion du formulaire de commande (simplifié pour Stripe)
function initOrderForm() {
    // Cette fonction est maintenant obsolète car nous utilisons Stripe
    // Conservée pour compatibilité avec d'autres parties du code
    console.log('Paiement géré par Stripe');
}

// Animations et effets visuels
function initAnimations() {
    // Animation des éléments au scroll
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observer les éléments à animer
    const animatedElements = document.querySelectorAll('.feature-card, .testimonial, .faq-item, .problem-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Effet de parallax léger sur le hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroVisual = document.querySelector('.hero-visual');
        if (heroVisual && scrolled < window.innerHeight) {
            heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });
}

// Tracking des interactions
function initTracking() {
    // Tracking des clics sur les CTA
    const ctaButtons = document.querySelectorAll('.btn-cta');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            trackEvent('cta_click', {
                button_text: this.textContent.trim(),
                position: this.closest('section')?.className || 'unknown',
                product: 'Extended Wallet'
            });
        });
    });

    // Tracking du temps passé sur la page
    let startTime = new Date().getTime();
    window.addEventListener('beforeunload', function() {
        const timeSpent = new Date().getTime() - startTime;
        trackEvent('time_on_page', {
            duration: Math.round(timeSpent / 1000),
            product: 'Extended Wallet'
        });
    });

    // Tracking de la profondeur de scroll
    let maxScroll = 0;
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            
            // Points de tracking
            if (maxScroll >= 25 && !sessionStorage.getItem('scroll_25')) {
                sessionStorage.setItem('scroll_25', 'true');
                trackEvent('scroll_depth', { depth: 25, product: 'Extended Wallet' });
            }
            if (maxScroll >= 50 && !sessionStorage.getItem('scroll_50')) {
                sessionStorage.setItem('scroll_50', 'true');
                trackEvent('scroll_depth', { depth: 50, product: 'Extended Wallet' });
            }
            if (maxScroll >= 75 && !sessionStorage.getItem('scroll_75')) {
                sessionStorage.setItem('scroll_75', 'true');
                trackEvent('scroll_depth', { depth: 75, product: 'Extended Wallet' });
            }
            if (maxScroll >= 90 && !sessionStorage.getItem('scroll_90')) {
                sessionStorage.setItem('scroll_90', 'true');
                trackEvent('scroll_depth', { depth: 90, product: 'Extended Wallet' });
            }
        }
    });

    // Tracking spécifique pour Stripe
    window.addEventListener('message', function(event) {
        // Écouter les événements de Stripe (succès, échec, etc.)
        if (event.origin === 'https://js.stripe.com') {
            if (event.data && event.data.type) {
                trackEvent('stripe_event', {
                    event_type: event.data.type,
                    product: 'Extended Wallet'
                });
            }
        }
    });
}

// Fonctions utilitaires
function scrollToOrder() {
    const orderSection = document.getElementById('order');
    if (orderSection) {
        orderSection.scrollIntoView({ behavior: 'smooth' });
        trackEvent('scroll_to_order', { 
            source: 'hero_cta',
            product: 'Extended Wallet'
        });
    }
}

function getCurrentPrice() {
    const priceElement = document.querySelector('.current-price, .new-price');
    return priceElement ? priceElement.textContent : '28€';
}

function trackEvent(eventName, properties = {}) {
    // Simulation du tracking (remplacer par votre solution d'analytics)
    console.log('Track Event:', eventName, properties);
    
    // Ici vous pourriez intégrer Google Analytics, Mixpanel, etc.
    // gtag('event', eventName, properties);
    
    // Exemple d'intégration avec Facebook Pixel
    // if (typeof fbq !== 'undefined') {
    //     fbq('track', eventName, properties);
    // }
}

// Fonctions exposées globalement
window.scrollToOrder = scrollToOrder;