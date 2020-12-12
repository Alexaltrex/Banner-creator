import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useDispatch, useSelector} from "react-redux";
import {getLang} from "../../../../Store/selectors/app-selectors";
import {translate} from "../../../../Utils/lang";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {IconButton} from "@material-ui/core";
import {getShowSecondSidebar} from "../../../../Store/selectors/editor-selectors";
import {editorAC} from "../../../../Store/reducers/editor-reducer";

//================= CUSTOM HOOK =====================
const useSecondarySidebarTitle = (title: string) => {
    const classes = useStyles();
    const lang = useSelector(getLang);
    const dispatch = useDispatch();
    const showSecondSidebar = useSelector(getShowSecondSidebar);
    const titleLabel = translate(lang, title);
    const onClickHandler = () => {
        dispatch(editorAC.setShowSecondSidebar(!showSecondSidebar));
    };
    return {
        classes, titleLabel, onClickHandler
    }
};

//================= COMPONENT ======================
const SecondarySidebarTitle: React.FC<PropsType> = ({title})  => {
    const {
        classes, titleLabel, onClickHandler
    } = useSecondarySidebarTitle(title);

    return (
        <div className={classes.title}>
            <Typography variant='h6'
                        className={classes.typography}
            >
                {titleLabel}
            </Typography>
            <IconButton onClick={onClickHandler}
                        className={classes.icon}
                        size='small'
            >
                <ArrowBackIcon />
            </IconButton>
        </div>
    )
};
export default SecondarySidebarTitle;

//============= TYPE ===============
type PropsType = {
    title: string
};

//============ STYLES =================
const useStyles = makeStyles({
    title: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10
    },
    typography: {
        color: 'white'
    },
    icon: {
        color: 'white'
    }
});