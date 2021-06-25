import React, { useEffect, useState, useCallback } from "react";
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
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch } from 'react-redux'
import { setAvatar } from '../../../shared/redux/actions/auth.actions.js'
import { saveUser } from '../../../shared/functions/requests.js';
import { useSnackbar } from 'notistack';

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
  nested: {
    paddingLeft: theme.spacing(6)
  },
  avatar: {
    marginLeft: theme.spacing(6),
  },
  openClose: {
    marginRight: theme.spacing(3),
    cursor: 'pointer'
  }

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
  const avatar = useSelector(state => state.auth.avatar)
  const { classes } = props;
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [isDefaultLoading] = useState(false);
  const [top, setTop] = useState('');
  const [accessories, setAccessories] = useState('');
  const [hairColor, setHairColor] = useState('');
  const [hatColor, setHatColor] = useState('');
  const [facialHair, setFacialHair] = useState('');
  const [facialHairColor, setFacialHairColor] = useState('');
  const [clothes, setClothes] = useState('');
  const [graphic, setGraphic] = useState('');
  const [fabricColor, setFabricColor] = useState('');
  const [eyes, setEyes] = useState('');
  const [eyebrow, setEyebrow] = useState('');
  const [mouth, setMouth] = useState('');
  const [skin, setSkin] = useState('');
  const [topOpen, setTopOpen] = useState(false);
  const [facialOpen, setFacialOpen] = useState(false);
  const [clothesOpen, setClothesOpen] = useState(false);
  const auth = useSelector(state => state.auth)
  const { enqueueSnackbar } = useSnackbar();

  const classes_ = useStyles();
  const dispatch = useDispatch()

  const firstCall = useCallback(() => {
    console.log("alcpaha fist", avatar)
    if (avatar) {
      setTop(avatar.topType);
      setAccessories(avatar.accessoriesType);
      setHairColor(avatar.hairColor);
      setHatColor(avatar.hatColor);
      setFacialHair(avatar.facialHairType);
      setFacialHairColor(avatar.facialHairColor);
      setClothes(avatar.clotheType);
      setGraphic(avatar.graphicType);
      setFabricColor(avatar.clotheColor);
      setEyes(avatar.eyeType);
      setEyebrow(avatar.eyebrowType);
      setMouth(avatar.mouthType);
      setSkin(avatar.skinColor);
    } else {
      onSetRandom()
    }
  }, [avatar])

  useEffect(() => {
    firstCall()
  }, [])

  const notify = (msg, variant) => {
    // variant could be success, error, warning, info, or default
    console.log('notify')
    enqueueSnackbar(msg, { variant });
  };

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
  }, [setSkin, setMouth, setEyebrow, setEyes, setFabricColor, setGraphic, setClothes,
    setFacialHairColor, setFacialHair, setHatColor, setHairColor, setAccessories, setTop]);

  const saveAvatar = useCallback(() => {
    return saveUser(auth.id, auth, auth.token)
  }, [auth]);


  const onSubmit = useCallback(() => {
    setIsSaveLoading(true);
    const avatar_ = {
      topType: top,
      hairColor: hairColor,
      hatColor: hatColor,
      accessoriesType: accessories,
      facialHairType: facialHair,
      facialHairColor: facialHairColor,
      clotheType: clothes,
      clotheColor: fabricColor,
      graphicType: graphic,
      eyeType: eyes,
      eyebrowType: eyebrow,
      mouthType: mouth,
      skinColor: skin
    }
    console.log("AV save", auth.id, avatar_)
    dispatch(setAvatar(avatar_))
    auth.avatar = avatar_
    saveAvatar(auth.id, auth, auth.token).then(res => {
      setIsSaveLoading(false);
      notify('Avatar saved', 'success')
    }
    )
      .catch(e => {
        notify('Something went wrong', 'error')
        setIsSaveLoading(false);

      })
  }, [setIsSaveLoading, auth, top, hairColor, hatColor, accessories, facialHair, facialHairColor, clothes]);

  const inputs = [
    {
      state: top,
      options: topOptions,
      label: "Top",
      stateName: "top",
      open: { var: topOpen, fun: setTopOpen },
      colapse:
        [
          {
            state: top,
            options: topOptions,
            label: "Top",
            stateName: "top",
            open: true,
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
        ]

    },
    {
      state: accessories,
      options: accessoriesOptions,
      label: "Accessories",
      stateName: "accessories",
      colapse: []
    },
    {
      state: facialHair,
      options: facialHairOptions,
      label: "Facial Hair",
      stateName: "facialHair",
      open: { var: facialOpen, fun: setFacialOpen },
      colapse: [
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
      ]
    },
    {
      state: clothes,
      options: clothesOptions,
      label: "Clothes",
      stateName: "clothes",
      open: { var: clothesOpen, fun: setClothesOpen },
      colapse: [
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
        }
      ]
    },
    {
      state: eyes,
      options: eyesOptions,
      label: "Eyes",
      stateName: "eyes",
      colapse: []
    },
    {
      state: eyebrow,
      options: eyebrowOptions,
      label: "Eyebrow",
      stateName: "eyebrow",
      colapse: []
    },
    {
      state: mouth,
      options: mouthOptions,
      label: "Mouth",
      stateName: "mouth",
      colapse: []
    },
    {
      state: skin,
      options: skinOptions,
      label: "Skin",
      stateName: "skin",
      colapse: []
    },
  ];

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Avatar Selection</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.dBlock}>
        <Grid container
          spacing={2}
          justify="center"
          alignItems="center">
          <Grid item xs={4}>
            <div className={classes_.avatar}>
              <Avatar
                avatarStyle='Circle'
                topType={top}
                hairColor={hairColor}
                hatColor={hatColor}
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

            </div>
          </Grid>
          <Grid item xs={8}>

            <List disablePadding>
              <Bordered disableVerticalPadding disableBorderRadius>
                {inputs.map((element, index) => (
                  <div key={element.label}>
                    <ListItem
                      className="listItemLeftPadding"
                      disableGutters
                      divider
                      key={'avt' + index}
                    >
                      <ListItemText>
                        <Typography variant="body2">{element.label}</Typography>
                      </ListItemText>
                      {
                        element.colapse.length === 0 && (
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
                                  <MenuItem value={innerElement} key={"inner" + innerElement}>
                                    {innerElement}
                                  </MenuItem>
                                ))}
                              </Select>
                            </ListItemSecondaryAction>
                          </FormControl>
                        )
                      }

                      {element.open && (element.open.var ?
                        <ExpandMore className={classes_.openClose}
                          onClick={() => element.open.fun(!element.open.var)} /> :
                        <ExpandLess className={classes_.openClose}
                          onClick={() => element.open.fun(!element.open.var)} />)}
                    </ListItem>
                    {element.open &&
                      <Collapse in={element.open.var} timeout="auto" unmountOnExit>
                        {
                          element.colapse.map((colEl, colIndex) => (
                            <List key={colEl.stateName} component="div" disablePadding>
                              <ListItem divider className={classes_.nested}>
                                <ListItemText>
                                  <Typography variant="body2">{colEl.label}</Typography>
                                </ListItemText>
                                <FormControl variant="outlined">
                                  <ListItemSecondaryAction >
                                    <Select
                                      value={colEl.state}
                                      onChange={handleChange}
                                      input={
                                        <OutlinedInput
                                          name={colEl.stateName}
                                          labelWidth={0}
                                          className={classes_.options}
                                          classes={{ input: classes.numberInputInput }}
                                        />
                                      }
                                      MenuProps={{ disableScrollLock: true }}
                                    >
                                      {colEl.options.map((innerElement) => (
                                        <MenuItem value={innerElement} key={innerElement}>
                                          {innerElement}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </ListItemSecondaryAction>
                                </FormControl>
                              </ListItem>
                            </List>
                          )
                          )
                        }
                      </Collapse>
                    }

                  </div>
                ))}

              </Bordered>
            </List>
          </Grid>

        </Grid>
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
