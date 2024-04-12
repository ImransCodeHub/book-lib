import logo from './logo.svg';
import './App.css';
import Library from './components/Library';
import Books from './components/Books.jsx';
import ViewBook from './components/ViewBook.jsx';
import CreateBook from './components/CreateBook.jsx';
import Authors from './components/Authors.jsx';
import ViewAuthor from './components/viewAuthor.jsx';
import CreateAuthor from './components/CreateAuthor.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';

function App() {
  return (
    <>
    <BrowserRouter>
    < Navbar />

      <Routes>
        <Route path="/" element={<Books />} />
        <Route path='/books/:isbn' element={<ViewBook />} />
        <Route path="/create-book" element={<CreateBook />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/authors/:id" element={<ViewAuthor />} />
        <Route path="/create-author" element={<CreateAuthor />} />
      </Routes>
    </BrowserRouter>
    </>
    
  );
}

export default App;
