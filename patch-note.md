# Front de l'application

# API-REST

## Note du 19/11/2024

### routes/formation.js
- **GET /formation/:id** : Récupère une formation en fonction de l'id (En cours)
- **GET /formation** : Récupère la liste des formations (En cours)
- **PUT /formation/:id** : Modifie une formation en fonction de l'id avec les donnée passer dans le body (En cours)
- **POST /formation/add** : Ajoute une nouvelle formation avec les donnée passer dans le body (En cours)
- **DELETE /formation/:id** : Supprime une formation en fonction de l'id (En cours)

### routes/lycee.js
- **GET /lycee/:id** : Récupère un lycee en fonction de l'id (En cours)
- **GET /lycee** : Récupère la liste des lycees (En cours)
- **PUT /lycee/:id** : Modifie un lycee en fonction de l'id avec les donnée passer dans le body (En cours)
- **POST /lycee/add** : Ajoute un nouveau lycee avec les donnée passer dans le body (En cours)
- **DELETE /lycee/:id** : Supprime un lycee en fonction de l'id (En cours)

### POUR LE SITE IL FAUT INSTALL

   Il faut install react redux + toolkit react-redux + react  dnd

### Compnents site 
  - Card -> une carte avec nom formation ou nom categorie
  - listCard -> ensemble de cartes
  - Description -> bloc description dans le détail d'une formation
  - FilterCarte -> filtre lié a la carte ( ville + rayon de recherche)
  - FilterFiliere -> filtre lié a la recherche de formation ( recherche libre + categorie)
  - Hr -> bloc Hr dans le détail d'une formation
  - Image -> bloc Image dans le détail d'une formation
  - MainHeader -> header des pages
  - Title -> bloc titre dans la page détail d'une formation
  - Video -> bloc vidéo dans la page détail d'une formation

### Pages site
  - AdminSpace -> page de l'espace admin
  - detail -> page détail d'une formation
  - home -> page d'accueil
  - lycees -> page recherche lycées
  - options -> page liste des options ( à fusionner avec page techno )
  - techno -> page liste des filiere techno ( à fusionner avec page options)
  - pro -> page liste filierre pro ( pareila  fusionner avec techno et options)
  - spePremiere -> page liste spé de premiere plus la map

### Store site
Ajout du store mais avec les data du fichier data.json -> il faurda rajouter des truc une foisqu'on aura l'API
