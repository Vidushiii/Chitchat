import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
      <Router>
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
        </Routes>
      </Router>
    </>
  );
}

export default App;
