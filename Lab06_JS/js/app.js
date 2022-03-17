//? Query objects from HTML 
const frmRecipes = document.querySelector('#frmRecipes'); 
const lstRecipes = document.querySelector('.recipes-list');

let listItems = [];

//? BUS function
const handlerFormSubmit = (e) => {
  e.preventDefault();
  const name = frmRecipes.txtName.value;
  const method = frmRecipes.ddlMethod.value;
  const note = frmRecipes.txtNote.value;

  const newRecipe = { name, method, note, id: Date.now() };
  listItems.push(newRecipe);

  e.target.reset();
  frmRecipes.txtName.focus();
  lstRecipes.dispatchEvent(new CustomEvent('refreshRecipes'));
}

const handlerRefreshRecipes = () => {
  const templateRecipesUI = listItems.map(recipe => `
  <div class="recipes-item">
    <h3>${recipe.name}</h3>
    <ul>
      <li><strong>Method:</strong> ${recipe.method}</li>
      <li><strong>Note:</strong> ${!recipe.note ? "<em>Nothing</em>" : recipe.note}</li>
    </ul>
    <button type="button" class="btnDelete" onclick="handlerDeleteRecipe(${recipe.id})">Make DONE</button>
  </div>
  `).join('');
  
  lstRecipes.innerHTML = templateRecipesUI;
}

const handlerDeleteRecipe = (id) => {
  const recipeIndex = listItems.findIndex(recipe => recipe.id == id);
  listItems.splice(recipeIndex, 1);
  lstRecipes.dispatchEvent(new CustomEvent('refreshRecipes'));
};

//? Event handler
frmRecipes.addEventListener('submit', handlerFormSubmit);
lstRecipes.addEventListener('refreshRecipes', handlerRefreshRecipes);