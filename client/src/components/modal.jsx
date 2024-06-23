import React, { useState } from "react";
import "../css/modal.css";
import "../css/modalui.css";
import { Link, useNavigate } from "react-router-dom";

export default function Modal() {
  const [modal, setModal] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();

  const toggleModal = () => {
    setModal(!modal);
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  const handleConfirm = () => {
    // Depending on the selected option, navigate to the corresponding route
    const selectedValue = document.getElementById("profileSelector").value;
    setSelectedOption(selectedValue);
    
    switch (selectedValue) {
      case "Car Owner":
        navigate("/CarOwnerProfileModal"); // Replace with your actual route
        break;
      case "Mechanic":
        navigate("/mechanicProfileModal"); // Replace with your actual route
        break;
      case "Customizer":
        navigate("/customizerProfileModal"); // Replace with your actual route
        break;
      case "Supplier":
        navigate("/supplierProfileModal"); // Replace with your actual route
        break;
      default:
        // Handle default case or do nothing
        break;
    }
  };

  return (
    <>
      {modal && (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
            <h2 className="modal-heading">Complete your Profile</h2>
            {showDropdown ? (
              // Render dropdown content
              <div className="dropdown">
                <label htmlFor="profileSelector">I want to use Careegar as a </label>
                <select
                  id="profileSelector"
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="modal-select"
                >
                  <option value="Car Owner">Car Owner</option>
                  <option value="Mechanic">Mechanic</option>
                  <option value="Customizer">Customizer</option>
                  <option value="Supplier">Supplier</option>
                </select>
                <button className="modal-button" onClick={handleConfirm}>Confirm</button>
              </div>
            ) : (
              // Render initial content
              <>
                <p>
                  To view your profile and to use other special features of Careegar, you need to complete your profile.
                </p>
                <Link to='/'>
                  <button className="close-modal" onClick={toggleModal}>
                    Skip for Now
                  </button>
                </Link>
                <button className="modal-button" onClick={toggleDropdown}>
                  Proceed
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
