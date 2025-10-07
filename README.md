# Site Web VMSI - Vincent Maurel Software & Innovation

Site web statique professionnel pour VMSI, entreprise spécialisée dans le développement de solutions logicielles.

## 🚀 Fonctionnalités

- **Design moderne et responsive** - Compatible tous appareils
- **SEO optimisé** - Meta tags, structure sémantique
- **Animations fluides** - Transitions CSS et JavaScript
- **Navigation mobile** - Menu hamburger responsive
- **Formulaire de contact** - Validation côté client
- **Section produit** - Présentation de l'extension Vinted Wallet Stats

## 📁 Structure du projet

```
vmsi-static-html/
├── index.html          # Page principale
├── css/
│   └── styles.css      # Styles CSS avec variables personnalisables
├── js/
│   └── script.js       # Interactions JavaScript
└── README.md           # Documentation
```

## 🎨 Personnalisation des couleurs

Le site utilise des variables CSS pour une personnalisation facile. Trois thèmes sont préconfigurés dans le fichier `css/styles.css` :

### Thème 1 : Bleu Tech (Actuel)
```css
--primary-color: #0066cc;
--primary-dark: #004499;
--primary-light: #3385d1;
--secondary-color: #00d4aa;
--accent-color: #ff6b35;
```

### Thème 2 : Violet Moderne
```css
--primary-color: #6c5ce7;
--primary-dark: #5a4dd4;
--primary-light: #8b7ed8;
--secondary-color: #fd79a8;
--accent-color: #fdcb6e;
```

### Thème 3 : Vert Corporate
```css
--primary-color: #00b894;
--primary-dark: #00a085;
--primary-light: #55c3a3;
--secondary-color: #0984e3;
--accent-color: #e17055;
```

**Pour changer de thème :**
1. Ouvrez `css/styles.css`
2. Commentez les variables du thème actuel (lignes 4-8)
3. Décommentez les variables du thème souhaité

## 📱 Sections du site

### 🏠 Accueil (Hero)
- Titre accrocheur avec animation
- Description des services
- Boutons d'action
- Animation de code en arrière-plan

### 🛠️ Services
- 4 cartes de services principales
- Technologies utilisées
- Icônes et animations au survol

### 👨‍💼 À propos
- Présentation de Vincent Maurel et VMSI
- Statistiques de l'entreprise
- Section profil avec placeholder

### 🎯 Vinted Wallet Stats
- Présentation détaillée de l'extension
- Fonctionnalités principales
- Prix et call-to-action
- Placeholders pour captures d'écran

### 📞 Contact
- Informations de contact (placeholders)
- Lien LinkedIn
- Formulaire de contact fonctionnel
- Validation côté client

## 🔧 Installation et utilisation

1. **Cloner ou télécharger** le projet
2. **Ouvrir** `index.html` dans un navigateur
3. **Personnaliser** le contenu selon vos besoins

### Modifications recommandées :

#### Optimisations SEO à compléter :
- [ ] Ajouter des images avec attributs `alt`
- [ ] Compléter les méta descriptions
- [ ] Ajouter un favicon
- [ ] Configurer Google Analytics si nécessaire

## 📋 Fonctionnalités techniques

### CSS
- Variables CSS pour personnalisation facile
- Flexbox et CSS Grid pour le layout
- Animations et transitions fluides
- Media queries pour responsive design
- Hover effects et interactions

### JavaScript
- Navigation mobile avec menu hamburger
- Scroll smooth entre sections
- Highlighting de la section active
- Animations au scroll (Intersection Observer)
- Compteurs animés pour les statistiques
- Validation de formulaire
- Notifications toast
- Effet parallax léger

### SEO
- Structure HTML5 sémantique
- Meta tags Open Graph
- Navigation par ancres
- Optimisation des performances
- Accessibilité de base

## 🎯 Vinted Wallet Stats - Extension Chrome

L'extension présentée sur le site offre :

- **Statistiques détaillées** : Total ventes, achats, bénéfices
- **Export CSV** : Téléchargement des données mensuelles  
- **Recherche avancée** : Filtrage des transactions
- **Prix** : 28€ (paiement unique)

## 🚀 Déploiement

Le site est entièrement statique et peut être déployé sur :
- GitHub Pages
- Netlify
- Vercel
- Hébergeur web traditionnel

Aucune configuration serveur requise.

## 📞 Support

Pour toute question ou personnalisation :
- LinkedIn : [Vincent Maurel](https://www.linkedin.com/in/vincent-maurel-6324a632/)
- Email : contact@vmsi.fr (à configurer)

---

**Développé avec ❤️ par VMSI - Vincent Maurel Software & Innovation**