import React from "react";
import OffersListHeader from '../components/OffersListHeader';
import OffersListManager from './OffersListManager';
import "./OffersStoreManager.css";

const OffersStoreManager = () => {
    
    return (
        <div className="store-container">
           <OffersListHeader />
           <OffersListManager />
        </div>
    )
}
 
export default OffersStoreManager;