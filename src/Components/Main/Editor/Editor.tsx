import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    getBackgroundStyle, getBackgroundStyleColor, getBorderColor, getColorEnd, getColorStart, getGradientStyle,
    getMainSidebarItem,
    getSecondarySidebarBackgroundTabIndex,
    getShowSecondSidebar, getSize, getUseBorder
} from "../../../Store/selectors/editor-selectors";
import {makeStyles} from "@material-ui/core";
import brown from "@material-ui/core/colors/brown";
import MainSidebar from "./MainSidebar/MainSidebar";
import {mainSidebarWidth, secondSidebarWidth} from "../../../Utils/CONST";
import SecondarySidebar from "./SecondarySidebar/SecondarySidebar";
import clsx from "clsx";
import Toolbar from "./Toolbar/Toolbar";
import Workspace from "./Workspace/Workspace";
import grey from "@material-ui/core/colors/grey";
import Alarm from "../../common/Alarm";
import {useQueryParam, NumberParam, BooleanParam, StringParam} from 'use-query-params';
import {editorAC} from "../../../Store/reducers/editor-reducer";
import {BackgroundStyleColorType, BackgroundStyleType, GradientStyleType, LangType} from "../../../Types/types";
import {getIsCreated, getLang} from "../../../Store/selectors/app-selectors";
import {appAC} from "../../../Store/reducers/app-reducer";

//============ CUSTOM HOOK ====================
const useEditor = () => {
    const classes = useStyles();
    const size = useSelector(getSize);
    const dispatch = useDispatch();
    const mainSidebarItem = useSelector(getMainSidebarItem);
    const showSecondSidebar = useSelector(getShowSecondSidebar);
    const backgroundTabIndex = useSelector(getSecondarySidebarBackgroundTabIndex);
    const backgroundStyle = useSelector(getBackgroundStyle);
    const isCreated = useSelector(getIsCreated);
    const lang = useSelector(getLang);
    const useBorder = useSelector(getUseBorder);
    const borderColor = useSelector(getBorderColor);
    const backgroundStyleColor = useSelector(getBackgroundStyleColor);
    const gradientStyle = useSelector(getGradientStyle);
    const colorStart = useSelector(getColorStart);
    const colorEnd = useSelector(getColorEnd);

    const [widthQuery, setWidthQuery] = useQueryParam('width', NumberParam);
    const [heightQuery, setHeightQuery] = useQueryParam('height', NumberParam);
    const [mainSidebarItemQuery, setMainSidebarItemQuery] = useQueryParam('mainSidebar', NumberParam);
    const [showSecondSidebarQuery, setShowSecondSidebarQuery] = useQueryParam('showSecondSidebar', BooleanParam);
    const [backgroundTabIndexQuery, setBackgroundTabIndexQuery] = useQueryParam('backTab', NumberParam);
    const [backgroundStyleQuery, setBackgroundStyleQuery] = useQueryParam('backStyle', StringParam);
    const [isCreatedQuery, setIsCreatedQuery] = useQueryParam('isCreated', BooleanParam);
    const [langQuery, setLangQuery] = useQueryParam('lang', StringParam);
    const [useBorderQuery, setUseBorderQuery] = useQueryParam('border', BooleanParam);
    const [borderColorQuery, setBorderColorQuery] = useQueryParam('borderColor', StringParam);
    const [backgroundStyleColorQuery, setBackgroundStyleColorQuery] = useQueryParam('backColor', StringParam);
    const [gradientStyleQuery, setGradientStyleQuery] = useQueryParam('gradient', StringParam);
    const [colorStartQuery, setColorStartQuery] = useQueryParam('colorStart', StringParam);
    const [colorEndQuery, setColorEndQuery] = useQueryParam('colorEnd', StringParam);

    // URL => STATE
    useEffect(() => {
        dispatch(editorAC.setSize(
            (widthQuery && heightQuery)
                ? {
                    width: widthQuery as number,
                    height: heightQuery as number
                }
                : size
        ));
        dispatch(editorAC.setMainSidebarItem(mainSidebarItemQuery ? mainSidebarItemQuery : mainSidebarItem));
        dispatch(editorAC.setShowSecondSidebar(showSecondSidebarQuery !== undefined ? showSecondSidebarQuery as boolean : showSecondSidebar));
        dispatch(editorAC.setSecondarySidebarBackgroundTabIndex(backgroundTabIndexQuery ? backgroundTabIndexQuery : backgroundTabIndex));
        dispatch(editorAC.setBackgroundStyle(backgroundStyleQuery ? backgroundStyleQuery as BackgroundStyleType : backgroundStyle));
        dispatch(appAC.setIsCreated(isCreatedQuery ? isCreatedQuery : isCreated));
        dispatch(appAC.setLang(langQuery ? langQuery as LangType : lang));
        dispatch(editorAC.setUseBorder(useBorderQuery ? useBorderQuery : useBorder));
        dispatch(editorAC.setBorderColor(borderColorQuery ? borderColorQuery : borderColor));
        dispatch(editorAC.setBackgroundStyleColor(backgroundStyleColorQuery ? {color: backgroundStyleColorQuery} : backgroundStyleColor));
        dispatch(editorAC.setGradientStyle(gradientStyleQuery ? gradientStyleQuery as GradientStyleType : gradientStyle));
        dispatch(editorAC.setColorStart(colorStartQuery ? colorStartQuery : colorStart));
        dispatch(editorAC.setColorEnd(colorEndQuery ? colorEndQuery : colorEnd));
    }, [dispatch]);

    // STATE => URL
    useEffect(() => {
        setWidthQuery(size.width);
        setHeightQuery(size.height);
        setMainSidebarItemQuery(mainSidebarItem !== 0 ? mainSidebarItem : undefined);
        setShowSecondSidebarQuery(showSecondSidebar ? undefined : false);
        setBackgroundTabIndexQuery(backgroundTabIndex !== 0 ? backgroundTabIndex : undefined);
        setBackgroundStyleQuery(backgroundStyle !== 'color' ? backgroundStyle : undefined);
        setIsCreatedQuery(isCreated ? true : undefined);
        setLangQuery(lang === 'rus' ? 'rus' : undefined);
        setUseBorderQuery(useBorder ? true : undefined);
        setBorderColorQuery(borderColor !== '#000' ? borderColor : undefined);
        setBackgroundStyleColorQuery(backgroundStyleColor.color !== '#000' ? backgroundStyleColor.color : undefined);
        setGradientStyleQuery(gradientStyle !== 'horizontal' ? gradientStyle : undefined);
        if (backgroundStyle !== 'gradient') {
            setGradientStyleQuery(undefined);
        }
        setColorStartQuery(colorStart !== '#000' ? colorStart : undefined);
        setColorEndQuery(colorEnd !== '#FFF' ? colorEnd : undefined);

    }, [
        size,
        mainSidebarItem,
        showSecondSidebar,
        backgroundTabIndex,
        backgroundStyle,
        isCreated,
        lang,
        useBorder,
        borderColor,
        backgroundStyleColor,
        gradientStyle,
        colorStart,
        colorEnd
    ]);

    return {classes, showSecondSidebar}
};

//============== COMPONENT =================
const Editor: React.FC<{}> = () => {
    const {
        classes, showSecondSidebar
    } = useEditor();
    return (
        <div className={classes.editor}>
            <div className={classes.mainSidebar}>
                <MainSidebar/>
            </div>
            <div className={clsx(classes.secondSidebarWrapper, !showSecondSidebar && classes.secondSidebarWrapperHide)}>
                <div className={classes.secondSidebar}>
                    <SecondarySidebar/>
                </div>
            </div>
            <div className={classes.workspace}>
                <Toolbar/>
                <Workspace/>
            </div>
            <Alarm/>
        </div>
    )
};
export default Editor;

//================================ STYLES =======================================
const useStyles = makeStyles({
    editor: {
        display: 'flex',
        height: 'calc(100vh - 64px)',
        width: '100vw'
    },
    mainSidebar: {
        width: mainSidebarWidth,
        flexShrink: 0,
        backgroundColor: brown[800],
        height: 'calc(100vh - 64px)',
    },
    secondSidebarWrapper: {
        width: secondSidebarWidth,
        flexShrink: 0,
        backgroundColor: brown[600],
        position: 'relative',
        transition: 'width .3s',
        overflow: 'hidden',
        height: 'calc(100vh - 64px)',
    },
    secondSidebarWrapperHide: {
        width: 0,
    },
    secondSidebar: {
        position: 'absolute',
        width: secondSidebarWidth,
        right: 0,
        height: 'calc(100vh - 64px)',
    },
    workspace: {
        flexGrow: 1,
        width: `calc(100vw - ${mainSidebarWidth}px - ${secondSidebarWidth}px)`,
        height: 'calc(100vh - 64px)',
        backgroundColor: grey[200],
        display: 'flex',
        flexDirection: 'column'
    }
});
