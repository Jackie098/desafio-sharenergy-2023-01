import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import * as Yup from "yup";
import { useFormik } from "formik";

import logoImage from "/logo_share_energy.png";
import { SignInCredentials } from "../../types/session";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import { signInService } from "../../services/sessions";
import { TonalitySharp } from "@mui/icons-material";
import { useAuth } from "../../hooks/useAuth";

const LOGIN_VALIDATION = Yup.object().shape({
  username: Yup.string()
    .required("Tap your username")
    .min(6, "Tap a username larger then 6 characters"),
  password: Yup.string().required("Tap your password"),
  isRemember: Yup.boolean().nullable(),
});

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/Jackie098" target="_blank">
        Carlos Augusto Miranda Brandão
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export function SignIn() {
  const { signIn } = useAuth();

  const handleSignIn = async (values: SignInCredentials) => {
    console.log({
      username: values.username,
      password: values.password,
      isRemember: values.isRemember,
    });

    try {
      await signIn(values);
    } catch (err: any) {
      // toast.show(err, {severity: "error"});
      alert(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      isRemember: false,
    },
    validationSchema: LOGIN_VALIDATION,
    validateOnChange: false,
    onSubmit: handleSignIn,
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={logoImage}
          alt="Logo da aplicação"
          style={{ width: "250px" }}
        />
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={formik.values.username}
            onChange={({ target }) => {
              formik.setFieldValue("username", target.value);
            }}
            error={!!formik.errors.username}
            helperText={!!formik.errors.username && formik.errors.username}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={({ target }) => {
              formik.setFieldValue("password", target.value);
            }}
            error={!!formik.errors.password}
            helperText={!!formik.errors.password && formik.errors.password}
          />
          {/* <FormControl
            required
            component="fieldset"
            variant="standard"
            error={!!formik.errors.isRemember}
          > */}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
            checked={formik.values.isRemember}
            onChange={({ target }: React.SyntheticEvent) => {
              const value = target as HTMLInputElement;

              formik.setFieldValue("isRemember", value.checked);
            }}
          />
          {/* <FormHelperText>
              {!!formik.errors.isRemember && formik.errors.isRemember}
            </FormHelperText> */}
          {/* </FormControl> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                href="#"
                variant="body2"
                onClick={() => alert("This feature doesn't work yet")}
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                href="#"
                variant="body2"
                onClick={() => alert("This feature doesn't work yet")}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
