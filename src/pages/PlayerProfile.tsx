import { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  LinearProgress,
  Chip,
  useTheme,
  Tabs,
  Tab,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import { getPlayerDetails } from "../services/api";
import { commonAnimationStyles } from "../utils/animations";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`player-tabpanel-${index}`}
      aria-labelledby={`player-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const PlayerProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [player, setPlayer] = useState<any>(null);
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    const fetchPlayerDetails = async () => {
      if (id) {
        try {
          const response = await getPlayerDetails(id);
          setPlayer(response.data);
        } catch (error) {
          console.error("Error fetching player details:", error);
        }
      }
    };

    fetchPlayerDetails();
  }, [id]);

  if (!player) {
    return (
      <Box sx={{ ...commonAnimationStyles.fadeIn, textAlign: "center", py: 4 }}>
        <Typography variant="h5">Loading player details...</Typography>
      </Box>
    );
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ ...commonAnimationStyles.fadeIn }}>
      <Box
        sx={{
          textAlign: "center",
          mb: 6,
          py: 6,
          borderRadius: 0,
          ...commonAnimationStyles.gradient,
          background:
            "linear-gradient(45deg, rgba(0,112,243,0.1), rgba(121,40,202,0.1))",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            mb: 2,
          }}
        >
          <Avatar
            src={player?.currentTeam?.crest || ""}
            alt={player?.name}
            sx={{
              width: 140,
              height: 140,
              border: "4px solid rgba(255, 255, 255, 0.1)",
              
              ...commonAnimationStyles.pulse,
            }}
          />
          <Box>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 800,
                p:1,
                ...commonAnimationStyles.gradient,
                mb: 1,
              }}
            >
              {player.name}
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              {player.currentTeam?.name} • {player.position}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        sx={{
          mb: 4,
          "& .MuiTab-root": {
            color: "text.secondary",
            "&.Mui-selected": {
              color: "primary.main",
            },
          },
          "& .MuiTabs-indicator": {
            background: "linear-gradient(45deg, #0070f3, #7928ca)",
          },
        }}
      >
        <Tab label="Overview" />
        <Tab label="Contract" />
        <Tab label="Team Info" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                ...commonAnimationStyles.scaleIn,
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    ...commonAnimationStyles.gradient,
                  }}
                >
                  <SportsSoccerIcon />
                  Basic Info
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ color: "black" }}>
                    <strong>Full Name:</strong> {player.name}
                  </Typography>
                  <Typography sx={{ color: "black" }}>
                    <strong>Date of Birth:</strong> {player.dateOfBirth}
                  </Typography>
                  <Typography sx={{ color: "black" }}>
                    <strong>Nationality:</strong> {player.nationality}
                  </Typography>
                  <Typography sx={{ color: "black" }}>
                    <strong>Position:</strong> {player.position}
                  </Typography>
                  <Typography sx={{ color: "black" }}>
                    <strong>Shirt Number:</strong> {player.shirtNumber}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
        </Grid>
      </TabPanel>

    <TabPanel value={tabValue} index={1}>
  <Grid container spacing={3}>
    <Grid item xs={12} md={6}>
      <Card
        sx={{
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          ...commonAnimationStyles.scaleIn,
          animationDelay: "0.1s",
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              ...commonAnimationStyles.gradient,
            }}
          >
            <EmojiEventsIcon />
            Contract Info
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ color: "black" }}>
              <strong>Start:</strong>{" "}
              {player.currentTeam?.contract?.start || "N/A"}
            </Typography>
            <Typography sx={{ color: "black" }}>
              <strong>Until:</strong>{" "}
              {player.currentTeam?.contract?.until || "N/A"}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
</TabPanel>

      <TabPanel value={tabValue} index={2}>
  <Grid container spacing={3}>
    <Grid item xs={12} md={6}>
      <Card
        sx={{
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          ...commonAnimationStyles.scaleIn,
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              ...commonAnimationStyles.gradient,
            }}
          >
            <AccessTimeIcon />
            Team Details
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ color: "black" }}>
              <strong>Team:</strong> {player.currentTeam?.name}
            </Typography>
            <Typography sx={{ color: "black" }}>
              <strong>Country:</strong>{" "}
              {player.currentTeam?.area?.name || "Unknown"}
            </Typography>
            <Typography sx={{ color: "black" }}>
              <strong>Venue:</strong> {player.currentTeam?.venue || "N/A"}
            </Typography >
            <Typography sx={{ color: "black" }}>
              <strong>Website:</strong>{" "}
              <a
                href={player.currentTeam?.website}
                target="_blank"
                rel="noreferrer"
              >
                {player.currentTeam?.website}
              </a>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
</TabPanel>
    </Box>
  );
};

export default PlayerProfile;
