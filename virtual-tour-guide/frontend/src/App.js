import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import theme from './theme';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import VirtualTour from './pages/VirtualTour';
import VirtualMart from './pages/VirtualMart';
import LocalGuides from './pages/LocalGuides';
import Accommodations from './pages/Accommodations';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Checkout from './pages/Checkout';
import AddProduct from './pages/AddProduct';
import VendorDashboard from './pages/VendorDashboard';
import VendorLogin from './pages/VendorLogin';
import VendorRegister from './pages/VendorRegister';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <CartProvider>
          <Router>
            <Box minH="100vh" bg="gray.50">
              <Navbar />
              <Box as="main">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/virtual-tour" element={<VirtualTour />} />
                  <Route path="/virtual-mart" element={<VirtualMart />} />
                  <Route path="/local-guides" element={<LocalGuides />} />
                  <Route path="/accommodations" element={<Accommodations />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                  <Route path="/add-product" element={<AddProduct />} />
                  <Route path="/vendor/login" element={<VendorLogin />} />
                  <Route path="/vendor/register" element={<VendorRegister />} />
                  <Route 
                    path="/vendor/dashboard" 
                    element={
                      <ProtectedRoute>
                        <VendorDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="/edit-product/:id" element={<AddProduct />} />
                </Routes>
              </Box>
            </Box>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
