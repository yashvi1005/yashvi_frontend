import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Category from "./components/Category/Category";
import Navbar from "./components/Navbar/Navbar";
import Material from "./components/Material/Material";

function App() {
  return (
    <>
      <Router>
      <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/category" element={<Category />} />
          <Route exact path="/material" element={<Material />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
