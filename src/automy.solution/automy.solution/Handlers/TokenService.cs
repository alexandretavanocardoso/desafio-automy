using automy.solution.Interfaces;
using automy.solution.Models;
using System.Text;
using System.Text.Json;

namespace automy.solution.Handlers
{
    public class TokenService : ITokenService
    {

        private readonly IConfiguration _configuration;

        public TokenService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<TokenResponse> GetTokenAsync()
        {
            using var client = new HttpClient();

            var jsonBody = JsonSerializer.Serialize(new
            {
                username = _configuration.GetValue<string>("Token:Username"),
                password = _configuration.GetValue<string>("Token:Password")
            });
            var content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

            try
            {
                var response = await client.PostAsync(_configuration.GetValue<string>("Token:URL"), content);
                response.EnsureSuccessStatusCode();

                var jsonResponse = await response.Content.ReadAsStringAsync();

                using var doc = JsonDocument.Parse(jsonResponse);
                var token = doc.RootElement.GetProperty("token").GetString();

                return new TokenResponse(true, token);
            }
            catch (Exception ex)
            {
                return new TokenResponse(false, "Error getting the token.");
            }
        }
    }
}
