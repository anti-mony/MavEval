using System.Collections.Generic;
using Recipes.Models;

namespace Recipes.Data
{

    public interface IRecipesRepo
    {
        IEnumerable<Recipe> getAllRecipies();
        Recipe getRecipeByid(string id, int servings);

        bool putRecipe(Recipe r);

    }

}