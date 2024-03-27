import React from "react";
import PropTypes from "prop-types";
import {
  Drawer,
  IconButton,
  Toolbar,
  Divider,
  Typography,
  Box,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { isSidedrawerOpen } from "../../../shared/redux/actions/ui.actions.js";
import CommentCard from "./CommentCard";

const drawerWidth = 340;

const styles = {
  toolbar: {
    minWidth: drawerWidth,
  },
};

const comments = [
  {
    author: "Samuel",
    date: new Date(),
    comment:
      "Ut vel orci mollis, suscipit est id, viverra mauris. Nam hendrerit mattis turpis, vitae volutpat ex convallis non. Integer porttitor eget dolor sed volutpat",
    rating: 2.5,
    avatar: {
      topType: "WinterHat3",
      hairColor: "Blonde",
      hatColor: "PastelGreen",
      accessoriesType: "Prescription02",
      facialHairType: "BeardLight",
      facialHairColor: "Red",
      clotheType: "Hoodie",
      clotheColor: "Blue03",
      graphicType: "Selena",
      eyeType: "EyeRoll",
      eyebrowType: "UpDownNatural",
      mouthType: "Twinkle",
      skinColor: "Yellow",
    },
  },
  {
    author: "John",
    date: new Date(),
    comment:
      "Pellentesque egestas tortor id sodales tempus. Duis vel elit nunc. Praesent ut sapien dictum, molestie risus sed, vestibulum mi. In in sollicitudin nisl, a euismod enim. Vestibulum aliquam posuere semper. Vivamus leo est, ornare sed mi in, condimentum finibus est",
    rating: 4.5,
    avatar: {
      topType: "ShortHairFrizzle",
      hairColor: "Black",
      hatColor: "PastelGreen",
      facialHairType: "BeardLight",
      facialHairColor: "Black",
      clotheType: "Hoodie",
      clotheColor: "Blue02",
      graphicType: "Selena",
      eyeType: "EyeRoll",
      eyebrowType: "UpDownNatural",
      mouthType: "Twinkle",
      skinColor: "Yellow",
    },
  },
  {
    author: "Helena",
    date: new Date(),
    comment:
      "Pellentesque egestas tortor id sodales tempus. Duis vel elit nunc. Praesent ut sapien dictum, molestie risus sed, vestibulum mi. In in sollicitudin nisl, a euismod enim. Vestibulum aliquam posuere semper. Vivamus leo est, ornare sed mi in, condimentum finibus est",
    rating: 5,
    avatar: {
      topType: "Hijab",
      hairColor: "Blonde",
      hatColor: "PastelGreen",
      accessoriesType: "Prescription01",
      clotheType: "Hoodie",
      clotheColor: "Blue02",
      graphicType: "Selena",
      eyeType: "EyeRoll",
      eyebrowType: "UpDownNatural",
      mouthType: "Twinkle",
      skinColor: "Brown",
    },
  },
];

function SideDrawer(props) {
  const { classes } = props;
  const sidedrawer = useSelector((state) => state.ui.sidedrawer);
  const dispatch = useDispatch();

  const onClose = (val) => {
    dispatch(isSidedrawerOpen(val));
  };

  return (
    <Drawer
      anchor="right"
      open={sidedrawer}
      variant="temporary"
      onClose={() => onClose(false)}
    >
      <Toolbar disableGutters className={classes.toolbar}>
        <Box
          pl={3}
          pr={3}
          display="flex"
          justifyContent="space-between"
          width="100%"
          alignItems="center"
        >
          <Typography variant="h6">A Sidedrawer</Typography>
          <IconButton
            onClick={() => onClose(false)}
            color="primary"
            aria-label="Close Sidedrawer"
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Toolbar>
      <Divider />
      <Box
        pl={3}
        pr={3}
        flex-direction="column"
        justifyContent="space-between"
        width="100%"
        alignItems="center"
      >
        {comments.map((c) => {
          return <CommentCard {...c} />;
        })}
      </Box>
    </Drawer>
  );
}

SideDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(SideDrawer);
