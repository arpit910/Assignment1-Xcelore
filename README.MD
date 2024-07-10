
## MERN Stack Application:

This is a basic MERN (MongoDB, Express.js, React.js, Node.js) stack application. Follow the instructions below to set up and run the application on your local machine.

## Prerequisites

Make sure you have the following installed on your machine:

*Node.js (v14.x or later)
*npm (v6.x or later)
*MongoDB (v4.x or later)


## Installation:
Create a .env file in the root directory of the project and add the following environment variables:





## Install server dependencies:

```
cd backend
npm install
```


## Install client dependencies:
```
cd ../frontend
npm install
```


## Running the Application:

### Start the MongoDB server:
Make sure your MongoDB server is running. You can start it using the following command (depending on your installation):

`mongod`


### Run the backend server:

Open a terminal and navigate to the backend directory, then run:
`npm run dev`
This will start the backend server on the port specified in the .env file (default is 5000).



### Run the frontend server:
Open another terminal, navigate to the frontend directory, then run:
`npm start`




## Folder structure
```
.
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── server.js
│   └── ...
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── App.js
│   │   ├── index.js
│   │   └── ...
└── .env
```

## Defaults:
``` 
ADMIN_EMAIL="arpit@gmail.com"
ADMIN_PASSWORD='admin@123'
```


