import React from 'react';
import OfferCard from './OfferCard';
import Grid from '@mui/material/Grid';

const OffersList = ({offersList=[], onOfferClickCallback}) => {
   return (
        <Grid container direction="column" alignItems="center" justify="center">
           {offersList.map(offer => {
               return (
                  <div style={{margin: "25px"}} key={offer.id}>  
                    <OfferCard offer={offer} onOfferClickCallback={onOfferClickCallback}/>
                  </div>
               )
           })}
       </Grid>
   );
};
 
export default OffersList;