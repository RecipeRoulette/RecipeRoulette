import React from 'react'
import { createBrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import RecipeCard from './components/recipeCard/index'
import FlipCard from './components/flipCard/FlipCard';
import AllergyPage from './pages/AllergySelection';
import Navbar from './components/Navbar/Navbar';
import SingleRecipePage from './components/singleRecipePage/SingleRecipePage';


const GlobalStyle = createGlobalStyle`
* {
    margin: 0; 
    padding:0; 
    box-sizing: border-box;
}

:root {
  --clr-primary: #ee6352;
  --clr-body: #333;
  --clr-bg: #ddd;
}

body {
  height: 100vh;  
}  
`;


const App = () => {

  // const location = useLocation();
  // const showBackground = location.pathname !== '/login';

  return (
    <Router>  
      <GlobalStyle />
      <Navbar />
      <Screen >
        <Routes>
          <Route path='/home' element={<HomePage/>} >
            <Route path=':id' element={<SingleRecipePage/>}> </Route>
          </Route>
          <Route path='/' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
        </Routes>
    </Screen>
    </Router>
  )
};

const Screen = styled.div`
display:flex;
align-items:center;
justify-content: center;
margin: auto;
padding: 115px 50px;
`;

export default App;