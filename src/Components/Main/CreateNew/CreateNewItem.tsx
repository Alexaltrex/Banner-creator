import React from "react";
import {Card} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {Link as RouterLink} from "react-router-dom";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import {editorAC} from "../../../Store/reducers/editor-reducer";
import CreateNewItemGraph from "./CreateNewItemGraph";
import grey from "@material-ui/core/colors/grey";
import {appAC} from "../../../Store/reducers/app-reducer";

//================= CUSTOM HOOK =========================
const useCreateNewItem = (width: number, height: number) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const onClickHandler = () => {
        dispatch(editorAC.setSize({width, height}));
        dispatch(appAC.setIsCreated(true));
    };
    return {
        classes, onClickHandler
    }
};

//======================= COMPONENT ===============================
const CreateNewItem: React.FC<PropsType> = (props) => {
    const {sizeLabel, width, height} = props;
    const {
        classes, onClickHandler
    } = useCreateNewItem(width, height);

    return (
        <Card className={classes.root} elevation={6}>
            <CardActionArea component={RouterLink}
                            className={classes.cardActionArea}
                            onClick={onClickHandler}
                            to='/editor'>
                <CardContent className={classes.cardContent}>
                    <div className={classes.graph}>
                        <CreateNewItemGraph width={width} height={height}/>
                    </div>
                    <div className={classes.description}>
                        <Typography gutterBottom variant="subtitle2" component="h6" align='center'>
                            {sizeLabel}
                        </Typography>
                        <Typography gutterBottom variant="body2" component="h6" align='center'>
                            {`${width} x ${height} px`}
                        </Typography>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    )
};
export default CreateNewItem;

//=================== TYPE ==============
type PropsType = {
    sizeLabel: string
    width: number
    height: number
}

//================= STYLES ================
const useStyles = makeStyles({
    root: {
        width: 150,
        height: 150,
        margin: 5,
        '&:hover': {
            backgroundColor: grey[200]
        }
    },
    cardActionArea: {
        height: '100%'
    },
    cardContent: {
        padding: 0,
        '&:last-child': {
            //paddingBottom: 5
        },
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    graph: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    description: {
        padding: 5,
    }
});