import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import '../bmiscale.css';
import GradientContainer from "./Gradient";

const BmiWidget = ({refreshKey}) => {
  const token = useSelector(state => state.user.token);
  const [bmi, setBmi] = useState(null);
  const [height, setHeight] = useState(null);
  const [suggestion, setSuggestion] = useState("");
  const [bmiCategory, setBmiCategory] = useState("");

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
          setBmiCategory("underweight");
        } else if (userBmi > 24.9) {
          setSuggestion(`Your BMI is in the overweight category, aim for no more than ${maxHealthy.toFixed(1)} kg.`);
          setBmiCategory("overweight");
        } else {
          setSuggestion("Your BMI is in the healthy weight category. Keep it up!");
          setBmiCategory("healthy");
        }

      } catch (err) {
        console.error("Error fetching BMI:", err);
      }
    };

    if (token) fetchProfile();
  }, [token, refreshKey]);

  if (bmi === null || height === null) return <p>Loading BMI...</p>;

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

export default BmiWidget;
