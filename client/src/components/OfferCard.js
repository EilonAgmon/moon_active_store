import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "./OfferCard.css";

const OfferCard = ({offer, onOfferClickCallback}) => {
  
  const onOfferCardClicked = (offer) => {
    onOfferClickCallback(offer);
  };

   return (
    <Card className={`offer-card ${offer.currentCount >= offer.limit ? "disabled" : "enabled"}`} 
      onClick = {() => onOfferCardClicked(offer)}>
      <CardContent>
          <Typography variant="h3">
            {offer.name}
          </Typography>
          <Typography variant="h4">
            {"limit " + offer.currentCount + " / " + offer.limit}
          </Typography>
        </CardContent>
       </Card>
   );
};
 
export default OfferCard;