import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useRef, useState } from "react";
import { useQuery } from "react-query";
import { findOneCat } from "../../services/cats";
import download from "download";
import WelcomeCat from "/welcome_cat.svg";
import CatNotFound from "/cat_not_found.svg";
import Typography from "@mui/material/Typography";

export function CatsCode() {
  const [statusCode, setStatusCode] = useState<number | null>(null);

  const textRef = useRef<HTMLInputElement>(null);

  const test = async () => {
    // const response = await download("https://http.cat/200");

    console.log("response - test", "response");
  };

  const {
    data: queryCat,
    isLoading,
    isError,
  } = useQuery(
    ["findOneCat", statusCode],
    async () => {
      const cat = await findOneCat(statusCode);

      return cat;
    }
    // {behavior:}
  );

  // const queryCat = async (statusCode: number) => {
  //   // const result = await findOneCat(statusCode);
  //   // const result = await fetch(`https://http.cat/${statusCode}`);
  //   const result = fetch("https://http.cat/200")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data.file);
  //     });

  //   console.log("result", result);
  // };

  const submitForm = (event: any) => {
    event.preventDefault();
    // queryCat(statusCode!);
    // test();
    if (textRef.current != null) {
      console.log(textRef.current!.value);
      setStatusCode(Number(textRef.current!.value));

      return;
    }

    setStatusCode(null);
  };

  // const catLink = `https://http.cat/${statusCode}`;

  const renderImageCat = () => {
    return (
      <>
        {statusCode ? (
          <>
            {true ? (
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

                <Typography variant="h3" color={"primary"}>
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
            ) : (
              "imagem do gato"
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

            <Typography variant="h3" color={"primary"}>
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
