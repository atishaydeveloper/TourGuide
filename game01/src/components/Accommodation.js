import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';

const Accommodation = () => {
  const accommodations = [
    {
      name: 'Luxury Hotel near Taj Mahal',
      description: 'Experience luxury living with a view of the Taj Mahal',
      image: 'https://source.unsplash.com/800x600/?hotel',
      price: '$200/night'
    },
    {
      name: 'Heritage Haveli',
      description: 'Stay in a traditional Indian mansion with modern amenities',
      image: 'https://source.unsplash.com/800x600/?mansion',
      price: '$150/night'
    },
    {
      name: 'Boutique Guesthouse',
      description: 'Cozy and comfortable stay with personalized service',
      image: 'https://source.unsplash.com/800x600/?guesthouse',
      price: '$100/night'
    }
  ];

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Accommodation
      </Typography>
      <Typography variant="body1" paragraph>
        Find the perfect place to stay during your heritage exploration journey.
      </Typography>
      
      <Grid container spacing={3}>
        {accommodations.map((accommodation, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={accommodation.image}
                alt={accommodation.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {accommodation.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {accommodation.description}
                </Typography>
                <Typography variant="h6" color="primary">
                  {accommodation.price}
                </Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Accommodation;
