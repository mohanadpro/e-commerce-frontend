import React, { useState } from 'react'
import './admin-main-page.css'
import { CategoryList } from '../category/list/CategoryList';
import { ProductList } from '../product/list/ProductList';
import { OrderList } from '../order/list/OrderList';
import { useLocation } from 'react-router-dom';
export const AdminMainPage = () => {
  const location = useLocation();
    const [activeTab, setActiveTab] = useState(location.state?.activeTab ? location.state?.activeTab : 0);
  // Step 2: Define the tab titles and content
  const tabs = [
    { title: 'Orders', content: <OrderList/>},
    { title: 'Products', content: <ProductList/>},
    { title: 'Categories', content: <CategoryList/>}
  ];
  return (
    <div style={{marginTop:'91px', minHeight:'75vh'}} data-testid="admin-page">
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
