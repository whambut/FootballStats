import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Teams from "./pages/Teams";
import Matches from "./pages/Matches";
import Statistics from "./pages/Statistics";
import PlayerProfile from "./pages/PlayerProfile";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0070f3", // можна залишити той самий або зробити світліший
    },
    secondary: {
      main: "#7928ca",
    },
    background: {
      default: "#ffffff", // світлий фон
      paper: "#f5f5f5",    // фон для карток, модалок тощо
    },
    text: {
      primary: "#e0f7fa",  // чорний текст
      secondary: "#555555", // сірий для менш вираженого тексту
    },

  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "3.5rem",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2.5rem",
    },
    h3: {
      fontWeight: 600,
      fontSize: "2rem",
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: "8px 16px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box
          sx={{
    minHeight: "100vh",
    bgcolor: "background.default",
  }}

        >
          <Navbar />
          <Box
            component="main"
            sx={{
              maxWidth: "1200px",
              mx: "auto",
              px: { xs: 2, sm: 3, md: 4 },
              py: { xs: 3, sm: 4, md: 5 },
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/matches" element={<Matches />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/player/:id" element={<PlayerProfile />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
