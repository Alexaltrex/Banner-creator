import {Dialog, makeStyles} from "@material-ui/core";
import React, {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    getDownloadCase,
    getFileName,
    getFileNameFormIsValid,
    getIsDownloadDialogOpen, getJpegQuality, getLink, getLinkFormIsValid
} from "../../../../../Store/selectors/workspace-selectors";
import {workspaceAC} from "../../../../../Store/reducers/workspace-reducer";
import DialogTitle from "@material-ui/core/DialogTitle";
import {getLang} from "../../../../../Store/selectors/app-selectors";
import {translate} from "../../../../../Utils/lang";
import indigo from "@material-ui/core/colors/indigo";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import FileNameForm from "./FileNameForm";
import {getCanvasUrl, getSize} from "../../../../../Store/selectors/editor-selectors";
import Typography from "@material-ui/core/Typography";
import JpegQuality from "./JpegQuality";
import LinkForm from "./LinkForm";

//============= CUSTOM HOOK ================
const useDownloadDialog = () => {
    const classes = useStyles();
    const lang = useSelector(getLang);
    const downloadCase = useSelector(getDownloadCase);
    const contentLabel = translate(lang, 'Download created banner as');
    const titleLabel = translate(lang, 'Download');
    const nameLabel = translate(lang, 'Enter a file name:');
    const cancelLabel = translate(lang, 'Cancel');
    const isDownloadDialogOpen = useSelector(getIsDownloadDialogOpen);
    const canvasUrl = useSelector(getCanvasUrl);
    const fileName = useSelector(getFileName);
    const size = useSelector(getSize);
    const fileNameFormIsValid = useSelector(getFileNameFormIsValid);
    const link = useSelector(getLink);
    const linkFormIsValid = useSelector(getLinkFormIsValid);
    const jpegQuality = useSelector(getJpegQuality);
    const dispatch = useDispatch();
    const onCloseHandler = () => {
        dispatch(workspaceAC.setIsDownloadDialogOpen(false));
    };
    let canvasAllUrl = '';
    let download = '';
    const linkLabel = translate(lang, 'Enter a link:');
    const copyLabel = translate(lang, 'Copy');

    const canvasAll = document.createElement('canvas');
    canvasAll.width = size.width as number;
    canvasAll.height = size.height as number;
    const ctxAll = canvasAll.getContext('2d');

    const imgBackground = new Image();
    // imgBackground.onload = () => {
    //     ctxAll!.drawImage(imgBackground, 0, 0);
    // };
    imgBackground.src = canvasUrl.background as string;
    ctxAll!.drawImage(imgBackground, 0, 0);

    if (canvasUrl.border) {
        const imgBorder = new Image();
        // imgBorder.onload = () => {
        //     ctxAll!.drawImage(imgBorder, 0, 0);
        // };
        imgBorder.src = canvasUrl.border as string;
        ctxAll!.drawImage(imgBorder, 0, 0);
    }

    const imgText = new Image();
    // imgText.onload = () => {
    //     ctxAll!.drawImage(imgText, 0, 0);
    // };
    imgText.src = canvasUrl.text as string;
    ctxAll!.drawImage(imgText, 0, 0);

    //if (downloadCase === 'PNG') {
    canvasAllUrl = canvasAll.toDataURL();
    download = `${fileName}.png`;
    //}
    if (downloadCase === 'JPEG') {
        canvasAllUrl = canvasAll.toDataURL('image/jpeg', jpegQuality);
        download = `${fileName}.jpg`
    }
    const html = `<a href="http://${link}"><img src=${canvasAllUrl} width="${size.width}" height="${size.height}">`

    const textareaRef = useRef(null);
    const onCopyHandler = () => {
        if (textareaRef !== null) {
            // @ts-ignore
            textareaRef.current.select();
            document.execCommand('copy');
        }
    };

    return {
        isDownloadDialogOpen, onCloseHandler, titleLabel, classes,
        downloadCase, contentLabel, nameLabel, canvasAllUrl, html,
        fileNameFormIsValid, download, linkLabel, cancelLabel,
        linkFormIsValid, textareaRef, copyLabel, onCopyHandler,
    }
};


//============= COMPONENT ==================
const DownloadDialog: React.FC<{}> = () => {
    const {
        isDownloadDialogOpen, onCloseHandler, titleLabel, classes,
        downloadCase, contentLabel, nameLabel, canvasAllUrl, html,
        fileNameFormIsValid, download, linkLabel, cancelLabel,
        linkFormIsValid, textareaRef, copyLabel, onCopyHandler
    } = useDownloadDialog();

    return (
        <Dialog
            open={isDownloadDialogOpen}
            onClose={onCloseHandler}
        >
            <DialogTitle className={classes.dialogTitle}>
                {`${contentLabel} ${downloadCase}`}
            </DialogTitle>
            <DialogContent>

                {
                    (downloadCase === 'PNG' || downloadCase === 'JPEG') &&
                    <>
                        <DialogContentText className={classes.dialogContentText}>
                            {nameLabel}
                        </DialogContentText>
                        <FileNameForm/>
                    </>
                }

                {
                    downloadCase === 'HTML' &&
                    <>
                        <DialogContentText className={classes.dialogContentText}>
                            {linkLabel}
                        </DialogContentText>
                        <LinkForm/>
                        {
                            linkFormIsValid &&
                            <textarea ref={textareaRef}
                                      readOnly
                                      className={classes.textarea}
                                      rows={4}
                                      value={html}

                            />
                        }
                    </>
                }

                {
                    downloadCase === 'JPEG' &&
                    <JpegQuality/>
                }
            </DialogContent>

            <DialogActions>
                {
                    fileNameFormIsValid ?
                        <>
                            {
                                (downloadCase === 'PNG' || downloadCase === 'JPEG') &&
                                <Link variant='subtitle2'
                                      underline='none'
                                      href={canvasAllUrl as string}
                                      onClick={onCloseHandler}
                                      download={download}
                                      className={classes.link}
                                >
                                    {titleLabel}
                                </Link>
                            }
                        </>
                        : <Typography variant='subtitle2'
                                      color='textSecondary'
                                      className={classes.typography}
                        >
                            {titleLabel}
                        </Typography>
                }
                {
                    downloadCase === 'HTML' && linkFormIsValid &&
                    <Button onClick={onCopyHandler}
                            className={classes.button}
                            color="primary"
                            variant='outlined'
                    >
                        {copyLabel}
                    </Button>
                }
                <Button onClick={onCloseHandler}
                        variant='outlined'
                        className={classes.button}
                        color="primary">
                    {cancelLabel}
                </Button>
            </DialogActions>

        </Dialog>
    )
};
export default DownloadDialog;

//=================== STYLES ===================
const useStyles = makeStyles({
    dialogTitle: {
        backgroundColor: indigo[600],
        color: '#fff',
        paddingTop: 5,
        paddingBottom: 5
    },
    button: {
        textTransform: 'none'
    },
    dialogContentText: {
        color: '#000'
    },
    textarea: {
        marginTop: 20,
        width: '100%',
        resize: 'none',
        borderRadius: 5,
        border: '1px solid #ccc',
        '&:focus': {
            border: '1px solid red'
        }
    },
    link: {
        border: '1px solid rgba(63, 81, 181, 0.5)',
        borderRadius: 4,
        padding: '6px 15px',
        '&:hover': {
            border: '1px solid rgba(63, 81, 181, 1)',
        }
    },
    typography: {
        border: '1px solid #ccc',
        borderRadius: 4,
        padding: '6px 15px',
    }
})
