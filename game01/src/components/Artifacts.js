import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';

const Artifacts = () => {
  const artifacts = [
    {
      name: 'Traditional Pottery',
      description: 'Hand-crafted pottery using ancient techniques',
      image: 'https://source.unsplash.com/800x600/?pottery',
      price: '$50'
    },
    {
      name: 'Handwoven Textiles',
      description: 'Beautiful textiles made by local artisans',
      image: 'https://source.unsplash.com/800x600/?textile',
      price: '$75'
    },
    {
      name: 'Marble Inlay Work',
      description: 'Intricate marble work inspired by Taj Mahal',
      image: 'https://source.unsplash.com/800x600/?marble',
      price: '$150'
    }
  ];

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Artifacts & Handicrafts
      </Typography>
      <Typography variant="body1" paragraph>
        Discover unique artifacts and handicrafts from local artisans.
      </Typography>
      
      <Grid container spacing={3}>
        {artifacts.map((artifact, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={artifact.image}
                alt={artifact.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {artifact.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {artifact.description}
                </Typography>
                <Typography variant="h6" color="primary">
                  {artifact.price}
                </Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                  Purchase
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Artifacts;
