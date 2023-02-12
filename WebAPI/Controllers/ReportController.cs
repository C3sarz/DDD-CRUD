
using Microsoft.AspNetCore.Mvc;
using Domain.Entities;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReportController : ControllerBase
    {

        private readonly ILogger<ReportController> _logger;

        public ReportController(ILogger<ReportController> logger)
        {
            _logger = logger;
        }

        //[Route("test")]
        [HttpGet]
        public ActionResult<IEnumerable<Report>> Get()
        {
            var result = new List<Report>
            {
                new Report("Name", "County")
            };
            return Ok(result);
        }
    }
}