import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import { GraphProvider } from "./contexts/GraphContext";
import { NUM_COLS, NUM_ROWS } from "./utils/constants";
import { DragProvider } from "./contexts/DragContext";

const App = () => {
  return (
    <>
      <GraphProvider rows={NUM_ROWS} cols={NUM_COLS}>
        <DragProvider>
          <Router>
            <Routes>
              <Route index path="/" element={<Home />} />
              <Route path="about" element={<About />} />
            </Routes>
          </Router>
        </DragProvider>
      </GraphProvider>
    </>
  );
};

export default App;
