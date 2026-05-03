import React from 'react';
import './AdComponent.scss';

const AdComponent = ({ position = "bottom", label = "Advertisement" }) => {
  return (
    <div className={`ad-slot ad-slot-${position}`}>
      <div className="ad-content" data-label={label}>
        {/* Placeholder for real ad scripts/images */}
        <div className="ad-placeholder">
          728 x 90 BANNER
        </div>
      </div>
    </div>
  );
};

export default AdComponent;