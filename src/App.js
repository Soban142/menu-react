import './App.css';
import { useEffect, useState } from 'react';

function App() {
  
  let [ recipeName, setRecipeName ] = useState('');
  let [ recipe, setRecipe ] = useState([]);

  let getRecipe = async () => {
      const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${recipeName}`);
      const resInJson = await res.json();
      setRecipe(resInJson.data.recipes)
    } 

    const handleSearch = () => {
      getRecipe();
      setRecipeName('')
    };
  
  useEffect(() => {
    getRecipe()
  }, []);
      
  
  return (
    <div className="App">
      <Header />
      <SubHeader />
      <RecipeItem recipeName={recipeName} setRecipeName={setRecipeName} setRecipe={setRecipe} handleSearch={handleSearch}/>
      <RecipesContainer recipesArray = {recipe}/>
      <Footer />
    </div>
  );
}


function Header() {
  return (
    <h1 className='header'>--Fast React Pizza Co.--</h1>
  )
}

function SubHeader() {
  return (
    <div>
      <h2>
        <span className='sub-heading'>OUR MENU</span>
      </h2>
      <p className='sub-title' style={{ fontWeight: '500', marginTop: '2rem' }}>Authentic Italian cuisine. 6 creative dishes to choose from. All from our stone oven, all organic, all delicius.</p>
    </div>
  )
}

function RecipeItem({recipeName, setRecipeName, handleSearch}) {
  return (
    <div>
      <input style={{border: 'none', padding: '0.5em 1em'}} onChange={(e) => setRecipeName(e.target.value)} value={recipeName} />
      <button className='submitBtn' onClick={handleSearch}>Submit</button>
    </div>
  )
}

function RecipesContainer({recipesArray}) {
  let recipesDivs = recipesArray.map((recipe) => {
    return (<div className='recipe_div'>
      <img style={{width: '150px', height: '150px'}} src={recipe.image_url}/>
      <div className='recipe_details'>
        <h3>{recipe.title}</h3>
        <p>{recipe.publisher}</p>
      </div>
    </div>)
  });

  return(
    <div className='recipes-container'>
      {recipesDivs}
    </div>
  )
}

function Footer() {
  return ( 
    <div>
      <p className='footer_text'>We're open until 22:00. Come visit us or order online</p>
      <button className='orderBtn'>Order Now</button>
    </div>
  )
}

export default App;
