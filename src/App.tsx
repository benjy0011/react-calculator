import { useEffect, useState } from 'react';
import './App.scss';
import CALCULATOR_BUTTONS from './constants/CALCULATOR_BUTTONS';
import ButtonsGrid from './components/buttonsGrid';
import CalculatorScreen from './components/calculatorScreen';
import { Grid2, Paper } from '@mui/material';
import { evaluate } from "mathjs";

const WIDTH = "300px";

interface CalculatorParam {
  result: number|string;
  display: string;
  equation: string;
  currentBtn: string;
  currentBtnDisplay: string;
  decimalCheck: boolean;
  equalCheck: boolean;
};

interface Buttons {
  display: string;
  arithmetic: string;
  color?: string;
  name?: string;
  onPressed: () => void;
};

const calculate = (expression: string): string => {
  try {
    const result = evaluate(expression);
    return typeof result === "number" && !isNaN(result) ? `${result}` : "Error"; 
  } catch (err) { 
    console.error(`Calculator error: ${err}`)
    return `Error`;
  }
};

function App() {
  const [calculatorObj, setCalculatorObj] = useState<CalculatorParam>({
    result: "0",
    display: "",
    equation: "",
    currentBtn: "",
    currentBtnDisplay: "",
    decimalCheck: false,
    equalCheck: false,
  });
  const [calculatorBtns] = useState<Buttons[]>(() => 
    CALCULATOR_BUTTONS.map(button => ({
      display: button.display,
      arithmetic: button.arithmetic,
      color: button.color,
      name: button.name || `${button.color}-${button.arithmetic}`,
      onPressed: () => {
        setCalculatorObj(prev => ({
          ...prev,
          currentBtn: button.arithmetic,
          currentBtnDisplay: button.display,
        }));
      },
    }))
  );

  useEffect(() => {
    const isInvalid: boolean = calculatorObj.equalCheck;

    if (calculatorObj.currentBtn === '=') {
      const calculated: string = calculate(calculatorObj.equation);
      setCalculatorObj({
        ...calculatorObj,
        result: calculated,
        equation: calculated,
        display: calculated,
        currentBtn: "",
        equalCheck: true,
      });
    } 
    else if (calculatorObj.currentBtn === '.' && !calculatorObj.decimalCheck) {
      setCalculatorObj({
        ...calculatorObj,
        equation: isInvalid ? '.' : calculatorObj.equation + '.',
        display: isInvalid ? '.' : calculatorObj.display + '.',
        decimalCheck: true,
        currentBtn: "",
        equalCheck: false,
      });
    } 
    else if (['+', '-', '*', '/', ')', '%'].includes(calculatorObj.currentBtn)) {
      setCalculatorObj({
        ...calculatorObj,
        decimalCheck: false,
        equation: `${calculatorObj.equation}${calculatorObj.currentBtn}`,
        display: `${calculatorObj.display} ${calculatorObj.currentBtnDisplay} `,
        currentBtn: "",
        equalCheck: false,
      });
    }
    else if (calculatorObj.currentBtn === "clear") {
      setCalculatorObj({
        result: "0",
        display: "",
        equation: "",
        currentBtn: "",
        currentBtnDisplay: "",
        decimalCheck: false,
        equalCheck: false,
      });
    }
    else if (calculatorObj.currentBtn !== "") {
      setCalculatorObj({
        ...calculatorObj,
        equation: isInvalid ? `${calculatorObj.currentBtnDisplay}` : `${calculatorObj.equation}${calculatorObj.currentBtn}`,
        display: isInvalid ? `${calculatorObj.currentBtnDisplay}` : `${calculatorObj.display}${calculatorObj.currentBtnDisplay}`,
        currentBtn: "",
        equalCheck: false,
      });
    }

    console.log(calculatorObj);
  }, [calculatorObj])
  

  return (
    <>
    <Paper 
      sx={{ backgroundColor: "transparent", width: WIDTH, }}
    >
      <Grid2 container>
        <Grid2 size={12}>
          <CalculatorScreen 
            id={"display"} 
            heigth={"50px"} 
            value={calculatorObj.result} 
          />
        </Grid2>
        <Grid2 size={12}>
          <CalculatorScreen 
            id={"arithmetic-screen"} 
            heigth={"30px"} 
            value={calculatorObj.display}
            fontSize={"15px"} 
            fontColor="#888888"
          />
        </Grid2>
      </Grid2>
    </Paper>
      <ButtonsGrid w={WIDTH} gridX={4} buttons={calculatorBtns}></ButtonsGrid>
    </>
  )
}

export default App
