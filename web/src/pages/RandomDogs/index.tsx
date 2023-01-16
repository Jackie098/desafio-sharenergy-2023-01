import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useQuery, useQueryClient } from "react-query";
import { randomDog } from "../../services/dogs";
import Resizer from "react-image-file-resizer";
import axios, { AxiosResponse } from "axios";
import { GREEN_500, PRIMARY } from "../../utils/colors";
import { CircularProgress, Typography } from "@mui/material";
import { useState } from "react";

// TODO dog: move helper functions to another file
export function RandomDogs() {
  const queryClient = useQueryClient();

  const [isResizingImage, setIsResizingImage] = useState(false);

  const {
    data: dogUrl,
    isLoading,
    isError,
  } = useQuery("randomicDog", async () => {
    try {
      const { url } = await randomDog();

      setIsResizingImage(true);
      const urlToBlob: AxiosResponse<Blob> = await axios.get(url, {
        responseType: "blob",
      });

      const resizedImage = await resizeFile(urlToBlob.data);

      return resizedImage;
    } catch (error) {
      // TODO dog: add a toast error here
      throw new Error("Error while request or resizing dog image");
    } finally {
      setIsResizingImage(false);
    }
  });

  const resizeFile = (
    file: Blob
  ): Promise<string | Blob | File | ProgressEvent<FileReader>> =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        500,
        500,
        "JPEG",
        80,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  const handleClick = () => {
    queryClient.invalidateQueries("randomicDog");
  };

  return (
    <Box display="flex" flexDirection={"column"} alignItems={"center"}>
      <Button
        disabled={isLoading || isResizingImage}
        onClick={handleClick}
        variant="contained"
        size="large"
        sx={{
          padding: "8px 48px",
          background:
            "linear-gradient(90deg, rgba(0,162,162,1) 0%, rgba(0,162,162,1) 13%, rgba(211,217,41,1) 100%)",
          opacity: isLoading || isResizingImage ? 0.4 : 1,
        }}
      >
        {isLoading || isResizingImage ? (
          <CircularProgress
            size={20}
            sx={{
              color: "#FFF",
            }}
          />
        ) : (
          <Typography fontWeight={600}>Other Dog</Typography>
        )}
      </Button>
      {isLoading ? (
        <CircularProgress
          size={20}
          sx={{
            marginTop: "64px",
          }}
        />
      ) : (
        <img
          src={dogUrl as string}
          alt="Image of a random dog"
          style={{
            maxWidth: "800px",
            maxHeight: "600px",
            height: "100%",
            objectFit: "cover",
            borderLeft: `10px ${GREEN_500} solid`,
            borderTop: `10px ${GREEN_500} solid`,
            borderRight: `10px ${PRIMARY} solid`,
            borderBottom: `10px ${PRIMARY} solid`,

            width: "85%",
            marginTop: "54px",
          }}
        />
      )}
    </Box>
  );
}
