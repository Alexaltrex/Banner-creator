import {OutlinedInputProps, TextField} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const RenderTextField: React.FC<PropsType> = (props) => {
    const {icon, label, input, meta: {touched, invalid, error}, classes, ...custom} = props;
    const styles = useStyles();

    return (
        <div className={styles.root}>
            {icon &&
            <div className={styles.iconLeft}>
                {icon}
            </div>}
            <TextField
                InputProps={classes ? {classes} as Partial<OutlinedInputProps> : null}
                variant="outlined"
                label={label}
                placeholder={label}
                error={touched && invalid}
                helperText={touched && error}
                {...input}
                {...custom}/>
        </div>
    );
}

export default RenderTextField;

//======================= TYPES =====================
type PropsType = {
    icon: React.ReactElement
    label: string
    input: any
    meta: {
        touched: boolean
        invalid: boolean
        error: string
    }
    classes?: any
}
//========================= STYLES ===================
const useStyles = makeStyles({
        root: {
            position: 'relative',
            width: '100%',
            '& .MuiFormLabel-root': {
                backgroundColor: 'white',
            }
        },
        label: {
            backgroundColor: 'white'
        },
        iconLeft: {
            position: 'absolute',
            left: -5,
            top: '50%',
            transform: 'translate(-100%, -50%)'
        }
    }
);


