import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import React from 'react';
import './calculatorScreen.scss';

interface CalculatorScreenProps {
    id?: string;
    value?: string | number;
    fontSize?: string;
    fontColor?: string;
    height?: string;
    width?: string;
};

const CalculatorScreen: React.FC<CalculatorScreenProps> = ({
    id, 
    value,
    fontSize='30px',
    fontColor,
    height,
    width,
 }) => {

    const Screen = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        textAlign: 'right',
        fontSize: fontSize,
        color: fontColor || theme.palette.text.secondary,
        height: height || "80px",
        width: width || "300px",
        lineHeight: height || "80px",
        letterSpacing: "0px",
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }));
      
    const darkTheme = createTheme({ palette: { mode: 'dark' } });

    return (
        <ThemeProvider theme={darkTheme}>
            <Screen id={id} className='screen' elevation={1} style={{ padding: "0px 5px" }}>
                {value}
            </Screen>
        </ThemeProvider>
    )
};

export default CalculatorScreen;