# Amazon-Clone-MERN
This is a full stack application built in javascript similar to amazon website.
Steps to run this project locally:
### 1) Run client side
   1. `cd client`
   2. `yarn i`
   3. `yarn start`
   
### 2) Run server side
   1. `Create .env file in root directory`
   2. `Add the following environment variable`
     *PORT = 5000
     *CLIENT_URL = http://localhost:3000
     *MONGODB_URL = <your-mongodb-atlas-cluster-database-url>
     *JWT_ACCOUNT_ACTIVATION= <your-accout-activation-jwt-secret>
     *JWT_SECRET = <your-jwt-secret>
     *JWT_RESET_PASSWORD = <your-jwt-reset-password-secret>
     *EMAIL = noreply@ethereal.com
     *JWT_PROFILE_UPDATION = <your-jwt-profile-updation-secret>
   3. `yarn i`
   4. `yarn start`
