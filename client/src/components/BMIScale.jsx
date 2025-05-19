import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../bmiscale.css";
import GradientContainer from "./Gradient";

const BMIWidget = ({ refreshKey }) => {
  const [bmi, setBmi] = useState(null);
  const [height, setHeight] = useState(null);
  const [suggestion, setSuggestion] = useState("");
  const [bmiCategory, setBmiCategory] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/profile", {
          credentials: "include", // REQUIRED to send cookies
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.status === 401) {
          setError("Session expired. Please log in again.");
          return;
        }

        if (!res.ok) {
          throw new Error("Failed to load profile data");
        }

        const data = await res.json();
        const userHeight = data.height;
        const userBmi = data.BMI;

        if (!userHeight || !userBmi) {
          throw new Error("Incomplete profile data");
        }

        setHeight(userHeight);
        setBmi(userBmi);

        const heightM = userHeight / 100;
        const minHealthy = 18.5 * heightM * heightM;
        const maxHealthy = 24.9 * heightM * heightM;

        if (userBmi < 18.5) {
          setSuggestion(`Your BMI is in the underweight category. Aim for at least ${minHealthy.toFixed(1)} kg.`);
          setBmiCategory("underweight");
        } else if (userBmi > 24.9) {
          setSuggestion(`Your BMI is in the overweight category. Aim for no more than ${maxHealthy.toFixed(1)} kg.`);
          setBmiCategory("overweight");
        } else {
          setSuggestion("Your BMI is in the healthy weight category. Keep it up!");
          setBmiCategory("healthy");
        }

      } catch (err) {
        console.error("BMI fetch error:", err);
        setError("Failed to fetch BMI data.");
      }
    };

    fetchProfile();
  }, [refreshKey]);

  if (error) return <p className="error">{error}</p>;
  if (bmi === null || height === null) return <p>Loading BMI…</p>;

  return (
    <div>
      <GradientContainer>
        <h1>Your BMI</h1>
      </GradientContainer>
      <div className="bmi-widget">
        <div className={`bmi-value ${bmiCategory}`}>{bmi.toFixed(1)}</div>
      </div>
      <p className="bmi-suggestion">{suggestion}</p>
    </div>
  );
};

export default BMIWidget;
