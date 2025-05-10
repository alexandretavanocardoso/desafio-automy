using automy.solution.Interfaces;
using automy.solution.Models;
using Microsoft.AspNetCore.Mvc;

namespace automy.solution.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KartodromoController : ControllerBase
    {
        private readonly IKartodromoService _kartodromoService;

        public KartodromoController(IKartodromoService kartodromoService)
        {
            _kartodromoService = kartodromoService;
        }

        /// <summary>
        /// Recover scheduled and previous batteries (races)et
        /// </summary>
        /// <param name="consultingDataRequest"></param>
        /// <returns></returns>
        [HttpGet("get-batterys")]
        public async Task<ActionResult<ConsultingData>> GetBattery([FromQuery] bool pastBatteriesQuery)
            => await _kartodromoService.GetBattery(pastBatteriesQuery);
    }
}
