using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Recipes.Models;
using Recipes.Data;
using Elasticsearch.Net;

namespace Recipes.Controllers
{
    [Route("/api/c/recipies/")]
    [ApiController]
    public class RecipesController : ControllerBase
    {
        private readonly IRecipesRepo _repository;

        public RecipesController(IRecipesRepo repository)
        {
            _repository = repository;
        }
        [HttpGet]
        public ActionResult<IEnumerable<Recipe>> getAll()
        {
            try
            {
                var items = _repository.getAllRecipies();
                return Ok(items);
            }
            catch (ElasticsearchClientException e)
            {
                if (e.ToString().Contains("404"))
                {
                    return StatusCode(404);
                }
                return StatusCode(400);
            }
            catch (System.Exception e)
            {
                return StatusCode(500);
            }
        }


        [HttpGet("{id}")]
        public ActionResult<Recipe> getOne(string id, [FromQuery] int servings)
        {
            try
            {
                var item = _repository.getRecipeByid(id, servings);
                return Ok(item);
            }
            catch (ElasticsearchClientException e)
            {
                if (e.ToString().Contains("404"))
                {
                    return StatusCode(404);
                }
                return StatusCode(400);
            }
            catch (System.Exception e)
            {
                return StatusCode(500);
            }

        }

        [HttpPost]
        public ActionResult<bool> putRecipe([FromBody] Recipe r)
        {
            try
            {
                var item = _repository.putRecipe(r);
                return Ok(item);
            }
            catch (ElasticsearchClientException e)
            {
                return StatusCode(400);
            }
            catch (System.Exception e)
            {
                return StatusCode(500);
            }
        }

    }
}