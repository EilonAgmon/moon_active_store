const express=require('express');
const router = express.Router({mergeParams: true});
const OffersService = require('../services/OffersService.js');

router.get("/list",(req,res)=>{
    OffersService.getAllOffers(res);
})

router.get('/purchaseOffer', (req, res) => {
    OffersService.purchaseOffer(req, res);
})

module.exports=router;