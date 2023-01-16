import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useQuery, useQueryClient } from "react-query";
import { randomDog } from "../../services/dogs";
import Resizer from "react-image-file-resizer";
import axios, { AxiosResponse } from "axios";
import { GREEN_500, PRIMARY } from "../../utils/colors";

export function RandomDogs() {
  const queryClient = useQueryClient();

  const { data: dogUrl } = useQuery("randomicDog", async () => {
    const { url } = await randomDog();

    const urlToBlob: AxiosResponse<Blob> = await axios.get(url, {
      responseType: "blob",
    });

    const resizedImage = await resizeFile(urlToBlob.data);

    console.log("url", url);
    console.log("urlToBlob", urlToBlob);
    console.log("resizedImage", resizedImage);

    return resizedImage;
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
        onClick={handleClick}
        variant="contained"
        size="large"
        sx={{
          padding: "8px 48px",
          background:
            "linear-gradient(90deg, rgba(0,162,162,1) 0%, rgba(0,162,162,1) 13%, rgba(211,217,41,1) 100%)",
          // background:
          //TODO: Background gradient
        }}
      >
        Other Dog
      </Button>
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
    </Box>
  );
}
