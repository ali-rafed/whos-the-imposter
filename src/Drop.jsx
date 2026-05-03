import React, { useState, useRef, useEffect } from 'react';
import "./drop.scss"
 function Drop({ label, options, value, onChange, maxAllowed }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if user clicks anywhere else on the screen
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      {label && <div className="setting-label">{label}</div>}
      
      <div className={`dropdown-wrapper ${isOpen ? 'is-open' : ''}`}>
        {/* THE MAIN BUTTON */}
        <button 
          type="button"
          className="dropdown-trigger" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{value} {value === 1 ? 'Imposter' : 'Imposters'}</span>
          <span className={`chevron ${isOpen ? 'up' : 'down'}`}>▼</span>
        </button>

        {/* THE FLOATING MENU */}
        {isOpen && (
          <ul className="dropdown-menu">
            {options.map((num) => {
              const isDisabled = num > maxAllowed;
              const isActive = value === num;

              return (
                <li 
                  key={num}
                  className={`dropdown-item ${isActive ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`}
                  onClick={() => {
                    if (!isDisabled) {
                      onChange(num);
                      setIsOpen(false);
                    }
                  }}
                >
                  <span className="item-text">{num} {num === 1 ? 'Imposter' : 'Imposters'}</span>
                  {isActive && <span className="check-mark">✓</span>}
                  {isDisabled && <span className="lock-icon">🔒</span>}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Drop