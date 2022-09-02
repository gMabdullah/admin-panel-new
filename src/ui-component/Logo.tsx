// material-ui
// import { useTheme } from '@mui/material/styles';

import tossdownLogo from 'assets/images/tossdownLogo.png';

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
    // const theme = useTheme();

    return (
        
        //  if you want to use image instead of svg uncomment following, and comment out <svg> element.
        
        // <img src={theme.palette.mode === 'dark' ? logoDark : logo} alt="tossdown" width="100" />
        <img src={tossdownLogo} alt="tossdown" width="120" />
    );
};

export default Logo;
