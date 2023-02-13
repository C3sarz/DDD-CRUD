
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

        [HttpGet(Name = "GetAll")]
        public ActionResult<IEnumerable<Report>> Get()
        {
            var result = _reportService.GetAllReports();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public ActionResult<Report> Get(int id)
        {
            var result = _reportService.GetReport(id);
            if (result == null) { return NotFound(); }
            return Ok(result);
        }

        [HttpPost]
        public ActionResult Post([FromBody] Report report)
        {
            _reportService.CreateReport(report);
            return StatusCode(StatusCodes.Status201Created);
        }

        [HttpPut]
        public ActionResult Put([FromBody] Report report)
        {
            _reportService.UpdateReport(report);
            return StatusCode(StatusCodes.Status200OK);
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
           _reportService.DeleteReport(id);
            return StatusCode(StatusCodes.Status200OK);
        }
    }
}