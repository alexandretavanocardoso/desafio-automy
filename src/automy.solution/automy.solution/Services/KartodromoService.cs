using automy.solution.Interfaces;
using automy.solution.Models;
using System.Text;
using System.Text.Json;

namespace automy.solution.Services
{
    public class KartodromoService : IKartodromoService
    {
        readonly ITokenService _tokenService;
        private readonly IConfiguration _configuration;
        private DateTime _tokenObtidoEm = DateTime.MinValue;

        public KartodromoService(ITokenService tokenService, IConfiguration configuration)
        {
            _tokenService = tokenService;
            _configuration = configuration;
        }

        public async Task<ConsultingData> GetBattery(bool pastBatteriesQuery)
        {
            var token = await GetValidTokenAsync();

            var scheduledBatteries = await Consulting(token.Message, _configuration.GetValue<string>("Data:ScheduledBatteriesQuery"));

            var pastBatteries = new List<ConsultingDataResponse>();
            if (pastBatteriesQuery)
                pastBatteries = await Consulting(token.Message, _configuration.GetValue<string>("Data:PastBatteriesQuery"));

            return new ConsultingData
            {
                Scheduled = scheduledBatteries,
                Past = pastBatteries
            };
        }

        private async Task<TokenResponse> GetValidTokenAsync()
        {
            if (_tokenObtidoEm == DateTime.MinValue || _tokenObtidoEm.AddMinutes(15) > DateTime.UtcNow)
            {
                _tokenObtidoEm = DateTime.UtcNow;
                return await _tokenService.GetTokenAsync();
            }
            else
            {
                _tokenObtidoEm = DateTime.UtcNow;
                var newToken = await _tokenService.GetTokenAsync();

                return newToken;
            }
        }

        private async Task<List<ConsultingDataResponse>> Consulting(string token, string query)
        {
            using var client = new HttpClient();

            client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);

            var jsonBody = JsonSerializer.Serialize(new
            {
                query = query,
                db = _configuration.GetValue<string>("Data:DB")
            });

            var content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

            var response = await client.PostAsync(_configuration.GetValue<string>("Data:URL"), content);
            response.EnsureSuccessStatusCode();

            var jsonResponse = await response.Content.ReadAsStringAsync();

            var batteries = JsonSerializer.Deserialize<List<ConsultingDataResponse>>(jsonResponse, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            return batteries;
        }
    }
}
