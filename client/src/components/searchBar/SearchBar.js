import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCutlery } from '@fortawesome/free-solid-svg-icons';
import { useForm, Controller } from 'react-hook-form'; 
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';


const cuisine = ['African', 'Asian', 'American', 'British', 'Cajun', 'Caribbean', 'Chinese', 'Eastern European', 'European', 'French', 'German', 'Greek',
'Indian', 'Irish', 'Italian', 'Japanese', 'Jewish', 'Korean', 'Latin American', 'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic',
'Southern', 'Spanish', 'Thai', 'Vietnamese'];

const diets = [
  "Gluten Free",
  "Ketogenic",
  "Vegetarian",
  "Lacto-Vegetarian",
  "Ovo-Vegetarian",
  "Vegan",
  "Pescetarian",
  "Paleo",
  "Primal",
  "Low FODMAP",
  "Whole30"
];

const intolerances = [
  "Dairy",
  "Egg",
  "Gluten",
  "Grain",
  "Peanut",
  "Seafood",
  "Sesame",
  "Shellfish",
  "Soy",
  "Sulfite",
  "Tree Nut",
  "Wheat"
];

const SearchBar = ({onSubmit}) => {
  const { control, register, handleSubmit, watch } = useForm();

  const viewSubmission = (data) => {
    console.log(data)
  }

  return (
    <Wrapper onSubmit={handleSubmit(viewSubmission)}>
      <SearchBarWrapper>
        <SearchInput
          autoComplete='off'
          minLength='1'
          required
          {...register('query')}
          placeholder='hungry for?'
          aria-label='search'
        />
        <SearchButton type="submit" aria-label='submit search' class='searchBar-Button'>
          <FontAwesomeIcon icon={faCutlery} />
        </SearchButton>

      <DoubleWrapped className='doubleWrapped'>
      <Controller
        name="opts.cuisine"
        control={control} // From useForm
        defaultValue={[]} // Initial default value
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            multiple
            id="cuisine"
            options={cuisine}
            getOptionLabel={(option) => option}
            value={value}
            onChange={(event, newValue) => onChange(newValue)} // Update the value
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Cuisine"
                placeholder="Cuisine"
              />
            )}
          />
        )}
        />
        
        <Controller
        name="opts.diet"
        control={control} // From useForm
        defaultValue={[]} // Initial default value
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            multiple
            id="diet"
            options={diets}
            getOptionLabel={(option) => option}
            value={value}
            onChange={(event, newValue) => onChange(newValue)} // Update the value
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Diet"
                placeholder="Diet"
              />
            )}
          />
        )}
      />
        
      <Controller
        name="opts.intolerence"
        control={control} // From useForm
        defaultValue={[]} // Initial default value
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            multiple
            id="intolerences"
            options={intolerances}
            getOptionLabel={(option) => option}
            value={value}
            onChange={(event, newValue) => onChange(newValue)} // Update the value
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Intolerences"
                placeholder="Intolerences"
              />
            )}
          />
        )}
        />
      </DoubleWrapped>
      </SearchBarWrapper>



    </Wrapper>
  )
};

const Wrapper = styled.form`
background:white; 
width: 70vw;
padding: 1em;
box-shadow: 0 0 3em rgba(0,0,0,.15);
position: relative;
`; 

const DoubleWrapped = styled.div`
position: fixed;
top: 13vh;
width: 100%;
padding: 2em;
width: calc(70vw - 40px);
z-index: 100;
background: white;
border-radius: 3px; 
border: 1px solid black;
display: none;
`;

const SearchBarWrapper = styled.div`
--size: 60px; 
display: flex; 
border: 2px solid var(--clr-primary);
border-radius: 1000px; 
height: var(--size);
width: var(--size);
padding: 3px; 
position: relative; 
transition: width 450ms cubic-bezier(0.68, -0.55, 0.27, 1.15);
overflow: hidden;

&:focus-within{
  width: 100%;

  &:not(:placeholder-shown) {

  }

  input {
    opacity: 1;
    cursor: initial;  
    width: calc(100% - var(--size));
  }

  .searchBar-Button {
    background: var(--clr-primary);
    color:white;

  &:focus,
  &:hover {
    outline: 0; 
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    }
  }
  
  .doubleWrapped {
    display:block;
    visibility: visible;
    opacity: 1;
    }


}


}

`;

const SearchButton = styled.button`
  font-size: 1.5rem;
  cursor: pointer; 
  border: 0; 
  background: transparent; 
  border-radius: 50%;
  width: calc(var(--size) - 10px);
  height: calc(var(--size) - 10px);
  margin-left: auto; 
  transition: background 150ms ease-in-out;
`;

const SearchInput = styled.input`
  flex-grow: 1;
  font-size: 1.5rem;
  padding: 0 0.5rem;
  border: 0; 
  position: absolute; 
  top: 0; 
  bottom: 0;
  left: 0; 
  opacity: 0;
  cursor: pointer; 

  &:focus {
    outline: 0; 
  }
`;


export default SearchBar; 