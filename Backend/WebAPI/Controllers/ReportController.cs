
using Microsoft.AspNetCore.Mvc;
using Domain.Entities;
using Domain.Services;
using FluentValidation;

namespace API.Controllers
{
    /// <summary>
    /// Web API that handles all relevant HTTP commands.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class ReportController : ControllerBase
    {
        private readonly IReportService _reportService;

        public ReportController(IReportService reportService)
        {
            _reportService = reportService;
        }

        [HttpGet(Name = "GetAll")]
        public ActionResult<IEnumerable<ReportAggregate>> Get()
        {
            try
            {
                var result = _reportService.GetAllReports();
                return Ok(result);
            }
            catch
            {
                return StatusCode(500);
            }
        }

        [HttpGet("{id}")]
        public ActionResult<ReportAggregate> Get(int id)
        {
            try
            {
                var result = _reportService.GetReport(id);
                if (result == null) { return NotFound(); }
                return Ok(result);
            }
            catch
            {
                return StatusCode(500);
            }

        }

        [HttpPost]
        public ActionResult Post([FromBody] ReportAggregate report)
        {
            try
            {
                _reportService.CreateReport(report);
                return StatusCode(StatusCodes.Status201Created);
            }
            catch (ValidationException ex)
            {
                return BadRequest(ex.Errors);
            }
            catch
            {
                return StatusCode(500);
            }
        }

        [HttpPut]
        public ActionResult Put([FromBody] ReportAggregate report)
        {
            try
            {
                _reportService.UpdateReport(report);
                return StatusCode(StatusCodes.Status200OK);
            }
            catch (ValidationException ex)
            {
                return BadRequest(ex.Errors);
            }
            catch
            {
                return StatusCode(500);
            }
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                if (_reportService.DeleteReport(id))
                {
                    return StatusCode(StatusCodes.Status200OK);
                }
                return NotFound();
            }
            catch
            {
                return StatusCode(500);
            }
        }
    }
}