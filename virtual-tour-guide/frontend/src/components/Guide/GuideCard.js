import React from 'react';
import {
  Box,
  Image,
  Badge,
  Text,
  Stack,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  HStack,
  VStack,
  Icon,
  Flex,
  Avatar,
} from '@chakra-ui/react';
import { FaWhatsapp, FaPhone, FaEnvelope, FaStar, FaLanguage } from 'react-icons/fa';

const GuideCard = ({ guide }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleContact = (method) => {
    switch (method) {
      case 'whatsapp':
        window.open(`https://wa.me/${guide.contactInfo.whatsapp}`, '_blank');
        break;
      case 'phone':
        window.location.href = `tel:${guide.contactInfo.phone}`;
        break;
      case 'email':
        window.location.href = `mailto:${guide.contactInfo.email}`;
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg="white"
        transition="transform 0.2s"
        _hover={{ transform: 'scale(1.02)' }}
        cursor="pointer"
        onClick={onOpen}
      >
        <Box p="6">
          <Flex align="center" mb={4}>
            <Avatar size="lg" name={guide.name} src={guide.avatar} mr={4} />
            <Box>
              <Text fontWeight="bold" fontSize="xl">
                {guide.name}
              </Text>
              <HStack spacing={2}>
                <Icon as={FaStar} color="yellow.400" />
                <Text>{guide.rating.toFixed(1)}</Text>
              </HStack>
            </Box>
          </Flex>

          <Stack spacing={3}>
            <HStack>
              <Icon as={FaLanguage} color="heritage.500" />
              <Text>{guide.languages.join(', ')}</Text>
            </HStack>

            <Text>Experience: {guide.experience} years</Text>

            <Box>
              <Text fontWeight="semibold" mb={1}>Heritage Sites:</Text>
              <HStack spacing={2} wrap="wrap">
                {guide.heritageSites.map(site => (
                  <Badge key={site} colorScheme="heritage">
                    {site}
                  </Badge>
                ))}
              </HStack>
            </Box>
          </Stack>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{guide.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Stack spacing={4}>
              <Flex align="center">
                <Avatar size="2xl" name={guide.name} src={guide.avatar} mr={6} />
                <Box>
                  <HStack spacing={2} mb={2}>
                    <Icon as={FaStar} color="yellow.400" />
                    <Text fontWeight="bold">{guide.rating.toFixed(1)}</Text>
                  </HStack>
                  <Text>{guide.experience} years of experience</Text>
                </Box>
              </Flex>

              <Box>
                <Text fontWeight="bold" mb={2}>Languages</Text>
                <HStack spacing={2} wrap="wrap">
                  {guide.languages.map(language => (
                    <Badge key={language} colorScheme="blue">
                      {language}
                    </Badge>
                  ))}
                </HStack>
              </Box>

              <Box>
                <Text fontWeight="bold" mb={2}>Heritage Sites</Text>
                <HStack spacing={2} wrap="wrap">
                  {guide.heritageSites.map(site => (
                    <Badge key={site} colorScheme="heritage">
                      {site}
                    </Badge>
                  ))}
                </HStack>
              </Box>

              <Box borderTopWidth={1} pt={4}>
                <Text fontWeight="bold" mb={2}>Contact Guide</Text>
                <VStack spacing={2} align="stretch">
                  {guide.contactInfo.whatsapp && (
                    <Button
                      leftIcon={<FaWhatsapp />}
                      colorScheme="green"
                      onClick={() => handleContact('whatsapp')}
                    >
                      WhatsApp
                    </Button>
                  )}
                  {guide.contactInfo.phone && (
                    <Button
                      leftIcon={<FaPhone />}
                      colorScheme="blue"
                      onClick={() => handleContact('phone')}
                    >
                      Call
                    </Button>
                  )}
                  {guide.contactInfo.email && (
                    <Button
                      leftIcon={<FaEnvelope />}
                      colorScheme="heritage"
                      onClick={() => handleContact('email')}
                    >
                      Email
                    </Button>
                  )}
                </VStack>
              </Box>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GuideCard;
