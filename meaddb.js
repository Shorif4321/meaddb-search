//default meals

const allMeals = () => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then(res => res.json())
        .then(data => displayCategory(data.categories))
}

allMeals()
const displayCategory = (categories) => {
    const categoryDiv = document.getElementById('category');
    categories.forEach(category => {
        console.log(category);
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
                    <img height='200px' src="${category.strCategoryThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${category?.strCategory}</h5>
                        <p class="card-text">${category?.strCategoryDescription.slice(0, 50)}</p>
                    </div>
                </div>
        `
        categoryDiv.appendChild(div)

    })
}





// www.themealdb.com/api/json/v1/1/search.php?s= Arrabiata
// https://www.themealdb.com/api/json/v1/1/search.php?s=rice

document.getElementById('error-message').style.display = 'none'
//spinner function
const loadSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
const toggleSearchResult = displayStyle => {
    document.getElementById('meals').style.display = displayStyle;
}
const searchFood = () => {
    const categoryDiv = document.getElementById('category').style.display = 'none';
    const searchField = document.getElementById('search-field');
    const searhText = searchField.value;
    // display spinner and hide search result
    loadSpinner('block')
    toggleSearchResult('none')
    searchField.value = '';


    document.getElementById('error-message').style.display = 'none';
    if (searhText == '') {
        document.getElementById('error-message').style.display = 'block';
    } else {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searhText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data?.meals))

    }
}

const displaySearchResult = (meals) => {
    console.log(meals);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    // again call for clear all details 
    const mealDetails = document.getElementById('meal-Details');
    mealDetails.textContent = ''

    // searchResult.innerHTML = '';


    document.getElementById('error-message').style.display = 'none';

    if (meals == null) {//error solve if food item is not found
        // console.log(meals.length);
        document.getElementById('error-message').style.display = 'block';

        searchResult.textContent = '';// error er time a ger sob kicu clear kora

        // spinner will be of after getting erro
        loadSpinner('none')
    }
    else {
        meals.forEach(meal => {
            console.log(meal);
            const div = document.createElement('div');
            div.classList.add('col')
            div.innerHTML = `
                    <div onclick="loadMealDetails(${meal?.idMeal})" class="card">
                        <img height='200px' src="${meal.strMealThumb}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${meal?.strMeal}</h5>
                            <p>${meal.strIngredient18 ? meal.strIngredient18 : 'not available'}
                            <p class="card-text">${meal?.strInstructions.slice(0, 120)}</p>
                        </div>
                    </div>
            `
            searchResult.appendChild(div)
        })
        //spinner off and search result show
        loadSpinner('none')
        toggleSearchResult('block')

    }
}

const loadMealDetails = (mealID) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetails(data?.meals[0]))
}

const displayMealDetails = (meal) => {
    // console.log(meal);
    const mealDetails = document.getElementById('meal-Details');
    mealDetails.textContent = ''
    const div = document.createElement('div');
    div.classList.add('card')
    div.innerHTML = `
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                 <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
                </div>
                <a href="${meal.strYoutube}" class="btn btn-success">Go Youtube</a>
            </div>`

    mealDetails.appendChild(div)

}

