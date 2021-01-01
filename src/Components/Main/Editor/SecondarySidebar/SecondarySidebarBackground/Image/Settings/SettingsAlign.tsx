import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import SettingsAlignButton from "./SettingsAlignButton";
import {useSelector} from "react-redux";
import {getLang} from "../../../../../../../Store/selectors/app-selectors";
import {translate} from "../../../../../../../Utils/lang";
import {Typography} from "@material-ui/core";
import {AlignType} from "../../../../../../../Types/types";

//============ CUSTOM HOOK ====================
const useAlign = () => {
    const classes = useStyles();
    const lang = useSelector(getLang);
    const alignLabel = translate(lang, 'Align');
    const aligns = [
        'left-top',
        'center-top',
        'right-top',
        'left-center',
        'center',
        'right-center',
        'left-bottom',
        'center-bottom',
        'right-bottom'
    ] as Array<AlignType>;
    const alignButtonsElements = aligns.map(
        el => <SettingsAlignButton key={el} ownAlign={el}/>
    );

    return {
        classes, alignLabel, alignButtonsElements
    }
};

//================= COMPONENT ========================
const SettingsAlign: React.FC<{}> = () => {
    const {
        classes, alignLabel, alignButtonsElements
    } = useAlign();

    return (
        <div className={classes.align}>
            <Typography className={classes.typography}
                        variant='body2'
            >
                {alignLabel}
            </Typography>
            <div className={classes.alignButtonWrapper}>
                {alignButtonsElements}
            </div>
        </div>
    )
};
export default SettingsAlign

//========================== STYLES ================================================
const useStyles = makeStyles({
    align: {
        display: 'flex',
        alignItems: 'center'
    },
    typography: {
        color: '#fff',
        marginRight: 20
    },
    alignButtonWrapper: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridGap: 12,
        width: 60
    }

});