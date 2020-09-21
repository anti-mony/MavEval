using System.Collections.Generic;
using Recipes.Models;
using Nest;
using Elasticsearch.Net;

namespace Recipes.Data
{
    public class RecipesRepo : IRecipesRepo
    {
        private readonly IElasticClient _context;

        public RecipesRepo(IElasticClient context)
        {
            _context = context;
        }
        public IEnumerable<Recipe> getAllRecipies()
        {
            var response = _context.Search<Recipe>(s => s.MatchAll());
            var recipes = new List<Recipe>();

            if (!response.IsValid)
            {
                throw new ElasticsearchClientException("Invalid Request / Nothing Found");
            }

            foreach (IHit<Recipe> hit in response.Hits)
            {
                var recipe = hit.Source;
                recipe.id = hit.Id;
                recipes.Add(recipe);
            }
            return recipes;

        }

        public Recipe getRecipeByid(string id)
        {
            var recipe = _context.Get<Recipe>(id);
            if (!recipe.IsValid)
            {
                throw new ElasticsearchClientException("Invalid Request / Nothing Found");
            }
            return recipe.Source;
        }

        public bool putRecipe(Recipe r)
        {
            var response = _context.IndexDocument<Recipe>(r);
            if (!response.IsValid)
            {
                throw new ElasticsearchClientException("Invalid Request / Nothing Found");
            }
            return true;
        }
    }
}