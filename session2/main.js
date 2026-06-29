const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const categoriesUrl = "https://www.themealdb.com/api/json/v1/1/categories.php";

const input = document.getElementById("input");
const searchBtn = document.getElementById("search-btn");
const meals = document.getElementById("meals");
const cat = document.getElementById("category");

//  API 

const getCategories = async () => {
  try {
    const response = await fetch(categoriesUrl);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

const getMeals = async (category) => {
  if (!category) return;

  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );

    const data = await response.json();
    displayMeals(data);
  } catch (error) {
    console.error(error);
    meals.innerHTML = "<p>Something went wrong.</p>";
  }
};

const getData = async () => {
  const ingredient = input.value.trim();

  if (!ingredient) {
    meals.innerHTML = "<p>Please enter an ingredient.</p>";
    return;
  }

  try {
    const response = await fetch(`${url}${ingredient}`);
    const data = await response.json();
    displayMeals(data);
  } catch (error) {
    console.error(error);
    meals.innerHTML = "<p>Something went wrong.</p>";
  }
};

//  UI 

const displayMeals = (data) => {
  if (!data.meals) {
    meals.innerHTML = "<p class='message'>No meals found.</p>";
    return;
  }

  const mealCard = data.meals
    .map(
      (meal) => `
      <div class="meal-card">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <div class="meal-info">
          <h3>${meal.strMeal}</h3>
        </div>
      </div>
    `
    )
    .join("");

  meals.innerHTML = mealCard;
};

const displayCategories = (data) => {
  const categoryCard = data.categories
    .map(
      ({ strCategory, strCategoryThumb }) => `
      <li onclick="getMeals('${strCategory}')">
        <div class="category-card">
          <img src="${strCategoryThumb}" alt="${strCategory}">
          <div class="category-info">
            <h3>${strCategory}</h3>
          </div>
        </div>
      </li>
    `
    )
    .join("");

  cat.innerHTML = `<ul>${categoryCard}</ul>`;
};

//  Initialization 

getCategories().then(displayCategories);

//  Events 

searchBtn.addEventListener("click", getData);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getData();
  }
});