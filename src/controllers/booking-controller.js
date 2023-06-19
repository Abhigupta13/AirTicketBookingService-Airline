const {BookingService}= require('../servises/index')
const { StatusCodes } = require('http-status-codes');
const bookingService = new BookingService();

const create =async(req, res)=> {
    try {
        const response = await bookingService.createBooking(req.body);
        return res.status(StatusCodes.OK).json({
            message: 'Successfully completed booking',
            success: true,
            err: {},
            data: response
        })
    } catch (error) {
        return res.status(error.statusCode).json({
            message: error.message,
            success: false,
            err: error.explanation,
            data: {}
        });
    }
}
const cancel =async(req, res)=> {
    try {
        const response = await bookingService.cancelBooking(req.params.id);
        return res.status(StatusCodes.OK).json({
            message: 'Successfully cancelled booking',
            success: true,
            err: {},
            data: response
        })
    } catch (error) {
        return res.status(error.statusCode).json({
            message: error.message,
            success: false,
            err: error.explanation,
            data: {}
        });
    }
}

 
module.exports={
    create,
    cancel
}