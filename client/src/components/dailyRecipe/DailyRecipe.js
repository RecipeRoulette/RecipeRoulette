import styled from "styled-components";
import FlipCard from "../flipCard/FlipCard";

import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
// Action Imports:
import { populateDaily, clearDaily } from '../../../slices/dailyRecipeSlice'
import { Card } from "@mui/material";


const DailyRecipe = () => {
  const { dailyRecipe } = useSelector((state) => state.dailyRecipe);
  const dispatch = useDispatch();

  const { id, title, image, servings, readyInMinutes } = dailyRecipe;

  useEffect(() => {
    async function fetchDailyRandomRecipe() {

      const reqOptions = {
        method: 'GET',
        credentials: 'include',
        headers: { 
          'Content-Type': 'application/json' 
        }
      };

      const response = await fetch('http://localhost:3000/recipes/randomRecipe', reqOptions)
        .catch((err) => {throw new Error(err);});
      const data = await response.json();
      dispatch(clearDaily());
      // using data.recipes[0] because it'll return an array of whatever the number opts is in the recipe controller.
      // I don't wanna do any more work... ;(
      dispatch(populateDaily(data.recipes[0]));
    }

    fetchDailyRandomRecipe();
  }, []);

  return (
    <Wrapper>

        <Photo bg={image}></Photo>

        <center>
            <h1>Recipe of the Day:</h1>
            <h2>{title}</h2>
            <h3>Ready in: {readyInMinutes} minutes</h3>
            <h3>Servings: {servings}</h3>
        </center>

    </Wrapper>
  );
};

const Wrapper = styled.div`
direction: flex;
flex-direction: row;
align-items: center;
width: 70vw;
background: var(--clr-bg);
border-radius: 1rem;
border: 4px solid rgba(0, 0, 0);
`;


const Photo = styled.div`
height: 600px;
background-image: url(${(props) => props.bg});
border-radius: 1rem; 
// border: 4px solid rgba(0, 0, 0, 0.50);
border-style: solid;
// box-shadow: 0 0 5px 2px rgba(50, 50, 50, 0.25);
background-repeat: no-repeat;
background-size: cover;
`;


export default DailyRecipe; 