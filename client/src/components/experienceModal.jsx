import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import "../css/experienceModal.css";

const AddExperienceModal = ({ isOpen, onClose, onSave }) => {
  const [years, setYearsOfExperience] = useState('');
  const [skill, setSkill] = useState('');

  const handleSave = async () => {
    if (!years || !skill) {
      toast.error('Please fill out all fields');
      return;
    }

    onSave({ years, skill });
    setYearsOfExperience('');
    setSkill('');
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
  <div className="modal-content">
    <div className='modal-border'>
    <h2>Add Experience</h2>
    <form>
    <div className="modal-form">
      <div className="flex-forward">
        <label htmlFor="years">Years of Experience</label>
        <input
          type="number"
          id="years"
          value={years}
          onChange={(e) => setYearsOfExperience(e.target.value)}
        />
      </div>
      <div className="flex-forward">
        <label htmlFor="skill">Skill</label>
        <input
          type="text"
          id="skill"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />
      </div>
      </div>
      <button className="modal-button" onClick={handleSave}>Save</button>
      <button className="modal-button close" onClick={onClose}>Close</button>
    </form>
    </div>
  </div>
</div>
  );
};

export default AddExperienceModal;
