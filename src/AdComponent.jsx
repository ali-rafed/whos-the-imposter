import React from 'react';
import './AdComponent.scss';

const AdComponent = ({ position = "bottom", label = "Advertisement" }) => {
  // Replace 'YOUR_AD_ID' with the ID you get from A-Ads
  const adId = import.meta.env.VITE_A_ADS_ID;

  return (
    <div className={`ad-slot ad-slot-${position}`}>
      <div className="ad-content" data-label={label}>

<div id="frame" >
          <iframe data-aa='2436773' src='//acceptable.a-ads.com/2436773/?size=Adaptive'
            ></iframe>
        </div>

      </div>
    </div>
  );
};

export default AdComponent;