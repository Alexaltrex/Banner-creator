import Button from "@material-ui/core/Button";
import React, {ReactElement} from "react";
import LanguageIcon from '@material-ui/icons/Language';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {getLang} from "../../Store/selectors/app-selectors";
import {appAC} from "../../Store/reducers/app-reducer";
import {translate} from "../../Utils/lang";


//================= CUSTOM HOOK =========================
const useHeaderLang = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const lang = useSelector(getLang);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleCloseRus = () => {
        dispatch(appAC.setLang('rus'));
        setAnchorEl(null);
    };
    const handleCloseEng = () => {
        dispatch(appAC.setLang('eng'));
        setAnchorEl(null);
    };
    const title = translate(lang, 'Change language');
    const englishLabel = translate(lang, 'English')
    return {classes, lang, anchorEl, title, englishLabel,
        handleClick, handleClose, handleCloseRus,
        handleCloseEng}
}

//======================= COMPONENT ===============================
const HeaderLang: React.FC<{}> = (): ReactElement => {
    const {classes, lang, anchorEl, title, englishLabel,
        handleClick, handleClose, handleCloseRus,
        handleCloseEng} = useHeaderLang();

    return (
        <>
            <Tooltip title={title} placement="bottom-start"
                     classes={{
                         tooltip: classes.tooltip,
                         arrow: classes.arrow
                     }}>
                <Button
                    className={classes.button}
                    startIcon={<LanguageIcon/>}
                    endIcon={<ExpandMoreIcon/>}
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    {englishLabel}
                </Button>
            </Tooltip>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleCloseEng}
                          selected={lang === 'eng'}
                >
                    English
                </MenuItem>
                <MenuItem onClick={handleCloseRus}
                          selected={lang === 'rus'}
                >
                    Русский
                </MenuItem>
            </Menu>
        </>
    )
};
export default HeaderLang;

//================================ STYLES =======================================
const useStyles = makeStyles({
    button: {
        color: 'white',
        marginRight: 50,
        textTransform: 'none'
    },
    tooltip: {
        backgroundColor: '#000'
    },
    arrow: {
        color: '#000'
    }
})