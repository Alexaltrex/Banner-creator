import React, {ReactElement, useEffect, useRef} from "react";
import {makeStyles} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {
    getAlign,
    getBackgroundStyle,
    getBackgroundStyleColor, getColorEnd, getColorStart, getCurrentImage,
    getGradientStyle, getScaleMode, getShowSecondSidebar,
    getSize
} from "../../../../../Store/selectors/editor-selectors";
import {getZoom} from "../../../../../Store/selectors/workspace-selectors";
import {editorAC} from "../../../../../Store/reducers/editor-reducer";
import {workspaceAC} from "../../../../../Store/reducers/workspace-reducer";
import throttle from "lodash/throttle";

//============ CUSTOM HOOK ====================
const useBannerCanvasBackground = () => {
    const classes = useStyles();
    const size = useSelector(getSize);
    const backgroundStyle = useSelector(getBackgroundStyle);
    const backgroundStyleColor = useSelector(getBackgroundStyleColor);
    const gradientStyle = useSelector(getGradientStyle);
    const colorStart = useSelector(getColorStart);
    const colorEnd = useSelector(getColorEnd);
    const currentImage = useSelector(getCurrentImage);
    const scaleMode = useSelector(getScaleMode);
    const align = useSelector(getAlign);
    const zoom = useSelector(getZoom);
    const showSecondSidebar = useSelector(getShowSecondSidebar)
    let canvasRef = useRef<HTMLCanvasElement | null>(null);
    let canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
    const dispatch = useDispatch();

    // корректировка  wrapperPosition при изменении размеров окна
    const resizeHandler = () => {
        if (canvasRef && canvasRef.current) {
            // @ts-ignore
            const wrapper: DOMRect = canvasRef.current.getBoundingClientRect();
            const x = wrapper.left;
            const y = wrapper.top;
            dispatch(workspaceAC.setWrapperPosition(x, y));
        }
    };
    const resizeHandlerThrottle = throttle(resizeHandler, 1000);
    useEffect(() => {
            window.addEventListener("resize", resizeHandlerThrottle, true);
            return () => {
                window.removeEventListener("resize", resizeHandlerThrottle, true)
            }
        }
    );

    // определение wrapperPosition
    useEffect(() => {
        if (canvasRef && canvasRef.current) {
            // @ts-ignore
            const wrapper: DOMRect = canvasRef.current.getBoundingClientRect();
            const x = wrapper.left;
            const y = wrapper.top;
            dispatch(workspaceAC.setWrapperPosition(x, y));
            //console.log(`x = ${x}`)
        }
    }, [canvasRef, zoom, showSecondSidebar]);

    useEffect(() => {
        if (canvasRef.current && size.width && size.height) {
            canvasCtxRef.current = canvasRef.current.getContext('2d');
            let ctx = canvasCtxRef.current;
            //========== COLOR ============
            if (backgroundStyle === 'color') {
                ctx!.fillStyle = backgroundStyleColor.color;
                ctx!.fillRect(0, 0, size.width, size.height);
                dispatch(editorAC.setCanvasUrl('background', canvasRef.current.toDataURL()))
            }
            //========== GRADIENT ==========
            if (backgroundStyle === 'gradient') {
                let gradient: CanvasGradient;
                if (gradientStyle === 'horizontal') {
                    gradient = ctx!.createLinearGradient(0, 0, size.width, 0);
                } else if (gradientStyle === 'vertical') {
                    gradient = ctx!.createLinearGradient(0, 0, 0, size.height);
                } else {
                    gradient = ctx!.createRadialGradient(
                        size.width / 2, size.height / 2, 0,
                        size.width / 2, size.height / 2, Math.sqrt((size.width * size.width) + (size.height * size.height)) / 2
                    )
                }
                ctx!.clearRect(0, 0, size.width, size.height);
                gradient.addColorStop(0, colorStart);
                gradient.addColorStop(1, colorEnd);
                ctx!.fillStyle = gradient;
                ctx!.fillRect(0, 0, size.width, size.height);
                dispatch(editorAC.setCanvasUrl('background', canvasRef.current.toDataURL()))
            }
            //============ IMAGE ===========
            if (backgroundStyle === 'image') {
                if (currentImage) {
                    const cw = size.width as number;
                    const ch = size.height as number;
                    dispatch(editorAC.setIsLoading(true));
                    const image = new Image();
                    image.onload = () => {
                        dispatch(editorAC.setIsLoading(false));
                        const iw = image.width;
                        const ih = image.height;

                        let cx, cy, ix, iy;
                        ctx!.clearRect(0, 0, cw, ch);
                        ctx!.fillStyle = '#FFF';
                        ctx!.fillRect(0, 0, cw, ch);
                        //================= NO SCALE ================
                        if (scaleMode === 'No scale') {
                            cx = 0;
                            cy = 0;
                            ix = 0;
                            iy = 0;
                            switch (align) {
                                case 'left-top': {
                                    ix = 0;
                                    iy = 0;
                                    break
                                }
                                case 'center-top': {
                                    ix = iw / 2 - cw / 2;
                                    iy = 0;
                                    break
                                }
                                case 'right-top': {
                                    ix = iw - cw;
                                    iy = 0;
                                    break
                                }
                                case 'left-center': {
                                    ix = 0;
                                    iy = ih / 2 - ch / 2;
                                    break
                                }
                                case 'center': {
                                    ix = iw / 2 - cw / 2;
                                    iy = ih / 2 - ch / 2;
                                    break
                                }
                                case 'right-center': {
                                    ix = iw - cw;
                                    iy = ih / 2 - ch / 2;
                                    break
                                }
                                case 'left-bottom': {
                                    ix = 0;
                                    iy = ih - ch;
                                    break
                                }
                                case 'center-bottom': {
                                    ix = iw / 2 - cw / 2;
                                    iy = ih - ch;
                                    break
                                }
                                case 'right-bottom': {
                                    ix = iw - cw;
                                    iy = ih - ch;
                                    break
                                }
                            }
                            ctx!.drawImage(image, ix, iy, cw, ch, cx, cy, cw, ch);
                            //================= EXACT FIT ================
                        } else if (scaleMode === 'Exact fit') {
                            ctx!.drawImage(image, 0, 0, iw, ih, 0, 0, cw, ch);
                            //================= MAINTAIN ASPECT ================
                        } else if (scaleMode === 'Maintain aspect') {
                            if (iw / ih > cw / ch) { // изображение длиннее канваса
                                const ch1 = cw * ih / iw;
                                switch (align) {
                                    case 'left-top':
                                    case 'center-top':
                                    case 'right-top': {
                                        cy = 0;
                                        break
                                    }
                                    case 'left-center':
                                    case 'center':
                                    case 'right-center': {
                                        cy = (ch - ch1) / 2;
                                        break
                                    }
                                    case 'left-bottom':
                                    case 'center-bottom':
                                    case 'right-bottom': {
                                        cy = ch - ch1;
                                        break
                                    }
                                }
                                ctx!.drawImage(image, 0, 0, iw, ih, 0, cy, cw, ch1);
                            } else if (iw / ih < cw / ch) {
                                const cw1 = iw * ch / ih;
                                switch (align) {
                                    case 'left-top':
                                    case 'left-center':
                                    case 'left-bottom': {
                                        cx = 0;
                                        break
                                    }
                                    case 'center-top':
                                    case 'center':
                                    case 'center-bottom': {
                                        cx = (cw - cw1) / 2;
                                        break
                                    }
                                    case 'right-top':
                                    case 'right-center':
                                    case 'right-bottom': {
                                        cx = cw - cw1;
                                        break
                                    }
                                    default:
                                        cx = 0;
                                }
                                ctx!.drawImage(image, 0, 0, iw, ih, cx, 0, cw1, ch);
                            } else { // iw / ih = cw / ch
                                ctx!.drawImage(image, 0, 0, iw, ih, 0, 0, cw, ch);
                            }
                        } else if (scaleMode === 'Scale crop') {
                            if (iw / ih > cw / ch) {
                                const iw1 = ih * cw / ch;
                                switch (align) {
                                    case 'left-top':
                                    case 'left-center':
                                    case 'left-bottom': {
                                        ix = 0;
                                        break
                                    }
                                    case 'center-top':
                                    case 'center':
                                    case 'center-bottom': {
                                        ix = (iw - iw1) / 2;
                                        break
                                    }
                                    case 'right-top':
                                    case 'right-center':
                                    case 'right-bottom': {
                                        ix = iw - iw1;
                                        break
                                    }
                                    default:
                                        ix = 0;
                                }
                                ctx!.drawImage(image, ix, 0, iw1, ih, 0, 0, cw, ch);
                            } else if (iw / ih < cw / ch) {
                                const ih1 = iw * ch / cw;
                                switch (align) {
                                    case 'left-top':
                                    case 'center-top':
                                    case 'right-top': {
                                        iy = 0;
                                        break
                                    }
                                    case 'left-center':
                                    case 'center':
                                    case 'right-center': {
                                        iy = (ih - ih1) / 2;
                                        break
                                    }
                                    case 'left-bottom':
                                    case 'center-bottom':
                                    case 'right-bottom': {
                                        iy = ih - ih1;
                                        break
                                    }
                                }
                                ctx!.drawImage(image, 0, iy, iw, ih1, 0, 0, cw, ch);
                            } else { //iw / ih = cw / ch
                                ctx!.drawImage(image, 0, 0, iw, ih, 0, 0, cw, ch);
                            }
                        }

                        // @ts-ignore
                        dispatch(editorAC.setCanvasUrl('background', canvasRef.current.toDataURL()))
                    };
                    image.src = currentImage.src;

                }
            }
            //dispatch(editorAC.setCanvasUrl('background', canvasRef.current.toDataURL()))
            //console.log(canvasRef.current.toDataURL())
        }
    }, [
        size, backgroundStyle, backgroundStyleColor,
        gradientStyle, colorStart, colorEnd, currentImage,
        scaleMode, align, dispatch
    ]);

    return {
        classes, size, canvasRef, zoom
    }
};

//============== COMPONENT =================
const BannerCanvasBackground: React.FC<{}> = (): ReactElement => {
    const {
        classes, size, canvasRef, zoom
    } = useBannerCanvasBackground();

    return (
        <>
            {
                size.width && size.height &&
                <canvas
                    className={classes.bannerCanvasBackground}
                    ref={canvasRef}
                    width={size.width}
                    height={size.height}
                    style={{
                        transform: `scale(${zoom / 100})`,
                        transformOrigin: 'left top'
                    }}
                />
            }
        </>
    )
};

const BannerCanvasBackgroundMemo = React.memo(BannerCanvasBackground);
export default BannerCanvasBackgroundMemo;

//======================== STYLES ========================
const useStyles = makeStyles({
    bannerCanvasBackground: {
        position: 'absolute',
        top: 0,
        left: 0
    }
});