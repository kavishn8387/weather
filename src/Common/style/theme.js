import { createMuiTheme } from "@material-ui/core";
import green from '@material-ui/core/colors/green'
import grey from '@material-ui/core/colors/grey'

const theme = createMuiTheme({
    palette: {
        primary: green,
        secondary: grey,
    },
    typography: { useNextVariants: true },
});

export default theme;