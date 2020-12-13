import {useDispatch, useSelector} from "react-redux";
import {
    getBorderColor,
    getSize
} from "../../../../../Store/selectors/editor-selectors";
import {makeStyles} from "@material-ui/core";
import React, {ReactElement, useEffect, useRef} from "react";
import {getZoom} from "../../../../../Store/selectors/workspace-selectors";
import {editorAC} from "../../../../../Store/reducers/editor-reducer";

//============ CUSTOM HOOK ====================
const useBannerCanvasBackground = () => {
    const classes = useStyles();
    const size = useSelector(getSize);
    const zoom = useSelector(getZoom);
    const dispatch = useDispatch();
    const borderColor = useSelector(getBorderColor);
    let canvasRef = useRef<HTMLCanvasElement | null>(null);
    let canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);

    useEffect(() => {
        if (canvasRef.current && size.width && size.height) {
            canvasCtxRef.current = canvasRef.current.getContext('2d');
            let ctx = canvasCtxRef.current;
            ctx!.clearRect(0, 0, size.width, size.height);
            ctx!.strokeStyle = borderColor;
            ctx!.lineWidth = 4;
            ctx!.strokeRect(0, 0, size.width, size.height);
            dispatch(editorAC.setCanvasUrl('border', canvasRef.current.toDataURL()))
        }
    }, [size, borderColor]);

    return {
        classes, size, canvasRef, zoom
    }
};

//============== COMPONENT =================
const BannerCanvasBorder: React.FC<{}> = (): ReactElement => {
    const {
        classes, size, canvasRef, zoom
    } = useBannerCanvasBackground();

    return (
        <>
            {
                size.width && size.height &&
                <canvas
                    className={classes.bannerCanvasBorder}
                    ref={canvasRef}
                    width={size.width}
                    height={size.height}
                    style={{
                        transform: `scale(${zoom/100})`,
                        transformOrigin: 'left top'
                    }}
                />
            }
        </>
    )
};
export default BannerCanvasBorder;

//======================== STYLES ========================
const useStyles = makeStyles({
    bannerCanvasBorder: {
        position: 'absolute',
        top: 0,
        left: 0
    }
});