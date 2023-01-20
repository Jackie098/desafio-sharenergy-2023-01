import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { useMemo } from "react";
import { Customer, RequestCustomer } from "../../../../types/customers";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import { UseMutationResult } from "react-query";
import { useAuth } from "../../../../hooks/useAuth";

type ModalCustomerProps = {
  data?: Customer;
  type: "create" | "update";
  isOpen: boolean;
  onClose: () => void;
  createCustomerMutation: UseMutationResult<
    any,
    unknown,
    RequestCustomer,
    unknown
  >;
  updateCustomerMutation: UseMutationResult<
    any,
    unknown,
    RequestCustomer,
    unknown
  >;
};

const CREATE_CUSTOMER_VALIDATION = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  cellphone: Yup.string().length(11, "Cellphone must have 11 chars").required(),
  cpf: Yup.string().length(11, "CPF must have 11 chars").required(),
  street: Yup.string().nullable(),
  district: Yup.string().nullable(),
  houseNumber: Yup.number().min(1).nullable(),
});

const UPDATE_CUSTOMER_VALIDATION = Yup.object().shape({
  name: Yup.string().nullable(),
  email: Yup.string().email().nullable(),
  cellphone: Yup.string().length(11, "Cellphone must have 11 chars").nullable(),
  cpf: Yup.string().length(11, "CPF must have 11 chars").nullable(),
  street: Yup.string().nullable(),
  district: Yup.string().nullable(),
  houseNumber: Yup.number().min(1).nullable(),
});

export function ModalCustomer({
  data,
  type,
  isOpen,
  onClose,
  createCustomerMutation,
  updateCustomerMutation,
}: ModalCustomerProps) {
  const { getToken } = useAuth();

  const token = getToken();

  //@ts-ignore
  const INITIAL_FORMIK_DATA: Customer = useMemo(() => {
    console.log("initial_formik - data", data);

    return {
      name: data?.name || undefined,
      email: data?.email || undefined,
      cellphone: data?.cellphone || undefined,
      cpf: data?.cpf || undefined,
      street: data?.street || undefined,
      district: data?.district || undefined,
      houseNumber: data?.houseNumber || undefined,
    };
  }, [data]);

  const handleSubmit = async (newValues: Customer) => {
    console.log(newValues);
    try {
      if (type === "create") {
        await createCustomerMutation.mutateAsync({
          customer: newValues,
          token: token!,
        });

        handleClose();
      } else if (type === "update") {
        await updateCustomerMutation.mutateAsync({
          customer: { ...newValues, _id: data?._id },
          token: token!,
        });

        handleClose();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik<Customer>({
    initialValues: INITIAL_FORMIK_DATA,
    isInitialValid: false,
    validationSchema:
      type === "create"
        ? CREATE_CUSTOMER_VALIDATION
        : UPDATE_CUSTOMER_VALIDATION,
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => handleClose()}
      aria-labelledby="form-dialog-title"
      fullWidth
    >
      <DialogContent>
        <Box display="flex" alignItems="center" justifyContent="center">
          <div>
            <Typography
              fontSize={16}
              fontWeight={500}
              lineHeight={2.5}
              marginBottom={0}
            >
              {type === "create" ? "Costumer creation" : "Update Customer"}
            </Typography>
            <Typography
              fontSize={14}
              fontWeight={500}
              lineHeight={1.4}
              marginBottom={3}
              color="#616161"
            >
              Fill with customer informations
            </Typography>

            <TextField
              id="txf-name"
              name="name"
              label="Name"
              placeholder="Name"
              variant="outlined"
              value={formik.values.name}
              error={Boolean(formik.errors.name)}
              helperText={Boolean(formik.errors.name) && formik.errors.name}
              onChange={({ target: { value } }) => {
                formik.setFieldValue("name", value);
              }}
              sx={{
                padding: "0px 0px 20px 0px",
                width: "100%",
              }}
            />

            <TextField
              data-testid="txf-acc-settings-update-store-wpp"
              id="outlined-basic"
              label="Email"
              placeholder="Email"
              variant="outlined"
              value={formik.values.email}
              error={Boolean(formik.errors.email)}
              helperText={Boolean(formik.errors.email) && formik.errors.email}
              onChange={({ target: { value } }) => {
                formik.setFieldValue("email", value);
              }}
              sx={{
                padding: "0px 0px 20px 0px",
                width: "100%",
              }}
            />

            <Box
              sx={{
                padding: "0px 0px 20px 0px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <TextField
                data-testid="txf-acc-settings-update-store-cep"
                id="txf-cep"
                name="cellphone"
                label="Cellphone"
                placeholder="Cellphone"
                variant="outlined"
                value={formik.values.cellphone}
                error={Boolean(formik.errors.cellphone)}
                helperText={
                  Boolean(formik.errors.cellphone) && formik.errors.cellphone
                }
                onChange={({ target: { value } }) => {
                  formik.setFieldValue("cellphone", value);
                }}
                sx={{
                  width: "48%",
                }}
              />
              <TextField
                data-testid="txf-acc-settings-update-store-uf"
                id="txf-uf"
                name="cpf"
                label="CPF"
                placeholder="CPF"
                variant="outlined"
                value={formik.values.cpf}
                error={Boolean(formik.errors.cpf)}
                helperText={Boolean(formik.errors.cpf) && formik.errors.cpf}
                onChange={({ target: { value } }) => {
                  formik.setFieldValue("cpf", value);
                }}
                sx={{
                  width: "48%",
                }}
              />
            </Box>

            <TextField
              data-testid="txf-acc-settings-update-store-address"
              id="outlined-basic"
              label="Street"
              placeholder="Street"
              variant="outlined"
              value={formik.values.street}
              error={Boolean(formik.errors.street)}
              helperText={Boolean(formik.errors.street) && formik.errors.street}
              onChange={({ target: { value } }) => {
                formik.setFieldValue("street", value);
              }}
              sx={{
                padding: "0px 0px 20px 0px",
                width: "100%",
              }}
            />
            <Box sx={{ display: "flex", flexDirection: "row", gap: "16px" }}>
              <TextField
                data-testid="txf-acc-settings-update-store-district"
                id="outlined-basic"
                label="District"
                placeholder="District"
                variant="outlined"
                value={formik.values.district}
                error={Boolean(formik.errors.district)}
                helperText={
                  Boolean(formik.errors.district) && formik.errors.district
                }
                onChange={({ target: { value } }) => {
                  formik.setFieldValue("district", value);
                }}
              />
              <TextField
                data-testid="txf-acc-settings-update-store-address-number"
                value={formik.values.houseNumber}
                error={Boolean(formik.errors.houseNumber)}
                helperText={
                  Boolean(formik.errors.houseNumber) &&
                  formik.errors.houseNumber
                }
                onChange={({ target: { value } }) => {
                  formik.setFieldValue("houseNumber", value);
                }}
                label="House Number"
                className="form-control"
                autoComplete="none"
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                padding: "0px 0px 20px 0px",
                gap: "1rem",
                marginTop: "16px",
              }}
            >
              <Button
                data-testid="btt-acc-settings-update-close-form"
                onClick={() => handleClose()}
                sx={{ color: "#616161" }}
              >
                Cancelar
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={() => formik.handleSubmit()}
              >
                Save
              </Button>
            </Box>
          </div>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
