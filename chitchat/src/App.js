import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import HomePage from './pages/HomePage';
import { Rooms } from "./components/Rooms";
import ChatProvider from "./context/chatProvider";

function App() {
  return (
    <>
      <Router>
        <ChatProvider>
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
           path="/myChats"
           element={<Rooms />}
          />
        </Routes>
        </ChatProvider>
      </Router>
    </>
  );
}

export default App;
