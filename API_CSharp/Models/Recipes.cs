using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Recipes.Models
{
    public class Recipe
    {
        public string id { get; set; }
        [Required]
        public string name { get; set; }
        [Required]
        public string description { get; set; }
        [Required]
        public string type { get; set; }

        [Required]
        public string category { get; set; }

        [Required]
        public int preptime { get; set; }
        [Required]
        public int servings { get; set; }

        [Required]
        public int calories { get; set; }

        [Required]
        public string instructions { get; set; }

        [Required]
        public List<Ingredient> ingredients { get; set; }

    }

    public class Ingredient
    {
        [Required]
        public string name { get; set; }
        [Required]
        public float quantity { get; set; }

        public string unit { get; set; }
    }
}