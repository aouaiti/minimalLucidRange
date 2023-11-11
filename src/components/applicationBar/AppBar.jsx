import { useState, memo } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { styled, alpha } from "@mui/material/styles";
import Clouds from "./Clouds";
import Stars from "./Stars";
import Sun from "./Sun";
import Moon from "./Moon";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { toggleQuality } from "../../Features/globalUiVars/quality";
import AppShortcutIcon from "@mui/icons-material/AppShortcut";
import { useDispatch } from "react-redux";

const AppBarE = styled(AppBar)(({ theme }) => ({
  background: `${
    theme.palette.mode === "light"
      ? alpha("#2979ff", 0.6)
      : alpha(theme.palette.primary.dark, 0.3)
  }`,
}));

const pages = ["Configurator", "Gallery", "Terms"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const ResponsiveAppBar = () => {
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const quality = useSelector((state) => state.changeQuality.quality);

  return (
    <AppBarE
      position="fixed"
      sx={{
        backdropFilter: "blur(0px)",
        transition: "0.5s",
        overflow: "hidden",
        // zIndex: 999,
      }}
    >
      <Sun />
      <Moon />
      {quality === "high" && (
        <>
          <Clouds />
          <Stars />
        </>
      )}
      <Container
        maxWidth="xl"
        // sx={{ backdropFilter: "blur(1px)" }}
      >
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <img
            className="logo"
            src="/WP.png"
            alt="brand"
            style={{
              width: "30px",
              height: "30px",
              marginRight: "20px",
            }}
          />
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <Link key={page} to={`${page === "Configurator" ? "/" : page}`}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "none", md: "none" }, mr: 1 }} />

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "none", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link key={page} to={`${page === "Configurator" ? "/" : page}`}>
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              </Link>
            ))}
          </Box>
          <Outlet />

          <Box sx={{ flexGrow: 0 }}>
            <IconButton
              sx={{
                position: "fixed",
                zIndex: "999999",
                right: "1%",
                bottom: { xs: "3%", md: "4.5%" },
              }}
              aria-label="quality"
              onClick={(e) => dispatch(toggleQuality())}
            >
              <AppShortcutIcon
                sx={{ fontSize: { xs: "2rem", md: "2.5rem" } }}
              />
            </IconButton>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBarE>
  );
};
export default memo(ResponsiveAppBar);
