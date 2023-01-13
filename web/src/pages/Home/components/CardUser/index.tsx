import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

import { RandomUser } from "../../../../types/user";
import {
  BLUE_500,
  GREEN_100,
  GREEN_500,
  PINK_500,
  PRIMARY,
} from "../../../../utils/colors";

type CardUserProps = {
  userDetails: RandomUser;
};

export function CardUser({
  userDetails: { login, name, picture, registered, email, cell, gender },
}: CardUserProps) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={picture.large}
          alt="profile image of a user"
        />
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              color={PRIMARY}
            >
              {login.username}
            </Typography>

            {/* <Box variant="body2" color="text.secondary"> */}
            {gender === "male" ? (
              <MaleIcon sx={{ color: BLUE_500 }} />
            ) : (
              <FemaleIcon sx={{ color: PINK_500 }} />
            )}
            {/* </Typography> */}
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              fontSize={16}
              fontWeight={450}
              variant="body2"
              color={"text.primary"}
            >
              {`${name.first} ${name.last}`}
            </Typography>

            <Typography
              fontSize={20}
              fontWeight={450}
              variant="body2"
              color={GREEN_500}
            >
              {registered.age}
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary" marginTop={1}>
            {email}
          </Typography>

          <Typography variant="body2" color="text.secondary" marginTop={0.5}>
            cell: {cell}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
