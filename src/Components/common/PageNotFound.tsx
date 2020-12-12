import React, {ReactElement} from "react";
import {Typography} from "@material-ui/core";
import {useSelector} from "react-redux";
import {getLang} from "../../Store/selectors/app-selectors";
import {translate} from "../../Utils/lang";

//================= CUSTOM HOOK =========================
const usePageNotFound = () => {
    const lang = useSelector(getLang);
    const pageNotFoundLabel = translate(lang, 'Page not found')
    return {pageNotFoundLabel}
};

//======================= COMPONENT ===============================
const PageNotFound: React.FC<{}> = (): ReactElement => {
    const {pageNotFoundLabel} = usePageNotFound();

    return (
        <Typography align='center'
                    color='secondary'
                    variant='h6'>
            {pageNotFoundLabel}
        </Typography>
    )

};
export default PageNotFound;


