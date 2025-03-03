import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, Box, Rating } from '@mui/material';

const TourGuide = () => {
  const guides = [
    {
      name: 'Rahul Kumar',
      expertise: 'Taj Mahal & Mughal Architecture',
      experience: '10 years',
      rating: 4.8,
      image: 'https://source.unsplash.com/800x600/?portrait',
      languages: ['English', 'Hindi', 'Urdu']
    },
    {
      name: 'Priya Singh',
      expertise: 'Ancient Indian History',
      experience: '8 years',
      rating: 4.9,
      image: 'https://source.unsplash.com/800x600/?person',
      languages: ['English', 'Hindi', 'French']
    },
    {
      name: 'Mohammed Ali',
      expertise: 'Islamic Architecture & Art',
      experience: '12 years',
      rating: 4.7,
      image: 'https://source.unsplash.com/800x600/?man',
      languages: ['English', 'Hindi', 'Arabic']
    }
  ];

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Meet Our Tour Guides
      </Typography>
      <Typography variant="body1" paragraph>
        Expert guides to enhance your heritage exploration experience.
      </Typography>
      
      <Grid container spacing={3}>
        {guides.map((guide, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={guide.image}
                alt={guide.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {guide.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Expertise: {guide.expertise}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Experience: {guide.experience}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Rating value={guide.rating} precision={0.1} readOnly />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {guide.rating}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Languages: {guide.languages.join(', ')}
                </Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                  Book Guide
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TourGuide;
