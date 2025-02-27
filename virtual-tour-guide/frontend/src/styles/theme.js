import { extendTheme } from '@chakra-ui/react';
import { Button, Box, Text } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#f7fafc',
      100: '#edf2f7',
      500: '#319795',
      600: '#2c7a7b',
      700: '#285e61',
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: 'md',
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
          },
        },
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
      },
    },
  },
  transitions: {
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '450ms',
    },
  },
});

export default theme; 