import { AddUser, AllUsers, EditUser, Home, Navbar } from './components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />} exact />
          <Route path='/all' element={<AllUsers />} exact />
          <Route path='/add' element={<AddUser />} exact />
          <Route path='/edit/:id' element={<EditUser />} exact />
        </Routes>


      </BrowserRouter>
    </div>
  );
}

export default App;
