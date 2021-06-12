import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  Button,
  Accordion,
  AccordionSummary,
  Typography,
  ListItemText,
  OutlinedInput,
  AccordionDetails,
  MenuItem,
  FormControl,
  Select,
  Box,
  withStyles,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import withWidth from "@material-ui/core/withWidth";
import Bordered from "../../../shared/components/Bordered";
import ButtonCircularProgress from "../../../shared/components/ButtonCircularProgress";
import Avatar from 'avataaars'
import _ from "lodash"
import { makeStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  numberInput: {
    width: 110,
  },
  numberInputInput: {
    padding: "9px 34px 9px 14.5px",
  },
  dBlock: { display: "block" },
  listItemLeftPadding: {
    paddingRight: theme.spacing(3),
  },
  accordionDetails: {
    paddintTop: theme.spacing(0),
    justifyContent: "flex-end",
  },
});

const useStyles = makeStyles((theme) => ({
  options: {
      width: '25vw'
      
  },
}))
const topOptions = ['NoHair', 'Eyepatch', 'Hat', 'Hijab', 'Turban', 'WinterHat1', 'WinterHat2', 'WinterHat3', 'WinterHat4', 'LongHairBigHair', 'LongHairBob', 'LongHairBun', 'LongHairCurly', 'LongHairCurvy', 'LongHairDreads', 'LongHairFrida', 'LongHairFro', 'LongHairFroBand', 'LongHairNotTooLong', 'LongHairShavedSides', 'LongHairMiaWallace', 'LongHairStraight', 'LongHairStraight2', 'LongHairStraightStrand', 'ShortHairDreads01', 'ShortHairDreads02', 'ShortHairFrizzle', 'ShortHairShaggyMullet', 'ShortHairShortCurly', 'ShortHairShortFlat', 'ShortHairShortRound', 'ShortHairShortWaved', 'ShortHairSides', 'ShortHairTheCaesar', 'ShortHairTheCaesarSidePart']
const accessoriesOptions = ['Blank', 'Kurt', 'Prescription01', 'Prescription02', 'Round', 'Sunglasses', 'Wayfarers']
const hairColorOptions = ['Auburn', 'Black', 'Blonde', 'BlondeGolden', 'Brown', 'BrownDark', 'PastelPink', 'Platinum', 'Red', 'SilverGray']
const hatColorOptions = ['Black', 'Blue01', 'Blue02', 'Blue03', 'Gray01', 'Gray02', 'Heather', 'PastelBlue', 'PastelGreen', 'PastelOrange', 'PastelRed', 'PastelYellow', 'Pink', 'Red', 'White']
const facialHairOptions = ['Blank', 'BeardMedium', 'BeardLight', 'BeardMajestic', 'MoustacheFancy', 'MoustacheMagnum']
const facialHairColorOptions = ['Auburn', 'Black', 'Blonde', 'BlondeGolden', 'Brown', 'BrownDark', 'Platinum', 'Red']
const clothesOptions = ['BlazerShirt', 'BlazerSweater', 'CollarSweater', 'GraphicShirt', 'Hoodie', 'Overall', 'ShirtCrewNeck', 'ShirtScoopNeck', 'ShirtVNeck']
const graphicOptions = ['Bat', 'Cumbia', 'Deer', 'Diamond', 'Hola', 'Pizza', 'Resist', 'Selena', 'Bear', 'SkullOutline', 'Skull']
const fabricColorOptions = ['Black', 'Blue01', 'Blue02', 'Blue03', 'Gray01', 'Gray02', 'Heather', 'PastelBlue', 'PastelGreen', 'PastelOrange', 'PastelRed', 'PastelYellow', 'Pink', 'Red', 'White']
const eyesOptions = ['Close', 'Cry', 'Default', 'Dizzy', 'EyeRoll', 'Happy', 'Hearts', 'Side', 'Squint', 'Surprised', 'Wink', 'WinkWacky']
const eyebrowOptions = ['Angry', 'AngryNatural', 'Default', 'DefaultNatural', 'FlatNatural', 'RaisedExcited', 'RaisedExcitedNatural', 'SadConcerned', 'SadConcernedNatural', 'UnibrowNatural', 'UpDown', 'UpDownNatural']
const mouthOptions = ['Concerned', 'Default', 'Disbelief', 'Eating', 'Grimace', 'Sad', 'ScreamOpen', 'Serious', 'Smile', 'Tongue', 'Twinkle'] // 'Vomit'
const skinOptions = ['Tanned', 'Yellow', 'Pale', 'Light', 'Brown', 'DarkBrown', 'Black']

function AvatarSelection(props) {
  const { classes, pushMessageToSnackbar } = props;
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [isDefaultLoading, setIsDefaultLoading] = useState(false);
  const [top, setTop] = useState(_.sample(topOptions));
  const [accessories, setAccessories] = useState(_.sample(accessoriesOptions));
  const [hairColor, setHairColor] = useState(_.sample(hairColorOptions));
  const [hatColor, setHatColor] = useState(_.sample(hatColorOptions));
  const [facialHair, setFacialHair] = useState(_.sample(facialHairOptions));
  const [facialHairColor, setFacialHairColor] = useState(_.sample(facialHairColorOptions));
  const [clothes, setClothes] = useState(_.sample(clothesOptions));
  const [graphic, setGraphic] = useState(_.sample(graphicOptions));
  const [fabricColor, setFabricColor] = useState(_.sample(fabricColorOptions));
  const [eyes, setEyes] = useState(_.sample(eyesOptions));
  const [eyebrow, setEyebrow] = useState(_.sample(eyebrowOptions));
  const [mouth, setMouth] = useState(_.sample(mouthOptions));
  const [skin, setSkin] = useState(_.sample(skinOptions));
  const classes_ = useStyles();

  const handleChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      if (name === "option6") {
        if (value > 7500 || value < 1000) {
          return;
        }
      }
      switch (name) {
        case "top": {
          setTop(value);
          break;
        }
        case "accessories": {
          setAccessories(value);
          break;
        }
        case "hairColor": {
          setHairColor(value);
          break;
        }
        case "hatColor": {
          setHatColor(value);
          break;
        }
        case "facialHair": {
          setFacialHair(value);
          break;
        }
        case "facialHairColor": {
          setFacialHairColor(value);
          break;
        }
        case "clothes": {
          setClothes(value);
          break;
        }
        case "graphic": {
          setGraphic(value);
          break;
        }
        case "fabricColor": {
          setFabricColor(value);
          break;
        }
        case "eyes": {
          setEyes(value);
          break;
        }
        case "eyebrow": {
          setEyebrow(value);
          break;
        }
        case "mouth": {
          setMouth(value);
          break;
        }
        case "skin": {
          setSkin(value);
          break;
        }
        default:
          throw new Error("No branch selected in switch statement.");
      }
    },
    [setSkin, setMouth, setEyebrow, setEyes, setAccessories, setTop,
      setFabricColor, setClothes, setFacialHairColor, setFacialHair,
      setHatColor, setHairColor]
  );

  const resetState = useCallback(() => {
    setIsSaveLoading(false);
    setIsDefaultLoading(false);
    // setOption1("None");
    // setOption2("None");
    // setOption3("None");
    // setOption4("None");
    // setOption5("2 Days");
    // setOption6(7500);
  }, [
    setIsSaveLoading,
    setIsDefaultLoading,
    // setOption1,
    // setOption2,
    // setOption3,
    // setOption4,
    // setOption5,
    // setOption6,
  ]);

  const onSetRandom = useCallback(() => {
    setTop(_.sample(topOptions));
    setAccessories(_.sample(accessoriesOptions));
    setHairColor(_.sample(hairColorOptions));
    setHatColor(_.sample(hatColorOptions));
    setFacialHair(_.sample(facialHairOptions));
    setFacialHairColor(_.sample(facialHairColorOptions));
    setClothes(_.sample(clothesOptions));
    setGraphic(_.sample(graphicOptions));
    setFabricColor(_.sample(fabricColorOptions));
    setEyes(_.sample(eyesOptions));
    setEyebrow(_.sample(eyebrowOptions));
    setMouth(_.sample(mouthOptions));
    setSkin(_.sample(skinOptions));
  }, [setSkin, setMouth,setEyebrow,setEyes,setFabricColor,setGraphic,setClothes,
    setFacialHairColor,setFacialHair,setHatColor,setHairColor,setAccessories,setAccessories,setTop]);

  const onSubmit = useCallback(() => {
    setIsSaveLoading(true);
    setTimeout(() => {
      pushMessageToSnackbar({
        text: "Your settings have been saved",
      });
      setIsSaveLoading(false);
    }, 1500);
  }, [setIsSaveLoading, pushMessageToSnackbar]);

  const inputs = [
    {
      state: top,
      options: topOptions,
      label: "Top",
      stateName: "top",
    },
    {
      state: accessories,
      options: accessoriesOptions,
      label: "Accessories",
      stateName: "accessories",
    },
    {
      state: hairColor,
      options: hairColorOptions,
      label: "Hair Color",
      stateName: "hairColor",
    },
    {
      state: hatColor,
      options: hatColorOptions,
      label: "Hat Color",
      stateName: "hatColor",
    },
    {
      state: facialHair,
      options: facialHairOptions,
      label: "Facial Hair",
      stateName: "facialHair",
    },
    {
      state: facialHairColor,
      options: facialHairColorOptions,
      label: "Facial Hair Color",
      stateName: "facialHairColor",
    },
    {
      state: clothes,
      options: clothesOptions,
      label: "Clothes",
      stateName: "clothes",
    },
    {
      state: fabricColor,
      options: fabricColorOptions,
      label: "Fabric Color",
      stateName: "fabricColor",
    },
    {
      state: graphic,
      options: graphicOptions,
      label: "Graphic",
      stateName: "graphic",
    },
    {
      state: eyes,
      options: eyesOptions,
      label: "Eyes",
      stateName: "eyes",
    },
    {
      state: eyebrow,
      options: eyebrowOptions,
      label: "Eyebrow",
      stateName: "eyebrow",
    },
    {
      state: mouth,
      options: mouthOptions,
      label: "Mouth",
      stateName: "mouth",
    },
    {
      state: skin,
      options: skinOptions,
      label: "Skin",
      stateName: "skin",
    },
  ];

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Avatar Selection</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.dBlock}>
        <Avatar
          avatarStyle='Circle'
          topType={top}
          hairColor={hairColor}
          accessoriesType={accessories}
          facialHairType={facialHair}
          facialHairColor={facialHairColor}
          clotheType={clothes}
          clotheColor={fabricColor}
          graphicType={graphic}
          eyeType={eyes}
          eyebrowType={eyebrow}
          mouthType={mouth}
          skinColor={skin}
        />
        <List disablePadding>
          <Bordered disableVerticalPadding disableBorderRadius>
            {inputs.map((element, index) => (
              <ListItem
                className="listItemLeftPadding"
                disableGutters
                divider
                key={index}
              >
                <ListItemText>
                  <Typography variant="body2">{element.label}</Typography>
                </ListItemText>
                <FormControl variant="outlined">
                  <ListItemSecondaryAction >
                    <Select
                      value={element.state}
                      onChange={handleChange}
                      input={
                        <OutlinedInput
                          name={element.stateName}
                          labelWidth={0}
                          className={classes_.options}
                          classes={{ input: classes.numberInputInput }}
                        />
                      }
                      MenuProps={{ disableScrollLock: true }}
                    >
                      {element.options.map((innerElement) => (
                        <MenuItem value={innerElement} key={innerElement}>
                          {innerElement}
                        </MenuItem>
                      ))}
                    </Select>
                  </ListItemSecondaryAction>
                </FormControl>
              </ListItem>
            ))}

          </Bordered>
        </List>
      </AccordionDetails>
      <AccordionDetails className={classes.accordionDetails}>
        <Box mr={1}>
          <Button
            onClick={onSetRandom}
            disabled={isSaveLoading || isDefaultLoading}
          >
            Random {isDefaultLoading && <ButtonCircularProgress />}
          </Button>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          disabled={isSaveLoading || isDefaultLoading}
          onClick={onSubmit}
        >
          Save {isSaveLoading && <ButtonCircularProgress />}
        </Button>
      </AccordionDetails>
    </Accordion>
  );
}

AvatarSelection.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  pushMessageToSnackbar: PropTypes.func,
};

export default withWidth()(withStyles(styles, { withTheme: true })(AvatarSelection));
