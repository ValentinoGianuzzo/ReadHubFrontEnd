import react from 'react';
import {TextField} from "@mui/material";
import './TextField.css';

interface TextFieldProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    labelColor?: string;
    variant?: 'filled' | 'outlined' | 'standard';
    type?: string
}


export const TextFieldComponent = (props: TextFieldProps) => {

    return (
        <div className={"textFieldDiv"}>
            <h3 className={"labelTextField"} style={{ color: props.labelColor || '#202124' }}>{props.label}</h3>

            <div className="googleTextField">
                <TextField
                    onChange={props.onChange}
                    variant="outlined"
                    fullWidth
                    type={props.type || 'text'}
                    InputProps={{
                        classes: {notchedOutline: 'notchedOutline'},
                    }}
                />
            </div>

        </div>
    );
};