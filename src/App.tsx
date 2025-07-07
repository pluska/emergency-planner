import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Plan from "./pages/Plan";
import "./App.css";
function App() {
  return (
    <Router basename="/emergency-planner">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plan" element={<Plan />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
