import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Customer } from "../../../../types/customers";
import { GRAY_50, GRAY_700 } from "../../../../utils/colors";

import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

type ListItemProps = {
  id: number;
  customer: Customer;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setTypeModal: React.Dispatch<React.SetStateAction<"create" | "update">>;
  setCustomerToUpdate: React.Dispatch<React.SetStateAction<Customer>>;
};

export function ListItem({
  customer,
  id,
  setOpenModal,
  setTypeModal,
  setCustomerToUpdate,
}: ListItemProps) {
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
        <Button
          onClick={() => {
            setCustomerToUpdate(customer);
            setTypeModal("update");
            setOpenModal(true);
          }}
        >
          <EditIcon />
        </Button>
        <Button color="error">
          <DeleteOutlineIcon color={"error"} />
        </Button>
      </Box>
    </Box>
  );
}
