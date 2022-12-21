import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OffersList from '../components/OffersList';
import fetchOffers from '../data-fetchers/offers-data-fetcher.js';
import purchaseOffer from '../actions/purchase-offer-action.js';

const OffersListManager = () => {
    const [offers, setOffers] = useState([]);
    const dataFetchedRef = useRef(false); // Avoid React 18 Use Effect Getting Called Twice

    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        fetchAllOffers();
    });

    const showToast = (success, message) => {
        if (success) {
            toast.success(message, {
                position: toast.POSITION.TOP_CENTER,
                pauseOnFocusLoss: false
            });
        } else {
            toast.error(message, {
                position: toast.POSITION.TOP_CENTER,
                pauseOnFocusLoss: false
            });
        }
    }

    const fetchAllOffers = async () => {
        const offersData = await fetchOffers();
        if (offersData.success) {
            setOffers(offersData.offers);
        } else {
            setOffers([]);
            showToast(false, offersData.message);
        }
    };

    const onOfferClicked = async (offer) => {
        if(offer.currentCount >= offer.limit) {
            // No need to call BE
            showToast(false, "This offer has reached its cap");
            return;
        }
        const offersData = await purchaseOffer(offer.id);
        if (offersData.success) {
            offer.currentCount = offersData.count;
            setOffers([...offers]);
            showToast(true, "Purchase of " + offer.name + " was successful");
        } else {
            showToast(false, offersData.message);
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