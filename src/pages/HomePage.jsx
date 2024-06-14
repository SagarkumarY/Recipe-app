import { Search } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import RecipeCard from "../components/RecipeCard";
import { getRandomColor } from "../lib/Utils";
// import debounce from "debounce";
import { debounce } from "lodash";

function HomePage() {
  // State to hold recipes
  const [recipes, setRecipes] = useState([]);
  // State to handle loading status
  const [loading, setLoading] = useState(true);
  // State to hold the current search query
  const [searchQuery, setSearchQuery] = useState("chicken");
  // State to handle errors
  const [error, setError] = useState(null);
  // Reference to the search input field
  const inputRef = useRef();

  // Function to fetch recipes based on the search query
  const fetchRecipes = async (searchQuery) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/recipes?q=${searchQuery}&type=public`
      );
      let data = await res.json();
      if (data.success) {
        setRecipes(data.data.hits);
      } else {
        setError("Failed to load recipes.");
      }
    } catch (error) {
      console.log(error.message);
      setError("An error occurred while fetching recipes.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch recipes when the component mounts or when the search query changes
  useEffect(() => {
    fetchRecipes(searchQuery);
  }, [searchQuery]);

  // Handle input change with debounce to limit the number of API calls
  const handleSearchChange = debounce((e) => {
    setSearchQuery(e.target.value);
  }, 500);


 

  // Handle form submission to search for recipes
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = inputRef.current.value;
    setSearchQuery(query);
  };
  return (
    <div className="bg-[#faf9fb] p-10 flex-1">
      <div className="max-w-screen-lg mx-auto">
        <form onSubmit={handleSearchSubmit}>
          <label className="input shadow-md flex items-center gap-2">
            <Search size={"24"} />
            <input
              type="text"
              className=" text-sm md:text-base grow"
              placeholder="What do you want  to cook today"
              ref={inputRef}
              onChange={handleSearchChange}
            />
           
          </label>
        </form>
        <h1 className=" font-bold text-3xl md:text-5xl mt-4">
          Recommended Recipe
        </h1>
        <p className=" text-slate-600 font-semibold ml-1 my-2 text-sm tracking-tight">
          popular Choices
        </p>

        {/* {"Recipe Cards"} */}
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
          {/* {"1 Recipe"} */}

          {loading &&
            [...Array(9)].map((_, index) => (
              <div key={index} className="flex flex-col gap-4 w-full">
                <div className="skeleton h-32 w-full"></div>
                <div className="flex justify-between">
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-4 w-24"></div>
                </div>
                <div className="skeleton h-4 w-1/2"></div>
              </div>
            ))}

          {!loading &&
            recipes.length > 0 &&
            recipes?.map(({ recipe }, index) => (
              <RecipeCard key={index} recipe={recipe} {...getRandomColor()} />
            ))}

          {error && (
            <div className="text-center col-span-1 md:col-span-2 lg:col-span-3 text-red-500">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;

// const res = await fetch(`https://api.edamam.com/api/recipes/v2/?app_id${application_id}&app_key${application_key}&q=${searchQuery}&type=public`)
