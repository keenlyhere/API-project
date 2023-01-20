# Deja-Moo AirBnB Clone Project

Link to live site on Render:
https://airbnb-clone-3h5b.onrender.com/spots/19

## About Deja-Moo
Deja-Moo is a full-stack clone of AirBnB. It currently allows for users to view, create, edit, and delete both spots and reviews.

## Technologies Used
- JavaScript
- Node.js
- Express.js
- Sequelize
- SQLite
- React
- Redux

## Getting Started

# Installation
1. Clone this repo
2. `cd` into the backend folder and `npm install` to install the dependencies
3. Run the migration and seeders
```
npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all
```
4. Run `npm start` to start the backend server
5. `cd` into the frontend folder and `npm install` to install the dependencies.
6. Run `npm start` to start the frontend server

## Usage

# Home Page Demo User

![image](https://user-images.githubusercontent.com/112213882/213587779-e5c516b2-89d3-4beb-9106-a3d693941978.png)

# Log in

You can test all the features by clicking the "Demo" button in the login modal.

<img width="1484" alt="image" src="https://user-images.githubusercontent.com/112213882/213590950-107a80c2-2b5c-493b-aab3-72998d6b7869.png">

# Create A Spot

You can create a spot by clicking on the "Deja-Moo your home" button, when logged in.

<img width="1497" alt="image" src="https://user-images.githubusercontent.com/112213882/213591255-e9ccde2a-4fb3-4f3f-bb50-82edf485b576.png">

# Spot Details

If you own the spot, you will be able to edit and delete the spot by clicking on the "Edit Spot" and "Delete Spot" buttons.

<img width="1492" alt="image" src="https://user-images.githubusercontent.com/112213882/213591669-5c10217f-cbce-4a05-8857-2c91500aa0f6.png">

If you do not own the spot, you will be able to leave a review by filling out the "Leave a public review" form.

<img width="1492" alt="image" src="https://user-images.githubusercontent.com/112213882/213591825-52ee9d7e-d538-4e2e-b400-3dd196a5566e.png">

# Reviews

You can edit and delete reviews that you have made for a spot.

<img width="1493" alt="image" src="https://user-images.githubusercontent.com/112213882/213592044-88ce9853-7ce1-4c90-b3f0-f18be86ac5e9.png">

## Roadmap
- View, create, edit, and delete bookings feature
- Enable search functionality to filter spots
