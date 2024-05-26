// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Chat from './pages/Chat';
// import Upload from './pages/Upload';
// import About from './pages/About';
// import Auth from './pages/Auth';
// import Home from './pages/Home';
// import ProtectedRoute from './components/ProtectedRoute';

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route 
//           path="/home" 
//           element={
//             <ProtectedRoute>
//               <Home />
//             </ProtectedRoute>
//           } 
//         />
//         <Route 
//           path="/chat" 
//           element={
//             <ProtectedRoute>
//               <Chat />
//             </ProtectedRoute>
//           } 
//         />
//         <Route 
//           path="/upload" 
//           element={
//             <ProtectedRoute>
//               <Upload />
//             </ProtectedRoute>
//           } 
//         />
//         <Route path="/about" element={<About />} />
//         <Route path="/auth" element={<Auth />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Chat from './pages/Chat';
import Upload from './pages/Upload';
import About from './pages/About';
import Auth from './pages/Auth';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/chat" 
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/upload" 
          element={
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>
          } 
        />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
