using Microsoft.AspNetCore.Mvc;

namespace Pizza_App.Controllers
{
    public class PizzaController : Controller
    {
        [HttpGet]
        public IActionResult HomePage()
        {
            return View();
        }

        [HttpGet]
        public IActionResult Menu()
        {
            return View();
        }

        [HttpGet]
        public IActionResult Cart()
        {
            return View();
        }

        [HttpPut]
        public IActionResult AddToCart([FromBody] object pizza)
        {
            if (pizza == null)
            {
                return BadRequest("Invalid pizza data.");
            }

            // Store pizza data temporarily in TempData
            TempData["Pizza"] = pizza;

            return Json(new { success = true, message = "Pizza added to cart" });
        }
    }
}
