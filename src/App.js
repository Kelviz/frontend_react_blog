import React from 'react'
import { Routes, Route } from 'react-router-dom';


import { Home, PostDetail, Navbar, CategoryPosts } from './components';
import './App.css';

function App() {
  return (
    <>
    <div className='app'>
      <div className='app__container'>
      <Navbar />
      
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:postId" element={<PostDetail />} />
          <Route  path="/categoryPosts/:categoryId" element={<CategoryPosts />} />
      </Routes>
        
      </div>
  </div>
  </>
  );
}

export default App;
