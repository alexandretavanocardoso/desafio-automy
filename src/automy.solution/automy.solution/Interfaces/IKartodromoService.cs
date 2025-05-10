using automy.solution.Models;

namespace automy.solution.Interfaces
{
    public interface IKartodromoService
    {
        Task<ConsultingData> GetBattery(bool pastBatteriesQuery);
    }
}
