import React, {ReactElement} from "react";
import {useSelector} from "react-redux";
import {getTexts} from "../../../../../Store/selectors/text-selectors";
import BannerCSSTextNative from "./BannerCSSTextNative";

//============ CUSTOM HOOK ====================
const useBannerTexts = () => {
    const texts = useSelector(getTexts);
    const textElements = texts.map(
        el => <BannerCSSTextNative key={el.id} text={el}/>
    );
    return {
        textElements
    }
};

//============== COMPONENT =================
const BannerCSSTexts: React.FC<{}> = (): ReactElement => {
    const {
        textElements
    } = useBannerTexts();
    return (
        <>
            {textElements}
        </>
    )
};
export default BannerCSSTexts;