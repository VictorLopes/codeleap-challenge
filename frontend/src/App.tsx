import { useAuth } from './hooks';
import Signup from './pages/Signup';
import MainScreen from './pages/MainScreen';
import { UserProvider } from './context/UserContext';
import './App.css';

function AppContent() {
  const { username } = useAuth();

  return (
    <>
      {!username ? <Signup /> : <MainScreen />}
    </>
  );
}

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;
