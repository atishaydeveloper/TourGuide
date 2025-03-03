import React from 'react';
import { Container, Typography, Grid, Paper, Box } from '@mui/material';
import ExploreIcon from '@mui/icons-material/Explore';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import GroupsIcon from '@mui/icons-material/Groups';

const About = () => {
  const features = [
    {
      icon: <ExploreIcon sx={{ fontSize: 40 }} />,
      title: 'Interactive Exploration',
      description: 'Discover heritage sites through immersive digital experiences'
    },
    {
      icon: <HistoryEduIcon sx={{ fontSize: 40 }} />,
      title: 'Educational Journey',
      description: 'Learn about history and culture from expert guides'
    },
    {
      icon: <LocalActivityIcon sx={{ fontSize: 40 }} />,
      title: 'Achievement System',
      description: 'Earn badges and track your exploration progress'
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 40 }} />,
      title: 'Community',
      description: 'Connect with fellow heritage enthusiasts'
    }
  ];

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        About Heritage Explorer
      </Typography>
      
      <Typography variant="body1" paragraph align="center" sx={{ mb: 4 }}>
        Heritage Explorer is your digital companion for discovering and experiencing India's rich cultural heritage.
        Our platform combines technology with tradition to create an immersive and educational journey through history.
      </Typography>

      <Grid container spacing={3}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={3} key={index}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3, 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}
            >
              <Box sx={{ color: 'primary.main', mb: 2 }}>
                {feature.icon}
              </Box>
              <Typography variant="h6" gutterBottom>
                {feature.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {feature.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom align="center">
          Our Mission
        </Typography>
        <Typography variant="body1" paragraph align="center">
          We are dedicated to preserving and promoting India's cultural heritage through digital innovation.
          By making heritage exploration interactive and engaging, we aim to connect people with history in meaningful ways.
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
