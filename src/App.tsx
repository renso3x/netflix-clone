import { BrowserRouter, Route, Routes } from 'react-router';

import Details from './pages/Details';
import Landing from './pages/Landing';
import Movies from './pages/Movies';
import MyList from './pages/MyList';
import TvShows from './pages/TvShows';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/tv" element={<TvShows />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/my-list" element={<MyList />} />
        <Route path="/title/:type/:id" element={<Details />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
