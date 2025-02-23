import React, { useState } from 'react'
import './admin-main-page.css'
import { CategoryList } from '../category/list/CategoryList';
import { ProductList } from '../product/list/ProductList';
export const AdminMainPage = () => {
    const [activeTab, setActiveTab] = useState(0);

  // Step 2: Define the tab titles and content
  const tabs = [
    { title: 'Products', content: <ProductList/>},
    { title: 'Categories', content: <CategoryList/>}
  ];
  return (
    <div style={{marginTop:'91px', minHeight:'75vh'}}>
    <div className="tabs">
      {/* Step 3: Render tab titles dynamically */}
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`tab ${activeTab === index ? 'active' : ''}`} // Highlight the active tab
          onClick={() => setActiveTab(index)} // Set active tab on click
        >
          {tab.title}
        </button>
      ))}
    </div>
    
    {/* Step 4: Render the content of the active tab */}
    <div className="tab-content">
      {tabs[activeTab].content}
    </div>
  </div>
  )
}
