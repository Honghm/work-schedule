var Booking = require('../models/booking.model');
var itemBooking = require('../models/itemBooking.model')
module.exports = {
    getListBookings: getListBookings,
    addBooking: addBooking,
}


function getListBookings(userId,req) {
    var PAGE = req.page;
    console.log(req);
    var PAGE_SIZE = 10;
    if(PAGE){
        PAGE = parseInt(PAGE);
        if(req.pageSize){
             PAGE_SIZE = parseInt(req.pageSize);
        }
        var skip = (PAGE - 1) * PAGE_SIZE;
        return Booking.find({ userId: userId })
        .skip(skip)
        .limit(PAGE_SIZE)
        .then((data) => {
            return Promise.resolve(data)
        })
        .catch((err) => {
            return Promise.reject(err);
        })

    }else{
        return Booking.find({ userId: userId })
        .then((data) => {
            return Promise.resolve(data)
        })
        .catch((err) => {
            return Promise.reject(err);
        })
    }

   
}


function addBooking(userId, dataInput, result) {
    var dataBooking = {
        "userId": userId,
        "data": dataInput
    };
    Booking.create(dataBooking)
        .then(data => {
            result(null, data);
        })
        .catch(err => {
            result(err, null);
        }); 

}