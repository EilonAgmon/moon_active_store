import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OffersList from '../components/OffersList';
import fetchOffers from '../data-fetchers/OffersDataFetcher.js';
import purchaseOffer from '../actions/OffersActions.js';

const OffersListManager = () => {
    const [offers, setOffers] = useState([]);
    const dataFetchedRef = useRef(false); // Avoid React 18 Use Effect Getting Called Twice

    const fetchAllOffers = async () => {
        const offersData = await fetchOffers();
        if (offersData.success) {
            setOffers(offersData.offers);
        } else {
            setOffers([]);
            toast.error(offersData.message, {
                position: toast.POSITION.TOP_CENTER,
                pauseOnFocusLoss: false
            });
        }
    };

    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        fetchAllOffers();
    }, []);
      
    const onOfferClicked = async (offer) => {
        const offersData = await purchaseOffer(offer.id);
        if (offersData.success) {
            offer.currentCount = offersData.count;
            setOffers([...offers]);
            toast.success("Purchase of " + offer.name + " was successful", {
                position: toast.POSITION.TOP_CENTER,
                pauseOnFocusLoss: false
            });
        } else {
            toast.error(offersData.message, {
                position: toast.POSITION.TOP_CENTER,
                pauseOnFocusLoss: false
            });
        }
    };

    return (
        <div>
            <ToastContainer autoClose={2500}/>
            <OffersList offersList={offers} onOfferClickCallback={onOfferClicked}/>
        </div>
    )
}
 
export default OffersListManager;