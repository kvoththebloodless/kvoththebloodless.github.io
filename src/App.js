import Home from './routes/Home';
import Project from './routes/Project';
import Blog from './routes/Blog';
import Job from './routes/Job';
import DungeonsAndDragons from './routes/D&D'; // Import the new route

import "aos/dist/aos.css";
import {
  HashRouter, Routes, Route,
} from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<Project />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/job/:id" element={<Job />} />
          <Route path="/dungeons-and-dragons" element={<DungeonsAndDragons />} /> {/* Add the new route */}
          <Route path="*" element={<Home />} />
        </Routes>
      </HashRouter>
      <ReactTooltip />
    </>
  );
}

export default App;