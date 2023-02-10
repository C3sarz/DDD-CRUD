
using Microsoft.AspNetCore.Mvc;
using Domain.Entities;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FireLocationController : ControllerBase
    {

        private readonly ILogger<FireLocationController> _logger;

        public FireLocationController(ILogger<FireLocationController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetFireLocation")]
        public FireLocation Get()
        {
            return new FireLocation("Name","County");
        }
    }
}