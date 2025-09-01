import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import theme from './theme';
import MainLayout from './components/Layout/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

// Placeholder components for routes
const Diary = () => <div>Diary Page</div>;
const History = () => <div>History Page</div>;
const Providers = () => <div>Providers Page</div>;
const Export = () => <div>Export Page</div>;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <Profile />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/diary"
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <Diary />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/history"
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <History />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/providers"
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <Providers />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/export"
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <Export />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Navigate to="/diary" replace />} />
            </Routes>
          </Router>
        </AuthProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
