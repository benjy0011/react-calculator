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
  parenthesisCheck: boolean;
};

interface Buttons {
  display: string;
  arithmetic: string;
  color?: string;
  name?: string;
  onPressed?: () => void;
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
    parenthesisCheck: false,
  });
  const [calculatorBtns] = useState<Buttons[]>(() => 
    CALCULATOR_BUTTONS.map(button => ({
      ...button,
      onPressed: () => handleButtonClick(button),
    }))
  );

 const handleButtonClick = (button: Buttons) => {
  const { arithmetic, display } = button;

  if (arithmetic === "clear") {
    setCalculatorObj({
      result: "0",
      display: "",
      equation: "",
      currentBtn: "",
      currentBtnDisplay: "",
      decimalCheck: false,
      equalCheck: false,
      parenthesisCheck: false,
    });
    return;
  }

  if (arithmetic === "=") {
    setCalculatorObj((prev) => ({
      ...prev,
      result: calculate(prev.equation),
      display: calculate(prev.equation),
      equation: calculate(prev.equation),
      equalCheck: true,
      currentBtn: "",
    }));
    return;
  }

  if (arithmetic === "." && !calculatorObj.decimalCheck) {
    setCalculatorObj((prev) => ({
      ...prev,
      equation: prev.equalCheck ? '.' : prev.equation + '.',
      display: prev.equalCheck ? '.' : prev.display + '.',
      decimalCheck: true,
      equalCheck: false,
    }));
    return;
  }

  if (['+', '-', '*', '/', '%'].includes(arithmetic)) {
    setCalculatorObj((prev) => ({
      ...prev,
      equation: prev.equation === "" ? `0${arithmetic}` : `${prev.equation}${arithmetic}`,
      display: prev.equation === "" ? `0 ${display} ` : `${prev.display} ${display} `,
      decimalCheck: false,
      equalCheck: false,
    }));
    return;
  }

  setCalculatorObj((prev) => ({
    ...prev,
    equation: prev.equalCheck ? display : prev.equation + arithmetic,
    display: prev.equalCheck ? display : `${prev.display}${display}`,
    equalCheck: false,
  }));
 }

 useEffect(() => {
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
