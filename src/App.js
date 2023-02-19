import React,{useEffect,useState} from "react";
import Recipes from "./Recipes";
// import logo from './logo.svg';
import './App.css';

const App= () => {
  const APP_ID='dbdd4a31';
  const APP_KEY='5b31a28f012be59c3033141521ee19a7';

 const [recipes, setRecipes]=useState([]);
 const [search, setSearch]=useState('');
 const [query, setQuery]=useState('chicken');

  useEffect(()=>{
    getRecipes();
  },[query]);

  const getRecipes = async ()=>{
    const response=await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data=await response.json();
    setRecipes(data.hits);
    console.log(data.hits);

  };

  const updateSearch=e=>{
    setSearch(e.target.value);
    
  }

  const getSearch=e=>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} classname="search-form">
        <input classname="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button classname="search-button" type="submit">Search</button>
        </form>
        <div className="recipes">
        {recipes.map(recipes=>(
          <Recipes 
          key={recipes.recipe.label}
          title={recipes.recipe.label} 
          calories={recipes.recipe.calories}
          image={recipes.recipe.image} 
          ingredients={recipes.recipe.ingredients} />

        ))}
      </div>

    </div>
  );
};

export default App;
