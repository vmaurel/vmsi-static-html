# 🌍 Système d'Internationalisation VMSI

## Langues supportées
- 🇫🇷 **Français** (fr) - Langue par défaut
- 🇬🇧 **Anglais** (en) 
- 🇩🇪 **Allemand** (de)
- 🇪🇸 **Espagnol** (es)

## Structure des fichiers

### Traductions
```
locales/
├── fr.json    # Français (défaut)
├── en.json    # Anglais
├── de.json    # Allemand
└── es.json    # Espagnol
```

### Scripts et styles
```
js/i18n.js     # Système d'internationalisation
css/i18n.css   # Styles pour sélecteur de langue
test-i18n.html # Page de test du système
```

## Comment utiliser

### 1. Attributs HTML pour la traduction

#### Contenu de texte
```html
<h1 data-i18n="hero.title">Texte par défaut</h1>
<p data-i18n="services.description">Description par défaut</p>
```

#### Attributs placeholder
```html
<input type="text" data-i18n-placeholder="contact.form.name" placeholder="Défaut">
```

### 2. Structure des clés de traduction

Les clés utilisent la notation pointée :
```
navigation.home          → "Accueil"
hero.title              → "Solutions Innovantes..."
services.web.title      → "Développement Web"
contact.form.email      → "Votre email"
```

### 3. Sélecteur de langue

```html
<select id="language-selector" class="language-selector">
    <option value="fr">🇫🇷 Français</option>
    <option value="en">🇬🇧 English</option>
    <option value="de">🇩🇪 Deutsch</option>
    <option value="es">🇪🇸 Español</option>
</select>
```

## API JavaScript

### Méthodes principales

```javascript
// Changer de langue
await window.i18n.changeLanguage('en');

// Obtenir une traduction
const text = window.i18n.t('hero.title');

// Langue actuelle
const lang = window.i18n.getCurrentLanguage();

// Langues supportées
const langs = window.i18n.getSupportedLanguages();
```

### Événements

```javascript
// Écouter les changements de langue
window.addEventListener('languageChanged', (e) => {
    console.log('Nouvelle langue:', e.detail.language);
});
```

## Détection automatique

Le système détecte automatiquement la langue dans cet ordre :
1. **Paramètre URL** : `?lang=en`
2. **localStorage** : Langue sauvegardée
3. **Navigateur** : `navigator.language`
4. **Défaut** : Français (fr)

## Fonctionnalités

### ✅ Implémenté
- ✅ Détection automatique langue navigateur
- ✅ Sélecteur de langue avec drapeaux
- ✅ Sauvegarde préférence utilisateur
- ✅ Mise à jour URL avec paramètre `lang`
- ✅ Fallback vers français en cas d'erreur
- ✅ Support meta tags (title, description, keywords)
- ✅ Support Open Graph
- ✅ Système de cache des traductions
- ✅ Attributs placeholder traduits
- ✅ Événements JavaScript personnalisés

### 🚧 À faire
- 🚧 Internationaliser toutes les pages du site
- 🚧 Traductions des pages Extended Wallet
- 🚧 Pages légales multilingues
- 🚧 Guide d'installation multilingue
- 🚧 Gestion RTL pour futures langues arabes/hébraïques

## Structure JSON des traductions

```json
{
  "meta": {
    "lang": "fr",
    "title": "Titre de la page",
    "description": "Description pour SEO",
    "keywords": "mots, clés, seo"
  },
  "navigation": {
    "home": "Accueil",
    "services": "Services"
  },
  "hero": {
    "title": "Titre principal",
    "subtitle": "Sous-titre"
  },
  "contact": {
    "form": {
      "name": "Votre nom",
      "email": "Votre email"
    }
  }
}
```

## Test du système

1. **Page de test** : `test-i18n.html`
2. **Console navigateur** : Vérifier les logs i18n
3. **Paramètre URL** : `?lang=en` pour forcer une langue
4. **localStorage** : Vérifier `vmsi-language`

## SEO et référencement

- **URLs avec langue** : `?lang=en` ajouté automatiquement
- **Meta tags traduits** : title, description, keywords
- **Attribut lang** : `<html lang="en">` mis à jour
- **Open Graph** : og:title et og:description traduits
- **hreflang** : À implémenter pour chaque page

## Performance

- **Chargement à la demande** : Les traductions sont chargées seulement quand nécessaire
- **Cache** : Les traductions sont mises en cache côté client
- **Optimisation** : Minification recommandée pour la production

## Support navigateurs

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile (iOS Safari, Chrome Mobile)

---

**Développé pour VMSI Solutions - Système d'internationalisation moderne et performant** 🚀