import React from 'react';
import OfferCard from './OfferCard';

const OffersList = ({offersList=[], onOfferClickCallback}) => {
   return (
      <div>
           {offersList.map(offer => {
               return (
                  <div key={offer.id}>  
                    <OfferCard offer={offer} onOfferClickCallback={onOfferClickCallback}/>
                  </div>
               )
           })}
       </div>
   );
};
 
export default OffersList;