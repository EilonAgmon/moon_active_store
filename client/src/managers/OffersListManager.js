import React, { useState, useEffect, useRef } from "react";
import OffersList from '../components/OffersList';
import fetchOffers from '../data-fetchers/OffersDataFetcher.js';


const OffersListManager = () => {
    const [offers, setOffers] = useState([]);
    const dataFetchedRef = useRef(false); // Avoid React 18 Use Effect Getting Called Twice

    const fetchAllOffers = async () => {
        const offersData = await fetchOffers();
        if (offersData.isError) {
            // Show Error MSG
            alert (offersData.errorMessage);
            setOffers([]);
        } else {
            setOffers(offersData);
        }
    };

    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        fetchAllOffers();
    }, []);
    
    function onOfferClicked(offer) {
        alert(offer.name + " was clicked!");
    }
    
    return (
        <div>
             <OffersList offersList={offers} onOfferClickCallback={onOfferClicked}/>
        </div>
    )
}
 
export default OffersListManager;