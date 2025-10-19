/**
 * Système d'internationalisation (i18n) pour VMSI
 * Supporte: Français (fr), Anglais (en), Allemand (de), Espagnol (es)
 */

class I18n {
    constructor() {
        this.currentLang = 'fr'; // Langue par défaut
        this.supportedLangs = ['fr', 'en', 'de', 'es'];
        this.translations = {};
        this.fallbackLang = 'fr';
        
        // Détection automatique de la langue du navigateur
        this.detectBrowserLanguage();
        
        // Initialisation
        this.init();
    }

    /**
     * Détecte la langue du navigateur
     */
    detectBrowserLanguage() {
        // Priorité: paramètre URL > localStorage > langue navigateur > défaut
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');
        
        if (urlLang && this.supportedLangs.includes(urlLang)) {
            this.currentLang = urlLang;
            return;
        }

        // Vérifier localStorage
        const savedLang = localStorage.getItem('vmsi-language');
        if (savedLang && this.supportedLangs.includes(savedLang)) {
            this.currentLang = savedLang;
            return;
        }

        // Détection langue navigateur
        const browserLang = navigator.language || navigator.userLanguage;
        const langCode = browserLang.split('-')[0]; // 'en-US' -> 'en'
        
        if (this.supportedLangs.includes(langCode)) {
            this.currentLang = langCode;
        }
    }

    /**
     * Initialise le système i18n
     */
    async init() {
        try {
            await this.loadTranslations(this.currentLang);
            this.updateHTML();
            this.setupLanguageSelector();
            this.updateURL();
            
            // Sauvegarder la langue choisie
            localStorage.setItem('vmsi-language', this.currentLang);
            
            console.log(`🌍 Language initialized: ${this.currentLang}`);
        } catch (error) {
            console.error('Erreur d\'initialisation i18n:', error);
            // Fallback vers français en cas d'erreur
            if (this.currentLang !== this.fallbackLang) {
                this.currentLang = this.fallbackLang;
                await this.init();
            }
        }
    }

    /**
     * Charge les traductions pour une langue donnée
     */
    async loadTranslations(lang) {
        if (this.translations[lang]) {
            return; // Déjà chargé
        }

        try {
            const response = await fetch(`/locales/${lang}.json`);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            this.translations[lang] = await response.json();
        } catch (error) {
            console.error(`Erreur chargement ${lang}.json:`, error);
            throw error;
        }
    }

    /**
     * Obtient une traduction par clé
     */
    t(key, fallback = '') {
        const keys = key.split('.');
        let value = this.translations[this.currentLang];
        
        // Navigation dans l'objet JSON
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                value = null;
                break;
            }
        }
        
        // Fallback vers français si traduction manquante
        if (value === null && this.currentLang !== this.fallbackLang) {
            const fallbackValue = this.translations[this.fallbackLang];
            let fallbackResult = fallbackValue;
            
            for (const k of keys) {
                if (fallbackResult && typeof fallbackResult === 'object' && k in fallbackResult) {
                    fallbackResult = fallbackResult[k];
                } else {
                    fallbackResult = null;
                    break;
                }
            }
            
            value = fallbackResult;
        }
        
        return value || fallback || key;
    }

    /**
     * Met à jour le HTML avec les traductions
     */
    updateHTML() {
        // Mise à jour des meta tags
        document.documentElement.lang = this.currentLang;
        document.title = this.t('meta.title');
        
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.content = this.t('meta.description');
        }
        
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
            metaKeywords.content = this.t('meta.keywords');
        }

        // Mise à jour Open Graph
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            ogTitle.content = this.t('meta.title');
        }
        
        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) {
            ogDesc.content = this.t('meta.description');
        }

        // Mise à jour du contenu avec data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            
            if (element.getAttribute('data-i18n-target') === 'placeholder') {
                element.placeholder = translation;
            } else {
                element.innerHTML = translation;
            }
        });

        // Mise à jour des éléments avec des attributs spéciaux
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = this.t(key);
        });
    }

    /**
     * Configure le sélecteur de langue
     */
    setupLanguageSelector() {
        const selector = document.querySelector('#language-selector');
        if (!selector) return;

        // Mise à jour de la valeur actuelle
        selector.value = this.currentLang;

        // Gestion du changement de langue
        selector.addEventListener('change', async (e) => {
            const newLang = e.target.value;
            if (newLang !== this.currentLang) {
                await this.changeLanguage(newLang);
            }
        });
    }

    /**
     * Change la langue
     */
    async changeLanguage(newLang) {
        if (!this.supportedLangs.includes(newLang)) {
            console.error(`Langue non supportée: ${newLang}`);
            return;
        }

        try {
            this.currentLang = newLang;
            await this.loadTranslations(newLang);
            this.updateHTML();
            this.updateURL();
            
            // Sauvegarder la préférence
            localStorage.setItem('vmsi-language', newLang);
            
            console.log(`🌍 Language changed to: ${newLang}`);
            
            // Événement personnalisé pour d'autres scripts
            window.dispatchEvent(new CustomEvent('languageChanged', { 
                detail: { language: newLang } 
            }));
            
        } catch (error) {
            console.error('Erreur changement langue:', error);
        }
    }

    /**
     * Met à jour l'URL avec le paramètre de langue
     */
    updateURL() {
        const url = new URL(window.location);
        url.searchParams.set('lang', this.currentLang);
        
        // Mise à jour sans recharger la page
        window.history.replaceState({}, '', url.toString());
    }

    /**
     * Obtient la langue actuelle
     */
    getCurrentLanguage() {
        return this.currentLang;
    }

    /**
     * Obtient toutes les langues supportées
     */
    getSupportedLanguages() {
        return this.supportedLangs;
    }

    /**
     * Vérifie si une langue est supportée
     */
    isLanguageSupported(lang) {
        return this.supportedLangs.includes(lang);
    }
}

// Instance globale
window.i18n = new I18n();

// Export pour modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = I18n;
}