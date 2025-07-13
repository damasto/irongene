# IronGene 
[Enhance your body](https://irongene.netlify.app/)
---

# Description
---
A single page application based in the future, log in and book your appointment at one of our Irongene clinics to upgrade your body to the next level.

# MVP
---
- SPA using React consisting of multiple views
- Frontend integrated with an express and node.js server backend
- User authentication and role based access
- A database hosted via MongoDB Atlas
- Performing CRUD actions:
>- C: Create bookings, clinics, users
>- R: Read and display clinics, bookings, profile data, users
>- U: Update bookings and users
>- D: Delete users, bookings 



# Backlog
- implement products and teams page functionalities
- Shopping cart, checkout and payment
- Fix bug when creating a new clinic
- Add edit functionality to clinics and bookings
- Add image property to clinics and upload via Cloudinary


# Features
- Sign up
- Sign in
- Authentication
- User & admin role
- View clinics
- Book clinic
- Select specific procedure
- View profile
- Change password, email or delete account
- System administration for Admin - creat, edit, delete clinics, bookings, users

# Installation

## 1. Clone the repository:
- git clone https://github.com/damasto/irongene
- cd irongene-client

## 2. Install dependencies:
npm install

# Development
npm run dev


# Folder Structure
<pre>
project-root/
├── public/ # Static assets (e.g., images, icons, manifest) 
│ └── images/ # Image files accessible via URL 
├── src/ # Source code
│ ├── api/ # API utility functions and service calls
│ ├── components/ # Reusable UI components
│ ├── context/ # React context providers for global state
│ ├── pages/ # Route-level components or views
│ ├── App.jsx # Root application component
│ └── main.jsx # Entry point for React (e.g., ReactDOM.render)
├── .gitignore
├── index.html
├── package-lock.json
├── package.json 
├──README.md
└── vite.config.js
</pre>


# Acknowledgements
- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [MUI](https://mui.com/)
- [Axios](https://axios-http.com/)
- [Motion](https://motion.dev/)


# Links

- [Trello](https://trello.com/b/8tdMbXSx/muggles-magic-market)
- [Presentation](https://docs.google.com/presentation/d/1d0hfJZPVnNRZYv-HnW_q43bWVexoFsWzaCw5zV3biEI/edit?usp=sharing)
- [Github-repository Frontend](https://github.com/damasto/irongene)
- [Github-repository Backend](https://github.com/angeleVG/magic-shop-backend)
- [Deployment Frontend](https://irongene.netlify.app/)
- [Deployment Backend](https://irongene-api.onrender.com)