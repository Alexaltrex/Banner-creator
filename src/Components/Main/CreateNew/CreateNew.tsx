import React, {ReactElement} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CreateNewItem from "./CreateNewItem";
import CreateNewCustom from "./CreateNewCustom";

//================= CUSTOM HOOK =========================
const useCreateNew = () => {
    const classes = useStyles();
    return {
        classes,
    }
};

//======================= COMPONENT ===============================
const CreateNew: React.FC<{}> = (): ReactElement => {
    const {classes} = useCreateNew();

    const sizes = [
        {
            label: 'Large Rectangle',
            width: 336,
            height: 280
        },
        {
            label: 'Medium Rectangle',
            width: 300,
            height: 250
        },
        {
            label: 'Leaderboard',
            width: 728,
            height: 90
        },
        {
            label: 'Large Mobile',
            width: 320,
            height: 100
        },
        {
            label: 'Main Banner',
            width: 468,
            height: 60
        },
        {
            label: 'Half Page',
            width: 300,
            height: 600
        },
        {
            label: 'Square',
            width: 250,
            height: 250
        },
        {
            label: 'Half Banner',
            width: 234,
            height: 60
        },
        {
            label: 'Vertical Banner',
            width: 120,
            height: 240
        },
        {
            label: 'Small Rectangle',
            width: 180,
            height: 150
        },
        {
            label: 'Mobile Banner',
            width: 300,
            height: 50
        },
    ];
    const CreateNewElements = sizes.map(
        (el, index) => <CreateNewItem key={index}
                                      sizeLabel={el.label}
                                      width={el.width}
                                      height={el.height}
        />
    );

    return (
        <div className={classes.createNew}>
            <div className={classes.wrapper}>
                <CreateNewCustom/>
                {CreateNewElements}
            </div>
        </div>
    )
};

export default CreateNew

//================= STYLES ================
const useStyles = makeStyles({
    createNew: {
        maxWidth: 1000,
        width: '100%',
        margin: '0 auto',
        height: 'calc(100vh - 64px)',
        padding: 10
    },
    wrapper: {
        maxHeight: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    }
});