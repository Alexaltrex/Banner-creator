import makeStyles from "@material-ui/core/styles/makeStyles";
import React, {ReactElement} from "react";
import SetColorButton from "./SetColorButton";
import {useSelector} from "react-redux";
import {getLang} from "../../../../../../Store/selectors/app-selectors";
import {translate} from "../../../../../../Utils/lang";
import {Typography} from "@material-ui/core";
import SelectColorButton from "./SelectColorButton";

//============ CUSTOM HOOK ====================
const useColor = () => {
    const classes = useStyles();
    const colors = [
        {color: '#f44336', colorTitle: 'Red'},
        {color: '#e91e63', colorTitle: 'Pink'},
        {color: '#9c27b0', colorTitle: 'Purple'},
        {color: '#673ab7', colorTitle: 'Deep Purple'},
        {color: '#3f51b5', colorTitle: 'Indigo'},
        {color: '#2196f3', colorTitle: 'Blue'},
        {color: '#03a9f4', colorTitle: 'Light Blue'},
        {color: '#00bcd4', colorTitle: 'Cyan'},
        {color: '#009688', colorTitle: 'Teal'},
        {color: '#4caf50', colorTitle: 'Green'},
        {color: '#8bc34a', colorTitle: 'Light Green'},
        {color: '#cddc39', colorTitle: 'Lime'},
        {color: '#ffeb3b', colorTitle: 'Yellow'},
        {color: '#ffc107', colorTitle: 'Amber'},
        {color: '#ff9800', colorTitle: 'Orange'},
        {color: '#ff5722', colorTitle: 'Deep Orange'},
        {color: '#795548', colorTitle: 'Brown'},
        {color: '#9e9e9e', colorTitle: 'Grey'},
        {color: '#607d8b', colorTitle: 'Blue Grey'},
    ];
    const lang = useSelector(getLang);
    const defaultPresetsLabel = translate(lang, 'Default presets');

    return {
        classes, colors, defaultPresetsLabel,

    }
};

//============== COMPONENT =================
const Color: React.FC<{}> = (): ReactElement => {
    const {
        classes, colors, defaultPresetsLabel,
    } = useColor();
    const pickColorButtonElements = colors.map(
        el => <SetColorButton key={el.color}
                              color={el.color}
                              colorTitle={el.colorTitle}
        />
    );
    return (
        <div className={classes.scndSdbrBckgrndColor}>
            <div className={classes.colorsBlock}>
                <SelectColorButton />
                <SetColorButton color='#fff' colorTitle='White'/>
                <SetColorButton color='#858585' colorTitle='Grey'/>
                <SetColorButton color='#000' colorTitle='Black' />
            </div>
            <Typography variant='body2' className={classes.typography}>
                {defaultPresetsLabel}
            </Typography>
            <div className={classes.colorsBlock}>
                {pickColorButtonElements}
            </div>
        </div>
    )
};
export default Color;

//========================== STYLES ================================================
const useStyles = makeStyles({
    scndSdbrBckgrndColor: {
        margin: '20px 10px',
        flexGrow: 1
    },
    colorsBlock: {
        display: 'grid',
        gridGap: 10,
        gridTemplateColumns: 'repeat(4, 1fr)'
    },
    typography: {
        color: '#fff',
        margin: '20px 0 10px'
    }
});

