import { InputAdornment, IconButton, TextField } from '@material-ui/core';
import React, { Component } from 'react';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

class PasswordInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
            password: ''
        };
    }

    handleClickShowPassword = () => {
        this.setState((prevState) => ({
            showPassword: !prevState.showPassword,
        }));
    };

    handleChangePassword = (event) => {
        const password = event.target.value;
        if (password.split(' ').length > 1) {
            return false;
        }
        this.setState({ password }, () => {
            this.props.handleChangePassword(password);
        });
        return true;
    }

    render() {
        const { style, label, error, onKeyUp } = this.props;
        const { showPassword, password } = this.state;

        return (
            <TextField
                {...error}
                fullWidth
                className={style}
                label={label}
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                value={password}
                onChange={this.handleChangePassword}
                onKeyUp={onKeyUp}
                placeholder="****************"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                id="one"
                                aria-label="Toggle password visibilty"
                                onClick={this.handleClickShowPassword}
                            >
                                {showPassword ? (
                                    <Visibility />
                                ) : (
                                    <VisibilityOff />
                                )}
                            </IconButton>
                        </InputAdornment>
                    ),
                    inputProps: {
                        pattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
                    }
                }}
            />
        );
    }
}

export default PasswordInput;
