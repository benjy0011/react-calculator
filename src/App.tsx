import { useEffect, useState } from 'react';
import './App.scss'
import CALCULATOR_BUTTONS from './component/CALCULATOR_BUTTONS'
import ButtonsGrid from './component/buttonsGrid';

interface Buttons {
  display: string;
  arithmetic: string;
  color?: string;
  name?: string;
  onPressed: () => void;
};

function App() {
  const [arithmeticEquation, setArithmeticEquation] = useState<string>("");
  const [calculatorBtns] = useState<Buttons[]>(() => 
    CALCULATOR_BUTTONS.map(button => ({
      display: button.display,
      arithmetic: button.arithmetic,
      color: button.color,
      name: button.name || `${button.color}-${button.arithmetic}`,
      onPressed: () => {
        switch (button.arithmetic) {
          case "clear":
            setArithmeticEquation("");
            break;
          case "=":
            setArithmeticEquation(prev => prev + button.arithmetic); // to be changed later
            break;
          default:
            setArithmeticEquation(prev => prev + button.arithmetic);
            break;
        }
      },
    }))
  );

  // for testing purpose, will be deleted later
  useEffect(() => {
    console.log(`Equation: ${arithmeticEquation}`);
  }, [arithmeticEquation])
  

  return (
    <>
      <ButtonsGrid gridX={4} buttons={calculatorBtns}></ButtonsGrid>
    </>
  )
}

export default App
