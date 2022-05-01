import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import HomePage from './pages/HomePage';
import { Rooms } from "./components/Rooms";

import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
        <Routes>
          <Route
            path="/"
            exact
            element={<SigninPage />}
          />
          <Route
            path="/signup"
            exact
            element={<SignupPage />} 
          />
          <Route
            path="/homepage"
            exact
            element={<HomePage />}
          />
          <Route 
           path="/joinRoom"
           element={<Rooms />}
          />
        </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
