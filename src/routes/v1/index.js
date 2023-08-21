const express =require('express');
const BookingController = require('../../controllers/booking-controller');
// const {createChannel}= require('../../utils/messageQueue')

// const channel=await createChannel();
const bookingController = new BookingController();
const router = express.Router();

router.get('/info', (req,res)=>{
    return res.json({message: 'Response from Booking service routes'});
})
router.post('/bookings',bookingController.create);
router.post('/publish',bookingController.sendMessageToQueue);
router.post('/bookings/:id',bookingController.cancel);



module.exports =router;