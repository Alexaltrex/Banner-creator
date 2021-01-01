import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Card} from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import {ImageType} from "../../../../../../../Types/types";
import {useDispatch} from "react-redux";
import {editorAC} from "../../../../../../../Store/reducers/editor-reducer";

//================== CUSTOM HOOK ================
const useMyImagesItem = (image: ImageType) => {
    const classes = useStylesForm();
    const imgSrc = image.src as string;
    const dispatch = useDispatch();
    const onClickHandler = () => {
        dispatch(editorAC.setBackgroundStyle('image'));
        dispatch(editorAC.setCurrentImage(image.id));
    };
    return {
        classes, imgSrc, onClickHandler
    }
};

//================== COMPONENT =================
const MyImagesItem: React.FC<PropsType> = ({image}) => {
    const {
        classes, imgSrc, onClickHandler
    } = useMyImagesItem(image);

    return (
        <Card elevation={6}>
            <CardActionArea onClick={onClickHandler}>
                <img src={imgSrc} alt="" className={classes.img}/>
            </CardActionArea>
        </Card>
    )
};
export default MyImagesItem
//=============== TYPE ===============
type PropsType = {
   image: ImageType
}

//================= STYLES ================
const useStylesForm = makeStyles({
    img: {
        width: 110,
        display: 'block'
    }
})