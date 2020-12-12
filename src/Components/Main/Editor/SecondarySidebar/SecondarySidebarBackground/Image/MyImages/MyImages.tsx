import Button from "@material-ui/core/Button";
import BackupIcon from "@material-ui/core/SvgIcon/SvgIcon";
import React, {ChangeEvent, useRef} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useDispatch, useSelector} from "react-redux";
import {loadImage} from "../../../../../../../Store/reducers/editor-reducer";
import {getImages} from "../../../../../../../Store/selectors/editor-selectors";
import MyImagesItem from "./MyImagesItem";

//============ CUSTOM HOOK ====================
const useImageMyImages = () => {
    const classes = useStyles();
    const ref = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();
    const images = useSelector(getImages);

    const imgCardElements = images.map(
        el => <MyImagesItem image={el}/>
    );

    const onChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            dispatch(loadImage(file))
        }
    };
    const onClickHandler = () => {
        if (ref && ref.current) {
            ref.current.click()
        }

    };
    return {
        classes, onChangeHandle, onClickHandler,
        ref, imgCardElements
    }
};

//================= COMPONENT ========================
const MyImages: React.FC<{}> = () => {
    const {
        classes, onChangeHandle, onClickHandler,
        ref, imgCardElements
    } = useImageMyImages();

    return (
        <div className={classes.imageMyImages}>
            <div>
                <input
                    ref={ref}
                    accept="image/*"
                    onChange={onChangeHandle}
                    className={classes.input}
                    id="12345"
                    multiple
                    type="file"
                />
                <label htmlFor="12345"
                       className={classes.label}
                >
                    <Button
                        variant='contained'
                        fullWidth
                        //component
                        startIcon={<BackupIcon/>}
                        className={classes.button}
                        onClick={onClickHandler}
                    >
                        Upload image
                    </Button>
                </label>
            </div>
            <div className={classes.imagesWrapper}>
                <div className={classes.subWrapper}>
                    {imgCardElements}
                </div>
            </div>
        </div>

    )
};
export default MyImages

//========================== STYLES ================================================
const useStyles = makeStyles({
        imageMyImages: {
            boxSizing: 'border-box',
            padding: '10px 0',
            height: 'calc(100vh - 64px - 117px - 32px)'
        },
        input: {
            display: 'none'
        },
        label: {
            display: 'block'
        },
        button: {
            //color: 'white',
            textTransform: 'none',
            backgroundColor:
                'white',
            marginBottom: 20
        },
        img: {
            width: 110,
            borderRadius: 5,
            '&:not(:last-child)': {
                marginBottom: 20
            }
        },
        imagesWrapper: {
            width: 230,
            height: 'calc(100vh - 64px - 117px - 32px - 56px)',
            overflow: 'auto',
        },
        subWrapper: {
            maxHeight: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridGap: 10,
            gridRowGap: 10,
            alignItems: 'start',
        }
    })
;