import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  useTheme,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  ListItemAvatar,
  Avatar,
  Paper,
} from "@mui/material";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { keyframes } from "@mui/system";

// ✅ Моковані гравці з лише id та name
const mockPlayers: { id: number; name: string }[] = [
  { id: 3218, name: "Lionel Messi" },
  { id: 2, name: "PUk" },
  { id: 3, name: "Luka Modrić" },
];

// ✅ Анімації
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const glowAnimation = keyframes`
  0% { box-shadow: 0 0 5px rgba(0, 112, 243, 0.2); }
  50% { box-shadow: 0 0 20px rgba(0, 112, 243, 0.4); }
  100% { box-shadow: 0 0 5px rgba(0, 112, 243, 0.2); }
`;

const Navbar = () => {
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof mockPlayers>([]);
  const [searchAnchor, setSearchAnchor] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/teams", label: "Teams" },
    { path: "/matches", label: "Matches" },
    { path: "/statistics", label: "Statistics" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.length >= 2) {
      const filtered = mockPlayers.filter((player) =>
        player.name.toLowerCase().includes(query)
      );
      setSearchResults(filtered);
      setSearchAnchor(event.currentTarget);
    } else {
      setSearchResults([]);
      setSearchAnchor(null);
    }
  };

  const handleSearchClose = () => {
    setSearchAnchor(null);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handlePlayerSelect = (playerId: number) => {
    navigate(`/player/${playerId}`);
    handleSearchClose();
  };

  const drawer = (
    <Box
      sx={{
        background: "linear-gradient(45deg, rgba(0,0,0,0.9), rgba(0,112,243,0.1), rgba(121,40,202,0.1))",
        backgroundSize: "200% 200%",
        animation: `${gradientAnimation} 15s ease infinite`,
        backdropFilter: "blur(20px)",
        height: "100%",
        pt: 2,
      }}
    >
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.path}
            component={RouterLink}
            to={item.path}
            onClick={handleDrawerToggle}
            sx={{
              color: isActive(item.path) ? theme.palette.primary.main : "#000",
              "&:hover": {
                background: "rgba(255, 255, 255, 0.08)",
                transform: "translateX(5px)",
                transition: "transform 0.2s ease-in-out",
              },
            }}
          >
            <ListItemText
              primary={item.label}
              sx={{
                "& .MuiTypography-root": {
                  fontWeight: isActive(item.path) ? 600 : 400,
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "#ffffff",
        backgroundSize: "200% 200%",
        animation: `${gradientAnimation} 15s ease infinite, ${glowAnimation} 3s ease-in-out infinite`,
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ px: { xs: 0 } }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mr: 4,
              animation: `${floatAnimation} 3s ease-in-out infinite`,
            }}
          >
            <SportsSoccerIcon
              sx={{
                color: theme.palette.primary.main,
                fontSize: "2rem",
                animation: `${pulseAnimation} 2s ease-in-out infinite`,
                background: "linear-gradient(45deg, #0070f3, #7928ca)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            />
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                textDecoration: "none",
                color: "inherit",
                fontWeight: 700,
                background: "linear-gradient(45deg, #0070f3, #7928ca, #0070f3)",
                backgroundSize: "200% 200%",
                animation: `${gradientAnimation} 15s ease infinite`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "1.1rem", sm: "1.25rem" },
              }}
            >
              Football Stats
            </Typography>
          </Box>

          {isMobile ? (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleMobileMenuOpen}
              sx={{ ml: "auto" }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ flexGrow: 1, display: "flex", gap: 2 }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  component={RouterLink}
                  to={item.path}
                  sx={{
                    position: "relative",
                    color: isActive(item.path) ? theme.palette.primary.main : "#000",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      transform: isActive(item.path)
                        ? "translateX(-50%)"
                        : "translateX(-50%) scaleX(0)",
                      width: "100%",
                      height: "2px",
                      background: "linear-gradient(45deg, #0070f3, #7928ca)",
                      backgroundSize: "200% 200%",
                      animation: isActive(item.path) ? `${gradientAnimation} 15s ease infinite` : "none",
                      transition: "transform 0.2s ease-in-out",
                    },
                    "&:hover": {
                      transform: "translateY(-2px)",
                    },
                    "&:hover::after": {
                      transform: "translateX(-50%) scaleX(1)",
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          <Box sx={{ ml: "auto", width: 300, position: "relative" }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search players..."
              value={searchQuery}
              onChange={handleSearch}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "#000",
                  background: "rgba(65, 60, 60, 0.05)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: 2,
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "text.secondary" }} />
                  </InputAdornment>
                ),
              }}
            />

            {searchResults.length > 0 && (
              <Paper
                sx={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  mt: 1,
                  background: "white",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: 2,
                  zIndex: 1000,
                  maxHeight: 400,
                  overflow: "auto",
                }}
              >
                <List>
                  {searchResults.map((player) => (
                    <ListItem
                      key={player.id}
                      onClick={() => handlePlayerSelect(player.id)}
                      sx={{ cursor: "pointer","&:hover": {
      transform: "translateY(-2px)",
      backgroundColor: "rgba(0,0,0,0.05)",
    } }}
                    >
                      <ListItemAvatar>
                        <Avatar>{player.name[0]}</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={player.name}
                        primaryTypographyProps={{ sx: { color: "black" } }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            )}
          </Box>
        </Toolbar>
      </Container>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: 240,
            background: "linear-gradient(45deg, rgba(0,0,0,0.9), rgba(0,112,243,0.1), rgba(121,40,202,0.1))",
            backgroundSize: "200% 200%",
            animation: `${gradientAnimation} 15s ease infinite`,
            backdropFilter: "blur(20px)",
          },
        }}
      >
        {drawer}
      </Drawer>

      <Menu
        anchorEl={mobileMenuAnchor}
        open={Boolean(mobileMenuAnchor)}
        onClose={handleMobileMenuClose}
        sx={{
          "& .MuiPaper-root": {
            background: "rgba(0, 0, 0, 0.9)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: 2,
          },
        }}
      >
        {navItems.map((item) => (
          <MenuItem
            key={item.path}
            component={RouterLink}
            to={item.path}
            onClick={handleMobileMenuClose}
            sx={{
              color: "text.primary",
              "&:hover": {
                background: "rgba(255, 255, 255, 0.05)",
              },
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </AppBar>
  );
};

export default Navbar;
