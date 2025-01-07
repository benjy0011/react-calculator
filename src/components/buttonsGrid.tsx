import { Button, Grid2 } from "@mui/material";

interface Buttons {
    display: string;
    color?: string;
    name?: string;
    onPressed: () => void;
}

interface ButtonsGridProps {
    gridX: number;
    buttons: Buttons[];
    w?: string;
    h?: string;
    bg?: string;
    p?: string;
    bRadius?: string;
    color?: string;
}

const btnVariant = "contained";

const ButtonsGrid: React.FC<ButtonsGridProps> = ({
    gridX,
    buttons,
    w = "300px",
    h = "360px",
    bg = "#666666",
    p = "10px",
    bRadius = "0px 0px 10px 10px",
}) => {


    const size = buttons.length;

    return (
        <>
            <Grid2
                container
                spacing={1}
                sx={{
                    width: w,
                    height: h,
                    background: bg,
                    padding: p,
                    borderRadius: bRadius,
                }}
            >
                {Array.from({ length: size }).map((_, index) => (
                    <Grid2
                        key={`${buttons[index].display}-${index}`}
                        size={{ xs: 12/gridX }}
                        sx={{
                            display: "flex",
                            placeContent: "center"
                        }}
                    >
                        {
                            buttons[index]
                                ? <Button 
                                    id={buttons[index].name}
                                    variant={btnVariant}
                                    onClick={buttons[index].onPressed}
                                    sx={{
                                        borderRadius: "50%",
                                        backgroundColor: buttons[index].color,
                                        fontSize: "20px",
                                    }}
                                >
                                    {buttons[index].display}
                                </Button>
                                : <Button
                                    variant={btnVariant}
                                    disabled={true}
                                    sx={{
                                        borderRadius: "50%",
                                        fontSize: "20px",
                                    }}
                                >
                                    n/a
                                </Button>
                        }
                    </Grid2>
                ))}
            </Grid2>
        </>
    )
}

export default ButtonsGrid;