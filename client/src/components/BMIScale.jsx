import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const BmiWidget = ({refreshKey}) => {
  const token = useSelector(state => state.user.token);
  const [bmi, setBmi] = useState(null);
  const [height, setHeight] = useState(null);
  const [suggestion, setSuggestion] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
    

        if (!res.ok) return;

        const data = await res.json();
        const userHeight = data.height;
        const userBmi = data.BMI;

        setHeight(userHeight);
        setBmi(userBmi);

        const heightM = userHeight / 100;
        const minHealthy = 18.5 * heightM * heightM;
        const maxHealthy = 24.9 * heightM * heightM;

        if (userBmi < 18.5) {
          setSuggestion(`Your BMI is in the underweight category, aim for at least ${minHealthy.toFixed(1)} kg.`);
        } else if (userBmi > 24.9) {
          setSuggestion(`Your BMI is in the overweight category, aim for no more than ${maxHealthy.toFixed(1)} kg.`);
        } else {
          setSuggestion("You BMI is in the healthy weight category. Keep it up!");
        }

      } catch (err) {
        console.error("Error fetching BMI:", err);
      }
    };

    if (token) fetchProfile();
  }, [token, refreshKey]);

  if (bmi === null || height === null) return <p>Loading BMI...</p>;

  return (
    <div className="bmi-widget">
      <h3>Your BMI</h3>
      <p>{bmi.toFixed(1)}</p>
      <p>{suggestion}</p>
    </div>
  );
};

export default BmiWidget;
