# Welcome to Flight Booking Service for Airline project

## Project Setup

### Clone the Repository
To set up the project on your local machine, start by cloning the repository:

```bash
git clone https://github.com/Abhigupta13/AirTicketBookingService-Airline.git
cd AirTicketBookingService-Airline
```

### Install Dependencies
Navigate to the root directory of the project and install the necessary dependencies:

```bash
npm install
```

### Environment Variables
Create a `.env` file in the root directory and add the following environment variables:

```env
PORT=3000
DB_USERNAME=<YOUR_DB_LOGIN_NAME>
DB_PASSWORD=<YOUR_DB_PASSWORD>
DB_NAME=BookingService_DB_DEV
DB_HOST=127.0.0.1
DB_DIALECT=mysql
```

### Database Configuration
Inside the `src/config` folder, create a new file `config.json` and add the following JSON configuration:

```json
{
  "development": {
    "username": "<YOUR_DB_LOGIN_NAME>",
    "password": "<YOUR_DB_PASSWORD>",
    "database": "BookingService_DB_DEV",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

### Database Setup
Once you've configured your database settings, go to the `src` folder from your terminal and execute the following commands to set up the database:

```bash
npx sequelize db:create
npx sequelize db:migrate
```

## DB Design
The database design includes the following tables:

- **User**: Stores user information.
  - Fields: id, name, email, password, created_at, updated_at
- **Booking**: Stores booking information.
  - Fields: id, user_id, flight_id, status, created_at, updated_at
  - Relationships: 
    - A booking belongs to a user, and a user can have multiple bookings (one-to-many).
    - A booking belongs to a flight, and a flight can have multiple bookings (one-to-many).
- **Flight**: Stores flight information. (This table should be synced with the Flight Search Service)
  - Fields: id, airplane_id, departure_airport_id, arrival_airport_id, departure_time, arrival_time, price, created_at, updated_at

### Creating Models
To generate the Booking model, use the following command:

```bash
npx sequelize model:generate --name Booking --attributes userId:integer,flightId:integer,status:String
```

Continue generating models for the other entities (User, Flight) as needed.

For detailed implementation and additional setup, refer to the service's codebase.
