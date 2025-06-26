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

        [HttpGet]
        public IActionResult AboutUS()
        {
            return View();
        }
    }
}
