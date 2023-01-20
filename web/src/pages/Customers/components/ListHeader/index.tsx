import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { GRAY_100 } from "../../../../utils/colors";

export function ListHeader() {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        maxWidth: "900px",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 8px 8px 16px",
        background: GRAY_100,
        borderRadius: "4px 4px 0 0",
      }}
    >
      <Typography color={"primary"} fontWeight={700}>
        # ID
      </Typography>
      <Typography color={"primary"} fontWeight={700}>
        # Name
      </Typography>
      <Typography color={"primary"} fontWeight={700}>
        # CPF
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {/* <Button sx={{ color: GRAY_100 }}>Details</Button> */}
        <Button sx={{ color: GRAY_100 }}>Edit</Button>
        <Button sx={{ color: GRAY_100 }}>Delete</Button>
      </Box>
    </Box>
  );
}
