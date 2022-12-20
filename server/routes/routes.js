const express=require('express');
const router = express.Router({mergeParams: true});
const offersService = require('../services/offers-service.js');

router.get("/list",(req,res)=>{
    offersService.getAllOffers(res);
})

router.get('/purchaseOffer', (req, res) => {
    offersService.purchaseOffer(req, res);
})

module.exports=router;