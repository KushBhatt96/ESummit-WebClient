import { AppBar, Switch, Toolbar, Typography } from "@mui/material";

interface Props {
  darkMode: boolean;
  handleThemeChanged: () => void;
}

function Header({ darkMode, handleThemeChanged }: Props) {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6">E-SUMMIT SHOPPING</Typography>
        <Switch checked={darkMode} onClick={handleThemeChanged} />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
