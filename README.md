# LivreDeCave

## Introduction

**LivreDeCave** est une application de gestion de cave à vin permettant de :

- Ajouter, modifier, consommer et supprimer des vins.
- Trier et filtrer les vins par type, région, ou autres critères.
- Naviguer facilement entre les différentes catégories de vins grâce à une interface intuitive.

Ce projet utilise **Vue.js**, **Pinia**, et **Tauri** pour offrir une application moderne et performante.

---

## Fonctionnalités Principales

### 1. Gestion des Vins

- **Ajouter un vin** : Remplir un formulaire pour inclure un nouveau vin dans la base.
- **Modifier un vin** : Mettre à jour les informations d’un vin existant.
- **Consommer un vin** : Réduire le stock d’un vin.
- **Supprimer un vin** : Retirer un vin de la base.

### 2. Navigation

- **Accueil** : Vue d’ensemble de tous les vins.
- **Vins par régions** : Accéder aux vins triés par leur région d’origine.
- **Autres types de vins** : Catégories spécifiques comme Champagne, Pétillant, etc.
- **Historique** : Voir les actions passées (par exemple, vins consommés ou supprimés).

### 3. Filtres et Tri

- Filtrer les vins par critères tels que couleur, millésime, et région.
- Trier les vins par date d’achat, prix, ou autre colonne sélectionnée.

---

## Technologies Utilisées

- **Frontend** : Vue.js 3, Pinia, Tailwind CSS.
- **Backend** : Tauri, Rust.
- **Gestion de l’état** : Pinia.
- **Interface utilisateur** : Responsive avec Tailwind CSS.
- **Base de données** : JSON (fichier local).

---

## Installation et Exécution

### Pré-requis

- Node.js (v16 ou supérieur).
- Rust (v1.77 ou supérieur).
- Tauri CLI.

### Installation

Clonez le projet et installez les dépendances :

```bash
git clone <URL_du_projet>
cd livredecave
npm install
```

### Mode Développement

Lancer l’application en développement :

```bash
npm run tauri dev
```

### Build pour Production

Générer un installeur pour déployer l’application :

```bash
npm run tauri build
```

---

## Structure du Projet

### Frontend (Vue.js)

#### Components

- `AddWineModal.vue` : Modale pour ajouter un vin.
- `EditWineModal.vue` : Modale pour modifier un vin.
- `DrinkWineModal.vue` : Modale pour consommer un vin.
- `NavigationMenu.vue` : Barre de navigation.
- `WineTable.vue` : Tableau des vins.

#### Pages

- `CavePage.vue` : Page d'accueil, avec le résumé de tout les vins par couleur
- `HistoryPage.vue` : Historique des actions.
- `WineTypePage.vue` : Page pour afficher les vins par type.

#### Stores

- `wineStore.ts` : Gère l’état des vins avec Pinia.

### Backend (Rust)

#### `lib.rs`

- Définit les commandes pour manipuler les données de vins (ajout, modification, suppression, etc.).
- Utilise un fichier JSON pour stocker les données localement.

#### `main.rs`

- Point d’entrée de l’application.

---

## Idées pour la Version 2 (V2)

- **Import/Export des Données** : Exporter et importer les vins au format JSON.
- **Statistiques et Visualisations** : Graphiques pour visualiser les types, régions, ou autres données.
- **Thèmes Personnalisables** : Offrir des thèmes clairs et sombres.
- **Notifications** : Alertes pour les actions importantes (ex. consommation, suppression).
- **Tests Unitaires et End-to-End** : Ajouter des tests automatisés pour assurer la stabilité du projet.
- **Mise en Place de GitHub Actions** :
    - **CI/CD** : Automatiser les tests, les builds et les déploiements.
    - **Analyse de Code** : Intégrer des outils comme ESLint, Prettier, ou Clippy pour garantir un code propre et standardisé.
    - **Packaging Automatique** : Génération automatique des builds pour les plateformes supportées.
- **Support Multi-Langue** : Traduire l'application en plusieurs langues (ex. Anglais, Français).

---

## Remerciements

Merci à tous ceux qui ont contribué à ce projet. Vos retours et suggestions sont les bienvenus pour améliorer l’application.

---
