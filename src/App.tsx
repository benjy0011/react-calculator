import { useState } from 'react';
import './App.scss'
import CALCULATOR_BUTTONS from './component/CALCULATOR_BUTTONS'
import ButtonsGrid from './component/buttonsGrid';

// const BUTTONS = [];
// CALCULATOR_BUTTONS.forEach(button => {
//   BUTTONS.push(

//   )
// })

function App() {
  const [calculatorBtns, setCalculatorBtns] = useState(() => 
    CALCULATOR_BUTTONS.map(button => ({
      display: button.display,
      arimetic: button.arithmetic,
      onPressed: () => {console.log(button.arithmetic)},
    }))
  );

  return (
    <>
      <ButtonsGrid gridX={4} buttons={calculatorBtns}></ButtonsGrid>
    </>
  )
}

export default App
