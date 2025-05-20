// FoodDrinkPage.jsx

import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import GradientContainer from "../../components/Gradient";
import Card from "../../components/Card";
import Buttoncomponent from "../../components/Buttoncomponent";
import "../../foodpage.css";

const API_BASE = "http://localhost:3000/api/fooddrink";
const MEAL_TYPES = ["Breakfast", "Lunch", "Dinner", "Snack", "Uncategorized"];

export default function FoodDrinkPage() {
  const [consumables, setConsumables] = useState([]);
  const [selectedDate, setSelectedDate] = useState(() =>
    new Date().toISOString().slice(0, 10)
  );
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [mealType, setMealType] = useState(MEAL_TYPES[0]);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:3000/api/auth/check", {
          credentials: "include",
        });
        if (!res.ok) throw new Error();
      } catch {
        navigate("/login", { replace: true });
      }
    })();
  }, [navigate]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}?date=${selectedDate}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error();
        const data = await res.json();
        setConsumables(Array.isArray(data) ? data : []);
      } catch {
        console.error("Failed to fetch consumables");
      }
    })();
  }, [selectedDate]);

  const grouped = useMemo(() => {
    return MEAL_TYPES.reduce((acc, type) => {
      acc[type] = consumables.filter(
        (i) => (i.mealType || "Uncategorized") === type
      );
      return acc;
    }, {});
  }, [consumables]);

  const resetForm = () => {
    setName("");
    setCalories("");
    setMealType(MEAL_TYPES[0]);
    setEditId(null);
    setError("");
  };

  const handleCreateOrUpdate = async () => {
    setError("");
    if (!name.trim() || calories === "" || isNaN(calories) || !mealType) {
      setError("Please complete all fields.");
      return;
    }
    const payload = {
      consumableName: name.trim(),
      consumableCalories: Number(calories),
      mealType,
      mealDate: selectedDate,
    };
    const url = editId ? `${API_BASE}/${editId}` : API_BASE;
    const method = editId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      const saved = await res.json();
      setConsumables((prev) =>
        editId ? prev.map((i) => (i.consumableID === editId ? saved : i)) : [...prev, saved]
      );
      resetForm();
    } catch {
      console.error("Save error");
      setError("Failed to save item.");
    }
  };

  const handleEdit = (item) => {
    setName(item.consumableName);
    setCalories(item.consumableCalories.toString());
    setMealType(item.mealType || MEAL_TYPES[0]);
    setSelectedDate(item.mealDate.slice(0, 10));
    setEditId(item.consumableID);
    setError("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error();
      setConsumables((prev) => prev.filter((i) => i.consumableID !== id));
    } catch {
      console.error("Delete error");
      setError("Failed to delete item.");
    }
  };

  return (
    <div>
      <NavBar />

      <header className="dashboard-welcome">
        <h1>Your Food and Drink</h1>
        <p>Track your meals by adding what you've consumed</p>
      </header>

      <div className="consumable-container">
        <Card className="food-card">
          <GradientContainer className="food-title">
            <h1>{editId ? "Edit Item" : "Add Item"}</h1>
          </GradientContainer>

          <section className="consumable-form">
            {error && <p className="error-message">{error}</p>}
            <h4 className="form-description">
              {editId ? "Modify your item" : "Enter a new meal or drink"}
            </h4>

            <div className="form-group date-group">
              <label htmlFor="form-date">Date:</label>
              <input
                id="form-date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="input-field"
              />
            </div>


            <div className="form-group">
              <h4>Meal Type:</h4>
              <div className="meal-buttons">
                {MEAL_TYPES.map((type) => (
                  <button
                    key={type}
                    className={`meal-type-btn${mealType === type ? " selected" : ""}`}
                    onClick={() => setMealType(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="input-pair">
              <input
                type="text"
                placeholder="Food/Drink Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
              />
              <input
                type="number"
                placeholder="Calories"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="input-field"
              />
            </div>

            <Buttoncomponent id="log-btn" onClick={handleCreateOrUpdate}>
              {editId ? "Update Item" : "Add Item"}
            </Buttoncomponent>
          </section>
        </Card>

        <Card className="food-card">
          <GradientContainer className="food-title">
            <h1>Entries for {selectedDate}</h1>
          </GradientContainer>

          <section className="entry-list">
            {MEAL_TYPES.map((type) => (
              <details key={type} open>
                <summary>
                  {type} ({grouped[type].length})
                </summary>

                {grouped[type].length > 0 ? (
                  <ul className="logs-list">
                    {grouped[type].map((item) => (
                      <li className="log-entry" key={item.consumableID}>
                        <div className="log-content">
                          <span>{item.consumableName}</span>
                          <span>{item.consumableCalories} kcal</span>
                        </div>
                        <div className="log-actions">
                          <button className="edit-btn" onClick={() => handleEdit(item)}>✎</button>
                          <button className="delete-btn" onClick={() => handleDelete(item.consumableID)}>&times;</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="no-entries">No entries</p>
                )}
              </details>
            ))}
          </section>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
