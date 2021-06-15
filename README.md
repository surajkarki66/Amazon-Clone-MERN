# Amazon-Clone-MERN
This is a full stack application built in javascript similar to amazon website.
Steps to run this project locally:
### 1) Run client side
   i) `cd client`
   ii) `yarn i`
   ii) `yarn start`
   
### 2) Run server side
   i) `Create .env file in root directory`
   ii) `Add the following environment variable`
     * PORT = 5000
     * CLIENT_URL = http://localhost:3000
     * MONGODB_URL = <your-mongodb-atlas-cluster-database-url>
     * JWT_ACCOUNT_ACTIVATION= <your-accout-activation-jwt-secret>
     * JWT_SECRET = <your-jwt-secret>
     * JWT_RESET_PASSWORD = <your-jwt-reset-password-secret>
     * EMAIL = noreply@ethereal.com
     * JWT_PROFILE_UPDATION = <your-jwt-profile-updation-secret>
   iii) `yarn i`
   iV) `yarn start`
