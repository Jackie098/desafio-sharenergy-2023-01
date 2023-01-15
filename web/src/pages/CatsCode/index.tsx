import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useMemo, useRef, useState } from "react";
import { useQuery } from "react-query";
import { findOneCat } from "../../services/cats";
import WelcomeCat from "/welcome_cat.svg";
import CatNotFound from "/cat_not_found.svg";
import Typography from "@mui/material/Typography";
import { GREEN_100, GREEN_500 } from "../../utils/colors";
import { CircularProgress } from "@mui/material";
import { useStyles } from "./styles";

// import Buffer from "buffer";

export function CatsCode() {
  const [statusCode, setStatusCode] = useState<number | null>(null);

  const styles = useStyles();

  const textRef = useRef<HTMLInputElement>(null);

  const {
    data: queryCat,
    isLoading,
    isError,
  } = useQuery(["findOneCat", statusCode], async () => {
    try {
      if (statusCode == undefined) {
        return;
      }

      const { data: arrayBuffer } = await findOneCat(statusCode);

      const arrayBufferView = new Uint8Array(arrayBuffer);
      const blob = new Blob([arrayBufferView], { type: "image/jpeg" });
      const urlCreator = window.URL || window.webkitURL;
      const imageUrl = urlCreator.createObjectURL(blob);

      console.log("imageUrl", imageUrl);

      return imageUrl;
    } catch (error) {
      throw new Error("error");
    }
  });

  console.log("isError", isError);

  const submitForm = (event: any) => {
    event.preventDefault();

    if (textRef.current != null) {
      console.log(textRef.current!.value);
      setStatusCode(Number(textRef.current!.value));

      return;
    }

    setStatusCode(null);
  };

  const catLink = useMemo(() => {
    if (queryCat != undefined) {
      return queryCat;
    }
  }, [queryCat]);

  const renderImageCat = () => {
    return (
      <>
        {statusCode ? (
          <>
            {isError ? (
              <>
                {isLoading ? (
                  <CircularProgress size={35} />
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={CatNotFound}
                      alt="Image to error request"
                      style={{ maxWidth: "60%" }}
                    />

                    <Typography variant="h3" sx={{ color: GREEN_500 }}>
                      Error 404
                    </Typography>
                    <Typography
                      variant="body1"
                      color={"text.secondary"}
                      fontWeight={600}
                    >
                      Cat image not found
                    </Typography>
                  </Box>
                )}
              </>
            ) : (
              <>
                {isLoading ? (
                  <CircularProgress />
                ) : (
                  <img
                    src={catLink}
                    className={styles.catImage}
                    alt="A fun image of a cat"
                  />
                )}
              </>
            )}
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={WelcomeCat}
              alt="Welcome people"
              style={{ maxWidth: "60%" }}
            />

            <Typography variant="h4" color={"primary"} marginTop={3}>
              Select a valid status code
            </Typography>
            <Typography
              variant="body1"
              color={"text.secondary"}
              fontWeight={600}
            >
              Each status code returns a funny cat image
            </Typography>
          </Box>
        )}{" "}
      </>
    );
  };

  return (
    <Box>
      <Box
        component="form"
        onSubmit={submitForm}
        display="flex"
        alignItems={"center"}
      >
        <TextField
          inputRef={textRef}
          variant="outlined"
          type="number"
          label="Choose a status code"
          // onChange={(event) => setStatusCode(Number(event.currentTarget.value))}
          sx={{
            marginRight: "8px",
          }}
        />
        <Button type="submit" variant="contained" size="large">
          Search
        </Button>
      </Box>
      {/* <img src={"https://http.cat/200"} alt="A cat by status code protocol" /> */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          // maxWidth: "500px !important",
          width: "100%",
          marginTop: "80px",
        }}
      >
        {renderImageCat()}
      </Box>
    </Box>
  );
}
