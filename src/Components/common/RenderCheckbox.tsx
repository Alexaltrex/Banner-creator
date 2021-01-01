import {FormControlLabel} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const RenderCheckbox: React.FC<PropsType> = (props) => {
    const {input, label, icon} = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {icon && <div className={classes.iconLeft}>
                {icon}
            </div>}
            <FormControlLabel
                control={
                    <Checkbox
                        checked={input.value ? true : false}
                        color="primary"
                        onChange={input.onChange}
                    />
                }
                label={label}
            />
        </div>
    )

}

export default RenderCheckbox

//======================== TYPES ============================
type PropsType = {
    icon?: React.ReactElement
    label: string
    input: any
}
//========================= STYLES =============================================================
const useStyles = makeStyles({
        root: {
            position: 'relative',
        },
        iconLeft: {
            position: 'absolute',
            left: -5,
            top: '50%',
            transform: 'translate(-100%, -50%)'
        }
    }
);