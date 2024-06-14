import { Heart, HeartPulse, HelpCircle, Soup } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const getTwoUniqueValuesFromArray = (arr) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  const randomIndex2 = Math.floor(Math.random() * arr.length);
  return [arr[randomIndex], arr[randomIndex2]];
};

// const getTwoUniqueValuesFromArray = (arr) => {
//   if (arr.length < 2) return arr;

//   const indices = new Set();
//   while (indices.size < 2) {
//     indices.add(Math.floor(Math.random() * arr.length));
//   }

//   return [...indices].map((index) => arr[index]);
// };

function RecipeCard({ recipe, bg, badge }) {
  const [isFavorite, setIsFavorite] = useState(
    localStorage.getItem("favorites")?.includes(recipe.label)
  );
  const healthLabels = getTwoUniqueValuesFromArray(recipe.healthLabels);

  const addRecipeToFavorites = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isRecipeAlreadyInFavorites = favorites.some(
      (fav) => fav.label === recipe.label
    );

    if (isRecipeAlreadyInFavorites) {
      favorites = favorites.filter((fav) => fav.label !== recipe.label);
      setIsFavorite(false);
    } else {
      favorites.push(recipe);
      setIsFavorite(true);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  return (
    <>
      <div
        className={`flex flex-col rounded-md ${bg} overflow-hidden p-3 relative`}
      >
        <Link
          to={`https://www.youtube.com/results?search_query=${recipe.label}recipe`}
          target="_blank"
          rel="noopener noreferrer"
          className=" relative h-32"
        >
          <div className=" skeleton absolute inset-0"/>
          <img
            src={recipe?.image}
            alt=""
            className=" rounded-md w-full h-full object-cover cursor-pointer opacity-0 transition-opacity duration-500"
            onLoad={(e) => {
              e.currentTarget.style.opacity = 1,
              e.currentTarget.previousElementSibling.style.display = 'none'
            }}
          />
          <div className=" absolute bottom-2 left-2 bg-white rounded-full p-1 cursor-pointer gap-2 flex items-center text-sm">
            <Soup size={14} /> {recipe?.yield} Servings
          </div>
          <div
            className=" absolute top-1 right-2 bg-white rounded-full p-1 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              addRecipeToFavorites();
            }}
          >
            {!isFavorite && (
              <Heart
                size={20}
                className="hover:fill-red-500  hover:text-red-500"
              />
            )}

            {isFavorite && (
              <Heart size={20} className="fill-red-500 text-red-500" />
            )}
          </div>
        </Link>
        <div className="flex mt-1">
          <p className=" font-bold tracking-wide">{recipe?.label}</p>
        </div>
        <p className=" my-2">
          {recipe?.cuisineType[0].charAt(0).toUpperCase() +
            recipe?.cuisineType[0].slice(1)}{" "}
          Kitchen
        </p>
        <div className="flex gap-2 mt-auto">
          {healthLabels?.map((label, indx) => (
            <div
              className={`flex gap-1 ${badge} text-center p-1 rounded-md items-center`}
              key={indx}
            >
              <HeartPulse size={16} />
              <span className="text-sm tracking-tight font-semibold">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default React.memo(RecipeCard);

{
  /* <div className="flex gap-1 bg-[#d6f497] text-center p-1 rounded-md items-center">
            <HeartPulse size={16} />
            <span className="text-sm tracking-tight font-semibold">
              Heart Health
            </span>
          </div> */
}
