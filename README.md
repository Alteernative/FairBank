# FairBank

FairBank est une application web bancaire transparente et éthique, développée dans le cadre du cours INM5151 à l'UQAM. Ce projet vise à offrir une plateforme de services bancaires innovante et sans intérêts. FairBank propose une gamme de fonctionnalités, notamment la gestion des transactions, la personnalisation de l'interface utilisateur, et une page dédiée aux administrateurs pour une gestion avancée des utilisateurs et des services.

## Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Structure du projet](#structure-du-projet)
- [Contributeurs](#contributeurs)
- [Licence](#licence)

## Fonctionnalités

- **Création de compte** : Permet aux utilisateurs de créer un compte bancaire.
- **Authentification** : Gestion sécurisée de l'authentification des utilisateurs.
- **Gestion de compte utilisateur** : Vue et modification des informations utilisateur.
- **Transactions** : Réalisation de transactions entre utilisateurs.
- **Historique des transactions** : Suivi des transactions effectuées.
- **Page administrateur** : Vue des activités globale du site. Gère les demandes des utilisateurs.
- **Courriels personnalisés** : courriel de bienvenue, courriel de changement de mot de passe, courriel de newsletter, et courriel de confirmation de suppression de compte.

## Technologies utilisées

### Frontend
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Shadcn UI](https://shadcn.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router Dom](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [react-hook-form](https://react-hook-form.com/)
- [zod](https://github.com/colinhacks/zod)
- [i18n](https://react.i18next.com)

### Backend
- [Django](https://www.djangoproject.com/)
- [Django REST framework](https://www.django-rest-framework.org/)

### Base de données 
- Sqlite3
  
## Installation

### Prérequis

- Node.js
- npm
- Python
- pip
- Fureteur web moderne

### Instructions

#### Cloner le dépôt

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/Alteernative/FairBank.git
   cd fairbank
   ```

#### Installer les dépendances du frontend

2. Installez les dépendances du frontend :
   ```bash
   cd frontend
   npm install
   ```

#### Installer les dépendances du backend

3. Installez les dépendances du backend :

##### macOS et Linux

   ```bash
   cd ../backend
   python3 -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   ```

##### Windows

   ```bash
   cd ../backend
   python -m venv .venv
   .venv\Scripts\activate
   pip install -r requirements.txt
   ```

#### Configurer la base de données

4. Configurez la base de données :
   ```bash
   python manage.py migrate
   ```

#### Démarrer les serveurs de développement

5. Démarrez les serveurs de développement :

##### Frontend

   ```bash
   cd frontend
   npm run dev
   ```

##### Backend

   ```bash
   cd ../backend
   python manage.py runserver
   ```

## Utilisation

1. Ouvrez votre navigateur et accédez à `http://localhost:5173` pour utiliser l'interface utilisateur de l'application.
2. Utilisez les fonctionnalités disponibles pour créer un compte, effectuer des transactions, modifier l'apparence du site, etc.

## Structure du projet

- `frontend/` : Contient le code source du frontend.
- `backend/` : Contient le code source du backend.
- `README.md` : Documentation du projet.

## Contributeurs

- [Khalladi, Issam](https://www.linkedin.com/in/issamkhalladi/)
- [Jdaini, Mohammed Ali](https://www.linkedin.com/in/mohammed-ali-jdaini/)
- [Mihai, Dragomir Emilian](https://www.linkedin.com/in/dragomir-mihai/)

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus d'informations.
