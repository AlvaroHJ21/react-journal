import { Grid, IconButton, Typography } from "@mui/material";
import { AddOutlined, StarOutline } from "@mui/icons-material";
export const NothingSelectedView = () => {
    return (
        <>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{
                    minHeight: `calc(100vh - 80px)`,
                    backgroundColor: "primary.main",
                    padding: 4,
                    borderRadius: 2,
                }}
            >
                <Grid item xs={12}>
                    <StarOutline
                        sx={{
                            fontSize: 100,
                            color: "white",
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" color="white">
                        Selecciona o crea una entrada
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
};
