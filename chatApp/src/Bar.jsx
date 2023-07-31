import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "./theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import "./NavBar.css"
import { FaBars } from "react-icons/fa";

const Bar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <div className="NavBar"> 
    <Box display="flex"  p={2} >
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="12px"
        
      >
      
      </Box>
      <FaBars className="bars"/>
      {/* ICONS */}
      <div className="itens-nav"> 
      <Box display="flex" alignContent={"flex-end"} marginLeft={45} >
        <IconButton onClick={colorMode.toggleColorMode } >
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon sx={{fontSize:15}} />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon  sx={{fontSize:15}} />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon  sx={{fontSize:15}}/>
        </IconButton>
      </Box>
      </div>
    </Box>
    
    </div>
  );
};

export default Bar;