import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const OfferCard = ({offer, onOfferClickCallback}) => {
  
  const onOfferCardClicked = (offer) => {
    onOfferClickCallback(offer);
  };

   return (
    <Card onClick = {() => onOfferCardClicked(offer)}>
      <CardContent>
          <Typography variant="h2">
            {offer.name}
          </Typography>
          <Typography variant="h4">
            {"limit " + offer.currentCount + "/" + offer.limit}
          </Typography>
        </CardContent>
       </Card>
   );
};
 
export default OfferCard;