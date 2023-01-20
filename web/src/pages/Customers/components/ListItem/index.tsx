import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { GRAY_50 } from "../../../../utils/colors";

export function ListItem() {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        maxWidth: "900px",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 8px 8px 16px",
        background: GRAY_50,

        "&:last-child": {
          borderRadius: "0 0 4px 4px",
        },
      }}
    >
      <Typography color={"primary"} fontWeight={700}>
        ID
      </Typography>
      <Typography color={"primary"} fontWeight={700}>
        Name
      </Typography>
      <Typography color={"primary"} fontWeight={700}>
        CPF
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Button>Details</Button>
        <Button>Edit</Button>
        <Button>Delete</Button>
      </Box>
    </Box>
  );
}
