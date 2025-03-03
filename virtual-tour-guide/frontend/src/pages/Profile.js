import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Avatar,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  useToast,
  Divider,
} from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';
import BadgeDisplay from '../components/Badge/BadgeDisplay';
import axios from 'axios';

const Profile = () => {
  const { user } = useAuth();
  const [badges, setBadges] = useState([]);
  const [badgesEnabled, setBadgesEnabled] = useState(true);
  const [stats, setStats] = useState({
    totalTimeSpent: 0,
    sitesVisited: 0,
    lastVisited: null
  });
  const toast = useToast();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('/api/user/profile');
      const { badges, badgesEnabled, stats } = response.data;
      setBadges(badges);
      setBadgesEnabled(badgesEnabled);
      setStats(stats);
    } catch (error) {
      toast({
        title: 'Error fetching profile',
        description: error.response?.data?.message || 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleBadgeToggle = async (enabled) => {
    setBadgesEnabled(enabled);
  };

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Profile Header */}
        <Box bg="white" p={6} borderRadius="lg" shadow="md">
          <HStack spacing={6}>
            <Avatar
              size="2xl"
              name={user.username}
              src={user.avatar}
            />
            <VStack align="start" flex={1}>
              <Heading size="lg">{user.username}</Heading>
              <Text color="gray.600">{user.email}</Text>
              <HStack spacing={4} mt={2}>
                <Box>
                  <Text fontWeight="bold">{stats.sitesVisited}</Text>
                  <Text fontSize="sm" color="gray.500">Sites Visited</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">{Math.floor(stats.totalTimeSpent / 60)}</Text>
                  <Text fontSize="sm" color="gray.500">Minutes Spent</Text>
                </Box>
              </HStack>
            </VStack>
          </HStack>
        </Box>

        {/* Tabs Section */}
        <Tabs colorScheme="heritage" isLazy>
          <TabList>
            <Tab>Badges</Tab>
            <Tab>History</Tab>
            <Tab>Settings</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <BadgeDisplay
                badges={badges}
                enabled={badgesEnabled}
                onToggle={handleBadgeToggle}
              />
            </TabPanel>

            <TabPanel>
              <VStack align="stretch" spacing={4}>
                <Heading size="md">Recent Activity</Heading>
                {stats.lastVisited ? (
                  <Box>
                    <Text>Last visited: {stats.lastVisited.site}</Text>
                    <Text fontSize="sm" color="gray.500">
                      {new Date(stats.lastVisited.date).toLocaleDateString()}
                    </Text>
                  </Box>
                ) : (
                  <Text color="gray.500">No recent activity</Text>
                )}
              </VStack>
            </TabPanel>

            <TabPanel>
              <VStack align="stretch" spacing={4}>
                <Heading size="md">Profile Settings</Heading>
                <Button colorScheme="heritage" size="lg" w="full">
                  Edit Profile
                </Button>
                <Divider />
                <Button colorScheme="red" variant="outline" size="lg" w="full">
                  Delete Account
                </Button>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  );
};

export default Profile;
