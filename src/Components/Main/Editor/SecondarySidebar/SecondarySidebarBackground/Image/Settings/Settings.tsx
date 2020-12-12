import React from "react";
import SettingsAlign from "./SettingsAlign";
import SettingsScaleMode from "./SettingsScaleMode";
import {useSelector} from "react-redux";
import {getScaleMode} from "../../../../../../../Store/selectors/editor-selectors";

//============ CUSTOM HOOK ====================
const useImageSettings = () => {
    const scaleMode = useSelector(getScaleMode);
    return {
        scaleMode
    }
};

//================= COMPONENT ========================
const Settings: React.FC<{}> = () => {
    const {
        scaleMode
    } = useImageSettings();

    return (
        <div>
            <SettingsScaleMode/>
            {
                scaleMode !== 'Exact fit' &&
                <SettingsAlign/>
            }
        </div>
    )
};
export default Settings;