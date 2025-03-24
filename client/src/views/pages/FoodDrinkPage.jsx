import React from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import '../../foodpage.css'


const FoodDrinkPage = () => {
    return ( 
      <div>
      <NavBar />

      <h1 className="foodpage-title">Your Food Diary</h1>
    
        <div className="food-log">
    
          <section className="meal-section">
          <h2>Breakfast</h2>
            <div className="consumable-list">
              <div className="consumable-item">
                <span>scrambled eggs</span>
                <button className="delete-btn">✖</button>
              </div>
              <div className="consumable-item">
                <span>apple</span>
                <button className="delete-btn">✖</button>
              </div>
            </div>
            <select className="food-dropdown">
              <option value="">Select a food</option>
              <option value="">chicken</option>
              <option value="">burger</option>
              <option value="">broccoli</option>
            </select>
            <button className="add-food-btn">Add</button>
            <div className="meal-calorie-count">
              <span>Calories: 435</span>
            </div>
          </section>
    
          <section className="meal-section">
          <h2>Lunch</h2>
            <div className="consumable-list">
              <div className="consumable-item">
                <span>chicken pasta</span>
                <button className="delete-btn">✖</button>
              </div>
            </div>
            <select className="food-dropdown">
              <option value="">Select a food</option>
              <option value="">chicken</option>
              <option value="">burger</option>
              <option value="">broccoli</option>
            </select>
            <button className="add-food-btn">Add</button>
            <div className="meal-calorie-count">
              <span>Calories: 435</span>
            </div>
          </section>
    
          <section className="meal-section">
          <h2>Dinner</h2>
            <div className="consumable-list">
              <div className="consumable-item">
                <span>burrito</span>
                <button className="delete-btn">✖</button>
              </div>
            </div>
            <select className="food-dropdown">
              <option value="">Select a food</option>
              <option value="">chicken</option>
              <option value="">burger</option>
              <option value="">broccoli</option>
            </select>
            <button className="add-food-btn">Add</button>
            <div className="meal-calorie-count">
              <span>Calories: 435</span>
            </div>
          </section>
    
          
    
        </div>

        <section className="custom-food-section">
            <h2>Add a new item</h2>
            <input type="text" className="custom-food-input"/>
            <button className="custom-food-btn">Add</button>
          </section>

        <Footer />
      </div>
          
    );
  };
  
export default FoodDrinkPage;