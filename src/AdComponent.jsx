import React from 'react';
import './AdComponent.scss';

const AdComponent = ({ position = "bottom", label = "Advertisement" }) => {
  // Replace 'YOUR_AD_ID' with the ID you get from A-Ads
  const adId = import.meta.env.VITE_A_ADS_ID;

  return (
    <div className={`ad-slot ad-slot-${position}`}>
      <div className="ad-content" data-label={label}>
      <div id="frame" >
      <iframe 
          data-aa={adId} 
          // Using 'Adaptive' size as provided in your snippet
          src={`https://acceptable.a-ads.com/${adId}/?size=Adaptive`} 
          title="A-Ads"
        ></iframe>
        </div>
      </div>
    </div>
  );
};

export default AdComponent;