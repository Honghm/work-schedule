var router = require('express').Router();
var bookingController = require('../controllers/booking.controller');
var auth = require('../middle-ware/auth');

router.get('/',auth.auth(), getListBookings);
router.post('/',auth.auth(), addBooking);
router.get('/:userId',auth.auth("Admin"), getListBookingByIdUser);
module.exports = router;


function getListBookings(req, res, next){
    var authorizationHeader = req.headers['authorization'];
    var token = authorizationHeader.split(' ')[1];
    auth.dataToken(token, (err, data)=>{
        if(err){
            console.log(err);
        }else{

            bookingController.getListBookings(data.userId, req.query)
            .then((user) => {
                return res.json(user)
            })
            .catch((err) => {
                return next(err);
            })
        }
    });
};
function getListBookingByIdUser(req, res, next){
  
    bookingController.getListBookings( req.params.userId, req.query)
    .then((user) => {
        return res.json(user)
    })
    .catch((err) => {
        return next(err);
    })
};

function addBooking(req, res,next) {
    var authorizationHeader = req.headers['authorization'];
    var token = authorizationHeader.split(' ')[1];
    auth.dataToken(token, (err, data)=>{
        if(err){
            console.log(err);
        }else{
            bookingController.addBooking(data.userId, req.body, (err,data)=>{
                if(err){
                    return next(err);
                }else{
                    return res.json(data)
                }
            });
            
        }
    });
}



