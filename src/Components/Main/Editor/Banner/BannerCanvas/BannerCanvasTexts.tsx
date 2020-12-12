import React, {ReactElement, useEffect, useRef} from "react";
import {makeStyles} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {getSize} from "../../../../../Store/selectors/editor-selectors";
import {getTexts} from "../../../../../Store/selectors/text-selectors";
import {editorAC} from "../../../../../Store/reducers/editor-reducer";

//============ CUSTOM HOOK ====================
const useBannerCanvasTexts = () => {
    const classes = useStyles();
    const size = useSelector(getSize);
    const texts = useSelector(getTexts);
    let canvasRef = useRef<HTMLCanvasElement | null>(null);
    let canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (canvasRef.current && size.width && size.height) {
            canvasCtxRef.current = canvasRef.current.getContext('2d');
            let ctx = canvasCtxRef.current;
            ctx!.clearRect(0, 0, size.width, size.height);

            for (let i = 0; i < texts.length; i++) {
                let content = texts[i].content;
                if (texts[i].lowerCase) {
                    content = content.toLowerCase();
                }
                if (texts[i].upperCase) {
                    content = content.toUpperCase();
                }

                ctx!.fillStyle = texts[i].color;
                ctx!.font = `${texts[i].fontStyle} ${texts[i].fontSize}px ${texts[i].fontFamily}`;
                ctx!.fillText(content, texts[i].position.left, texts[i].position.top);
                ctx!.textBaseline = 'top';
            }

            dispatch(editorAC.setCanvasUrl('text', canvasRef.current.toDataURL()))
        }
    }, [texts]);

    return {
        classes, size, canvasRef
    }
}


//============== COMPONENT =================
const BannerCanvasTexts: React.FC<{}> = (): ReactElement => {
    const {
        classes, size, canvasRef
    } = useBannerCanvasTexts();
    return (
        <>
            {
                size.width && size.height &&
                <canvas
                    className={classes.bannerCanvasTexts}
                    ref={canvasRef}
                    width={size.width}
                    height={size.height}
                />
            }
        </>
    )
};

const BannerCanvasTextsMemo = React.memo(BannerCanvasTexts);
export default BannerCanvasTextsMemo;

//======================== STYLES ========================
const useStyles = makeStyles({
    bannerCanvasTexts: {
        position: 'absolute',
        top: 0,
        left: 0
    }
});