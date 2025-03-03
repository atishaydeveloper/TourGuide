import React, { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Switch,
  Badge,
  Avatar,
  SimpleGrid,
  useToast,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Divider,
  Tag,
  TagLabel,
  TagCloseButton,
} from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';
import { mockGuides } from '../mockData/guides';

const HERITAGE_SITES = [
  'Taj Mahal',
  'Hampi',
  'Ellora Caves',
  'Khajuraho',
  'Ajanta Caves',
  'Red Fort',
  'Qutub Minar',
  'Konark Sun Temple',
];

const LANGUAGES = [
  'English',
  'Hindi',
  'Bengali',
  'Tamil',
  'Telugu',
  'Marathi',
  'Gujarati',
  'Kannada',
  'Malayalam',
  'Other',
];

const GuideProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(mockGuides[0]);
  const [stats, setStats] = useState({
    totalTours: mockGuides[0].totalTours,
    averageRating: mockGuides[0].rating,
    totalReviews: mockGuides[0].totalReviews,
  });
  const [reviews, setReviews] = useState(mockGuides[0].reviews);
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('contact.')) {
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        contactInfo: {
          ...prev.contactInfo,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleLanguageSelect = (e) => {
    const value = e.target.value;
    if (!formData.languages.includes(value)) {
      setFormData((prev) => ({
        ...prev,
        languages: [...prev.languages, value],
      }));
    }
  };

  const handleSiteSelect = (e) => {
    const value = e.target.value;
    if (!formData.heritageSites.includes(value)) {
      setFormData((prev) => ({
        ...prev,
        heritageSites: [...prev.heritageSites, value],
      }));
    }
  };

  const removeLanguage = (language) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.filter((l) => l !== language),
    }));
  };

  const removeSite = (site) => {
    setFormData((prev) => ({
      ...prev,
      heritageSites: prev.heritageSites.filter((s) => s !== site),
    }));
  };

  const handleSubmit = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: 'Profile updated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setIsEditing(false);
    } catch (error) {
      toast({
        title: 'Error updating profile',
        description: 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Profile Header */}
        <Box bg="white" p={6} borderRadius="lg" shadow="md">
          <HStack spacing={6} align="start">
            <Avatar size="2xl" name={formData.name} />
            <VStack align="start" flex={1} spacing={4}>
              <Box>
                <Heading size="lg">{formData.name}</Heading>
                <Text color="gray.600">Tour Guide</Text>
              </Box>
              
              <StatGroup w="full">
                <Stat>
                  <StatLabel>Tours</StatLabel>
                  <StatNumber>{stats.totalTours}</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Rating</StatLabel>
                  <StatNumber>{stats.averageRating.toFixed(1)}/5</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Reviews</StatLabel>
                  <StatNumber>{stats.totalReviews}</StatNumber>
                </Stat>
              </StatGroup>

              <HStack>
                <Button
                  colorScheme="heritage"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
                {isEditing && (
                  <Button colorScheme="green" onClick={handleSubmit}>
                    Save Changes
                  </Button>
                )}
              </HStack>
            </VStack>
          </HStack>
        </Box>

        {/* Profile Details */}
        <Box bg="white" p={6} borderRadius="lg" shadow="md">
          <VStack spacing={6} align="stretch">
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                isReadOnly={!isEditing}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Experience (years)</FormLabel>
              <Input
                name="experience"
                type="number"
                value={formData.experience}
                onChange={handleChange}
                isReadOnly={!isEditing}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Languages</FormLabel>
              {isEditing ? (
                <VStack align="stretch" spacing={2}>
                  <Select
                    placeholder="Add a language"
                    onChange={handleLanguageSelect}
                  >
                    {LANGUAGES.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </Select>
                  <Box>
                    {formData.languages.map((lang) => (
                      <Tag
                        key={lang}
                        size="md"
                        borderRadius="full"
                        variant="solid"
                        colorScheme="heritage"
                        m={1}
                      >
                        <TagLabel>{lang}</TagLabel>
                        <TagCloseButton onClick={() => removeLanguage(lang)} />
                      </Tag>
                    ))}
                  </Box>
                </VStack>
              ) : (
                <Box>
                  {formData.languages.map((lang) => (
                    <Badge key={lang} m={1} colorScheme="heritage">
                      {lang}
                    </Badge>
                  ))}
                </Box>
              )}
            </FormControl>

            <FormControl>
              <FormLabel>Heritage Sites</FormLabel>
              {isEditing ? (
                <VStack align="stretch" spacing={2}>
                  <Select
                    placeholder="Add a heritage site"
                    onChange={handleSiteSelect}
                  >
                    {HERITAGE_SITES.map((site) => (
                      <option key={site} value={site}>
                        {site}
                      </option>
                    ))}
                  </Select>
                  <Box>
                    {formData.heritageSites.map((site) => (
                      <Tag
                        key={site}
                        size="md"
                        borderRadius="full"
                        variant="solid"
                        colorScheme="blue"
                        m={1}
                      >
                        <TagLabel>{site}</TagLabel>
                        <TagCloseButton onClick={() => removeSite(site)} />
                      </Tag>
                    ))}
                  </Box>
                </VStack>
              ) : (
                <Box>
                  {formData.heritageSites.map((site) => (
                    <Badge key={site} m={1} colorScheme="blue">
                      {site}
                    </Badge>
                  ))}
                </Box>
              )}
            </FormControl>

            <Divider />

            <Heading size="md">Contact Information</Heading>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              <FormControl>
                <FormLabel>Phone</FormLabel>
                <Input
                  name="contact.phone"
                  value={formData.contactInfo.phone}
                  onChange={handleChange}
                  isReadOnly={!isEditing}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  name="contact.email"
                  value={formData.contactInfo.email}
                  onChange={handleChange}
                  isReadOnly={!isEditing}
                />
              </FormControl>

              <FormControl>
                <FormLabel>WhatsApp</FormLabel>
                <Input
                  name="contact.whatsapp"
                  value={formData.contactInfo.whatsapp}
                  onChange={handleChange}
                  isReadOnly={!isEditing}
                />
              </FormControl>
            </SimpleGrid>

            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">Available for Tours</FormLabel>
              <Switch
                colorScheme="heritage"
                isChecked={formData.availability}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    availability: e.target.checked,
                  }))
                }
                isDisabled={!isEditing}
              />
            </FormControl>
          </VStack>
        </Box>

        {/* Reviews Section */}
        <Box bg="white" p={6} borderRadius="lg" shadow="md">
          <Heading size="md" mb={4}>
            Recent Reviews
          </Heading>
          <VStack spacing={4} align="stretch">
            {reviews.map((review) => (
              <Box
                key={review._id}
                p={4}
                borderWidth="1px"
                borderRadius="md"
              >
                <HStack justify="space-between" mb={2}>
                  <HStack>
                    <Avatar size="sm" name={review.user.username} />
                    <Text fontWeight="bold">{review.user.username}</Text>
                  </HStack>
                  <Badge colorScheme="yellow">
                    {review.rating}/5
                  </Badge>
                </HStack>
                <Text>{review.comment}</Text>
                <Text fontSize="sm" color="gray.500" mt={2}>
                  {new Date(review.date).toLocaleDateString()}
                </Text>
              </Box>
            ))}
            {reviews.length === 0 && (
              <Text color="gray.500" textAlign="center">
                No reviews yet
              </Text>
            )}
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default GuideProfile;
