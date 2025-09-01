import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import theme from './theme';
import MainLayout from './components/Layout/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Placeholder components for routes
const Login = () => <div>Login Page</div>;
const Diary = () => <div>Diary Page</div>;
const History = () => <div>History Page</div>;
const Providers = () => <div>Providers Page</div>;
const Export = () => <div>Export Page</div>;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
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
    </ThemeProvider>
  );
}

export default App;
