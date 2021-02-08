const searchBtn = document.getElementById('search-btn');
const result = document.getElementById('result');
const ingredients = document.querySelector('.ingredients');
const closeBtn = document.getElementById('close-Btn');



result.addEventListener('click', getMealRecipe);
closeBtn.addEventListener('click', () => {
    ingredients.parentElement.classList.remove('show-recipe');
});




const apearMeal = () => {
    let search = document.getElementById("search-input").value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`)
        .then(res => res.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
            <div class = "meal-item" data-id = "${meal.idMeal}">
              <div class = "meal-img">
              <img src = "${meal.strMealThumb}" alt = "food">
              </div> 
              <div class = "meal-name">
              <h3>${meal.strMeal}</h3> 
              <a href = "#" class = "recipe-btn">Ingredients</a> 
              </div> 
              </div>
            `;
                });
            } else {
                html = "Sorry, we don't have it!";

            }
            result.innerHTML = html;
        });
}




function getMealRecipe(recipeItems) {
    recipeItems.preventDefault();
    if (recipeItems.target.classList.contains('recipe-btn')) {
        let mealItem = recipeItems.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(res => res.json())
            .then(data => mealRecipe(data.meals))
    }
}

const mealRecipe = (meal) => {
    meal = meal[0];
    let html = `
    <div class = "recipe-meal-img">
    <img src = "${meal.strMealThumb}" alt = "">
    </div>
    <h2 class = "recipe-title">${meal.strMeal}</h2>
    <p class = "recipe-category">${meal.strCategory}</p>
    <div class = "recipe-instruct">
    <h3>Ingredients:</h3>
    <p>${meal.strIngredient1} ${meal.strMeasure1}</p>
    <p>${meal.strIngredient2} ${meal.strMeasure2}</p>
    <p>${meal.strIngredient3} ${meal.strMeasure3}</p>
    <p>${meal.strIngredient4} ${meal.strMeasure4}</p>
    <p>${meal.strIngredient5} ${meal.strMeasure5}</p>
    <p>${meal.strIngredient6} ${meal.strMeasure6}</p>
    <p>${meal.strIngredient7} ${meal.strMeasure7}</p>
    <p>${meal.strIngredient8} ${meal.strMeasure8}</p>
    <p>${meal.strIngredient9} ${meal.strMeasure9}</p>
    <p>${meal.strIngredient10} ${meal.strMeasure10}</p>
    </div>
    `;
    ingredients.innerHTML = html;
    ingredients.parentElement.classList.add('show-recipe');
}