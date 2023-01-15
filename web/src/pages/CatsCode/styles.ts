import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

import { GREEN_500, PRIMARY } from "../../utils/colors";

export const useStyles = makeStyles((theme: Theme) => ({
  catImage: {
    borderLeft: `10px ${GREEN_500} solid`,
    borderTop: `10px ${GREEN_500} solid`,
    borderRight: `10px ${PRIMARY} solid`,
    borderBottom: `10px ${PRIMARY} solid`,
  },
}));
