const axios = require('axios');

const { FLIGHT_SERVICE_PATH } = require('../config/serverConfig')
const {BookingRepository} = require('../repository/index');
const {ServiceError} = require('../utils/errors/index');

class BookingService{
    constructor(){
        this.bookingRepository = new BookingRepository();
    }
    async createBooking(data){
        try {
            const flightId=data.flightId;
            let getFlightRequestURL= `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
            const response = await axios.get(getFlightRequestURL);
            const flightData = response.data.data;
            let priceOfTheFlight = flightData.price;
            if(data.noOfSeats > flightData.totalSeats) {
                throw new ServiceError('Something went wrong in the booking process', 'Insufficient seats in the flight');
            }
            const totalCost = priceOfTheFlight * data.noOfSeats;
            const bookingPayload = {...data, totalCost};
            const booking = await this.bookingRepository.create(bookingPayload);
            const updateFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
            // console.log(updateFlightRequestURL);
            await axios.patch(updateFlightRequestURL, {totalSeats: flightData.totalSeats - booking.noOfSeats});
            const finalBooking = await this.bookingRepository.update(booking.id, {status: "Booked"});
            return finalBooking;
        } catch (error) {
            console.log(error);
            if(error.name == 'RepositoryError' || error.name == 'ValidationError') {
                throw error;
            }
            throw new ServiceError() ;
        }
    }
    // home work make update/cancel the booking

    async cancelBooking(bookingId){
        try {
            const booking = await this.bookingRepository.get(bookingId);
            let getFlightRequestURL= `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
            const response = await axios.get(getFlightRequestURL);
            // console.log(response);
            const flightData = response.data.data;
            if(booking.noOfSeats == 0){
                throw new ServiceError('Something went wrong in the booking process', 'no seats to cancel the flight');
            }
            const updateFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
            // console.log(updateFlightRequestURL);
            await axios.patch(updateFlightRequestURL, {totalSeats: flightData.totalSeats + booking.noOfSeats});
            console.log(bookingId);
            const finalBooking = await this.bookingRepository.update(bookingId, {status: "Cancelled", noOfSeats: 0});
            return finalBooking;
        } catch (error) {
            console.log(error);
            if(error.name == 'RepositoryError' || error.name == 'ValidationError') {
                throw error;
            }
            throw new ServiceError();
            
        }
    }
}
module.exports = BookingService;