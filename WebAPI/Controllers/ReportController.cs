
using Microsoft.AspNetCore.Mvc;
using Domain.Entities;
using Domain.Services;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReportController : ControllerBase
    {
        private readonly IReportService _reportService;

        public ReportController(IReportService reportService)
        {
            _reportService= reportService;
        }

        //[Route("test")]
        [HttpGet]
        public ActionResult<IEnumerable<Report>> Get()
        {
            var result = _reportService.GetAllReports();
            return Ok(result);
        }
    }
}