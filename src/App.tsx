import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import { GraphProvider } from "./contexts/GraphContext";
import { NUM_COLS, NUM_ROWS } from "./utils/constants";

const App = () => {
  return (
    <>
      <GraphProvider rows={NUM_ROWS} cols={NUM_COLS}>
        <Router>
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="about" element={<About />} />
          </Routes>
        </Router>
      </GraphProvider>
    </>
  );
};

export default App;
