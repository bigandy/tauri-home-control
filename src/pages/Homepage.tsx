import React from "react";
import Button from "@mui/material/Button";
import PageLayout from "layouts/PageLayout";
import { Box, Typography, Grid } from "@mui/material";

import { styled } from "@mui/material/styles";

const StyledDiv = styled(Box)(() => ({
  containerType: "inline-size",
}));

const StyledInner = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.success.main,
  border: "1px solid",
  padding: theme.spacing(3),
  marginBlock: theme.spacing(3),

  "@container (min-width: 500px)": {
    display: "grid",
    gridTemplateColumns: "1fr 3fr",
  },
}));

const TwoColumn = ({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) => {
  return (
    <StyledDiv>
      <StyledInner>
        {left}
        {right}
      </StyledInner>
    </StyledDiv>
  );
};

const Homepage: React.FC = () => {
  const [on, setOn] = React.useState(false);

  const handleClick = () => {
    setOn((o) => !o);
  };

  return (
    <PageLayout>
      <h1>Hello</h1>

      <Button variant="contained" onClick={handleClick}>
        Turn {!on ? "on" : "off"}
      </Button>

      <TwoColumn
        left={<Typography>Derp</Typography>}
        right={
          <Typography variant="poster">
            Current State: {on ? "on" : "off"}
          </Typography>
        }
      />

      <Grid container columnSpacing={2}>
        <Grid item xs={3}>
          <TwoColumn
            left={<Typography>Derp</Typography>}
            right={
              <Typography variant="poster">
                Current State: {on ? "on" : "off"}
              </Typography>
            }
          />
        </Grid>

        <Grid item xs={9}>
          <TwoColumn
            left={<Typography>Derp</Typography>}
            right={
              <Typography variant="poster">
                Current State: {on ? "on" : "off"}
              </Typography>
            }
          />
        </Grid>
      </Grid>
    </PageLayout>
  );
};

export default Homepage;
