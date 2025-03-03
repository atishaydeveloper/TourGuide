import React from 'react';
import { 
  Container, 
  Typography, 
  Paper, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  LinearProgress,
  Divider 
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const progress = JSON.parse(localStorage.getItem('siteProgress') || '{}');

  const badges = [
    { name: 'Welcome Explorer', requirement: 0, icon: '🎉' },
    { name: 'Curious Being', requirement: 300, icon: '🔍' }, // 5 minutes
    { name: 'Heritage Explorer', requirement: 900, icon: '🏛️' }, // 15 minutes
    { name: 'History Buff', requirement: 1800, icon: '📚' }, // 30 minutes
    { name: 'Cultural Expert', requirement: 2700, icon: '👑' } // 45 minutes
  ];

  const sites = {
    'taj-mahal': 'Taj Mahal',
    'ellora-caves': 'Ellora Caves',
    'hampi': 'Hampi',
    'red-fort': 'Red Fort',
    'qutub-minar': 'Qutub Minar'
  };

  const getTotalTime = () => {
    return Object.values(progress).reduce((sum, time) => sum + time, 0);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getEarnedBadges = () => {
    const totalTime = getTotalTime();
    return badges.filter(badge => totalTime >= badge.requirement);
  };

  const getNextBadge = () => {
    const totalTime = getTotalTime();
    return badges.find(badge => badge.requirement > totalTime);
  };

  const earnedBadges = getEarnedBadges();
  const nextBadge = getNextBadge();

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Profile Overview */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              Welcome, {user.username}!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Total Exploration Time: {formatTime(getTotalTime())}
            </Typography>
          </Paper>
        </Grid>

        {/* Site Progress */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Site Progress
            </Typography>
            <Box sx={{ mt: 2 }}>
              {Object.entries(sites).map(([id, name]) => (
                <Box key={id} sx={{ mb: 2 }}>
                  <Typography variant="body1" gutterBottom>
                    {name}: {formatTime(progress[id] || 0)}
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={Math.min(((progress[id] || 0) / 3600) * 100, 100)} 
                    sx={{ height: 8, borderRadius: 1 }}
                  />
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Badges */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EmojiEventsIcon /> Badges
            </Typography>
            
            {/* Earned Badges */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Earned Badges
              </Typography>
              <Grid container spacing={1}>
                {earnedBadges.map((badge) => (
                  <Grid item xs={12} key={badge.name}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {badge.icon} {badge.name}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Next Badge */}
            {nextBadge && (
              <>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" gutterBottom>
                  Next Badge
                </Typography>
                <Card variant="outlined" sx={{ bgcolor: 'action.hover' }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {nextBadge.icon} {nextBadge.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Required time: {formatTime(nextBadge.requirement)}
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={(getTotalTime() / nextBadge.requirement) * 100}
                      sx={{ mt: 1 }}
                    />
                  </CardContent>
                </Card>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
