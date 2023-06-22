#### Booking Service for Airline


` Starting new service`

 - commands
 
 for step-1
 ```
    npm init
    npm i express
    npm i body-parser
    npm i http-status-codes
    npm i mysql2
    npm i sequelize
    npm i sequelize-cli
    npm i nodemon  -> "start": "npx nodemon src/index.js"  in package.json script
    npm i dotenv
    npm i morgan
```
 step-2 after setup basic express server
 ```
    npx sequelize init
    npx sequelize db:create
    npx sequelize model:generate --name Booking --attributes flightId:integer,userId:integer,status:enum
    npx sequelize migration:create --name modify_bookings_add_new_fields
    npx sequelize db:migrate
```
```
    npm i amqplib
```