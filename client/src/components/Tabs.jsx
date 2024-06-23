import React from 'react';
import '../css/dashboard.css';

const Tabs = ({ activeTab, onChangeTab, tabs }) => {
    return (
        <div className="tabs">
            {tabs.map((tab, index) => (
                <button
                    key={index}
                    className={`dashboard-button tab ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => onChangeTab(tab)}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

export default Tabs;