import BackupIcon from '@material-ui/icons/Backup';
import React, {
    //ChangeEvent, useRef
} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useDispatch, useSelector} from "react-redux";
import {
    //loadImage,
    loadImages
} from "../../../../../../../Store/reducers/editor-reducer";
import {getImages} from "../../../../../../../Store/selectors/editor-selectors";
import MyImagesItem from "./MyImagesItem";
import {DropzoneRootProps, useDropzone} from "react-dropzone";
import styled from "styled-components";
import {getLang} from "../../../../../../../Store/selectors/app-selectors";
import {translate} from "../../../../../../../Utils/lang";


//============ CUSTOM HOOK ====================
const useImageMyImages = () => {
    const classes = useStyles();
    //const ref = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();
    const images = useSelector(getImages);
    const lang = useSelector(getLang);
    const label1 = translate(lang, 'Drag and drop some files here,');
    const label2 = translate(lang, 'or click to select files');

    const imgCardElements = images.map(
        el => <MyImagesItem key={el.id} image={el}/>
    );

    // const onChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files) {
    //         const file = e.target.files[0];
    //         dispatch(loadImage(file))
    //     }
    // };
    // const onClickHandler = () => {
    //     if (ref && ref.current) {
    //         ref.current.click()
    //     }
    // };

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        accept: 'image/*',
        onDrop: files => dispatch(loadImages(files))
    });


    return {
        //ref, onChangeHandle, onClickHandler,
        classes, imgCardElements, getRootProps,
        getInputProps, isDragActive, isDragAccept,
        isDragReject, label1, label2
    }
};

//=================== STYLED ======================
const getColor = (props: DropzoneRootProps) => {
    if (props.isDragAccept) {
        return '#00e676';
    }
    if (props.isDragReject) {
        return '#ff1744';
    }
    if (props.isDragActive) {
        return '#2196f3';
    }
    return '#eeeeee';
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  cursor: pointer;
  background-color: #8d6e63;
  color: #FFF;
  outline: none;
  transition: border .24s ease-in-out;
  transition: background-color 0.3s;
  margin-bottom: 10px;
  height: 148px;
  &:hover {
    background-color: #a1887f;
  } 
`;

//================= COMPONENT ========================
const MyImages: React.FC<{}> = () => {
    const {
        //ref, onChangeHandle, onClickHandler,
        classes, imgCardElements, getRootProps,
        getInputProps, isDragActive, isDragAccept,
        isDragReject, label1, label2
    } = useImageMyImages();

    return (
        <div className={classes.imageMyImages}>
            {/*<div>*/}
            {/*    <input*/}
            {/*        ref={ref}*/}
            {/*        accept="image/*"*/}
            {/*        onChange={onChangeHandle}*/}
            {/*        className={classes.input}*/}
            {/*        id="12345"*/}
            {/*        multiple*/}
            {/*        type="file"*/}
            {/*    />*/}
            {/*    <label htmlFor="12345"*/}
            {/*           className={classes.label}*/}
            {/*    >*/}
            {/*        <Button*/}
            {/*            variant='contained'*/}
            {/*            fullWidth*/}
            {/*            startIcon={<BackupIcon/>}*/}
            {/*            className={classes.button}*/}
            {/*            onClick={onClickHandler}*/}
            {/*        >*/}
            {/*            Upload image*/}
            {/*        </Button>*/}
            {/*    </label>*/}
            {/*</div>*/}

            <div>
                <Container {...getRootProps({isDragActive, isDragAccept, isDragReject})}
                >
                    <input {...getInputProps()} />
                    <p>{label1}</p>
                    <div className={classes.fakeButton}>
                        <BackupIcon style={{
                            marginRight: 10
                        }}/>
                        <p>Upload file(s)</p>
                    </div>
                    <p>{label2}</p>
                </Container>
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
            height: 'calc(100vh - 64px - 117px - 140px)'
        },
        input: {
            display: 'none'
        },
        label: {
            display: 'block'
        },
        button: {
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
            height: 'calc(100vh - 64px - 117px - 140px - 56px)',
            overflow: 'auto',
        },
        subWrapper: {
            maxHeight: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridGap: 10,
            gridRowGap: 10,
            alignItems: 'start',
        },
        fakeButton: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0px 20px',
            backgroundColor: '#FFF',
            borderRadius: 5,
            color: '#000'
        },
    });