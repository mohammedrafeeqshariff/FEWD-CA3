const parentElement = document.getElementById("parentElement");
const randomIngredientsDiv = document.getElementById("randomFoodIngredients")
const ingredientsButton = document.getElementById("ingredientsBtn")
const other = document.getElementById("try_other")

//this function fetches the api and convers to jso format
const fetchRandomMeal = async ()=> {
    try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching random meals:", error);
    }
}

//this is the  main function that displays the random meal with its components
const displayRandomMeals = async () => {
    try {
        const data = await fetchRandomMeal();
        const randomMeal = data.meals[0];
        console.log(randomMeal);
        const mealElements = 
        `
        <div id="random-food">
            <div>
                <img id="random_image" src="${randomMeal.strMealThumb}" height="250px" width="250px" alt="random Meal img">
                <b id="mealName">${randomMeal.strMeal}</b>
                    <b id="mealCategory">${randomMeal.strCategory}</b>
            </div>
        </div>`;

        parentElement.innerHTML = mealElements;

        let ingredients_arr = `<pre id="ingredientsModal">\n<b>${randomMeal.strMeal}</b>\n`;

        for (let i = 1; i <= 20; i++) {
            const ingredients = randomMeal[`strIngredient${i}`];
            const measure = randomMeal[`strMeasure${i}`];
            if (ingredients && measure && ingredients != null && measure != null && ingredients.trim() != '' && measure.trim() != '') {
                ingredients_arr += `\n ${measure} ${ingredients} \n`;
            }
        }
        ingredients_arr += `\n<button class="close btn">Close</button>  <button class="recipieBtn">Recipie</button></pre>`;

        
        ingredientsButton.addEventListener("click", ()=>{
            console.log("clicked")
            randomIngredientsDiv.style.display="block"
        })

        other.addEventListener("click", ()=>{
            window.location.reload()
        })

        randomIngredientsDiv.innerHTML = ingredients_arr;
        randomIngredientsDiv.style.display="none"

        document.querySelector(".close").addEventListener('click', () => { randomIngredientsDiv.style.display = "none" });
        document.querySelector(".recipieBtn").addEventListener("click",()=>{
            window.location.href = randomMeal.strYoutube
        })



    } catch (error) {
        console.error("Error displaying random meals:", error);
    }
};

displayRandomMeals();



document.querySelector(".search-bar").addEventListener('input', (e) => {
    fetchSearchApi(e.target.value)
})

// this function is to fetch the API of searched dish
function fetchSearchApi(item) {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${item}`)
    .then(res => res.json())
    .then(d => {
        const data = d.meals
        displaySearchItems(data)
        console.log(data)
    })
}

// this is to display the images 
function displaySearchItems(data) {
    const displayDiv = document.querySelector(".searched_category")
    displayDiv.innerHTML = ""
    const status = document.getElementById("status")

    if (data && data.length > 0) {
        status.innerHTML="Results"
        data.forEach(meal => { 
            const mealDiv = document.createElement("div");
            mealDiv.classList.add("searchResult");
            mealDiv.innerHTML = `
                <img id="category_image" src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <p id="category_name">${meal.strMeal}</p>
            `;
            displayDiv.appendChild(mealDiv);
        });
    } else {
        status.innerHTML="No Results Found"
    }
}

function run() {
    document.location.reload()
}