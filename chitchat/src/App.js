import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";

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
        </Routes>
      </Router>
    </>
  );
}

export default App;
