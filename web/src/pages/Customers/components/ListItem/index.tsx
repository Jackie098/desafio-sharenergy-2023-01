import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Customer } from "../../../../types/customers";
import { BLACK, GRAY_50, GRAY_700 } from "../../../../utils/colors";

type ListItemProps = {
  id: number;
  customer: Customer;
};

export function ListItem({ customer, id }: ListItemProps) {
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
      <Typography fontWeight={500} sx={{ color: GRAY_700 }}>
        {id}
      </Typography>
      <Typography color={"primary"} fontWeight={400}>
        {customer.name}
      </Typography>
      <Typography color={"primary"} fontWeight={400}>
        {customer.cpf}
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
