import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Paper, Box } from '@mui/material';

const HeritageSite = () => {
  const { siteId } = useParams();
  const [lastUpdateTime, setLastUpdateTime] = useState(Date.now());

  const sites = {
    'taj-mahal': {
      title: 'Taj Mahal',
      description: 'An ivory-white marble mausoleum on the right bank of the river Yamuna in Agra, India.',
      image: 'https://source.unsplash.com/800x400/?taj,mahal'
    },
    'ellora-caves': {
      title: 'Ellora Caves',
      description: 'A UNESCO World Heritage Site located in Maharashtra, India, featuring Buddhist, Hindu and Jain monuments.',
      image: 'https://source.unsplash.com/800x400/?ellora,caves'
    },
    'hampi': {
      title: 'Hampi',
      description: 'Ancient village in Karnataka, India featuring numerous ruined temple complexes from the Vijayanagara Empire.',
      image: 'https://source.unsplash.com/800x400/?hampi'
    },
    'red-fort': {
      title: 'Red Fort',
      description: 'Historic fort complex in Delhi, India that served as the main residence of Mughal Emperors.',
      image: 'https://source.unsplash.com/800x400/?red,fort,delhi'
    },
    'qutub-minar': {
      title: 'Qutub Minar',
      description: 'UNESCO World Heritage Site in Delhi, India featuring a 73-meter tall minaret built in 1192.',
      image: 'https://source.unsplash.com/800x400/?qutub,minar'
    }
  };

  useEffect(() => {
    const updateProgress = () => {
      const currentTime = Date.now();
      const timeSpent = Math.floor((currentTime - lastUpdateTime) / 1000);
      
      if (timeSpent >= 10) { // Update every 10 seconds
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const progress = JSON.parse(localStorage.getItem('siteProgress') || '{}');
        
        const siteProgress = progress[siteId] || 0;
        progress[siteId] = siteProgress + timeSpent;
        
        localStorage.setItem('siteProgress', JSON.stringify(progress));
        setLastUpdateTime(currentTime);
      }
    };

    const timer = setInterval(updateProgress, 1000);
    return () => clearInterval(timer);
  }, [siteId, lastUpdateTime]);

  const site = sites[siteId] || sites['taj-mahal'];

  return (
    <Container sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {site.title}
        </Typography>
        
        <Box 
          component="img"
          src={site.image}
          alt={site.title}
          sx={{
            width: '100%',
            height: 'auto',
            borderRadius: 1,
            mb: 2
          }}
        />

        <Typography variant="body1" paragraph>
          {site.description}
        </Typography>
      </Paper>
    </Container>
  );
};

export default HeritageSite;
