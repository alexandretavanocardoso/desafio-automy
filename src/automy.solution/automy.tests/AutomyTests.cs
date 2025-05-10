using automy.solution.Interfaces;
using automy.solution.Models;
using automy.solution.Services;
using Microsoft.Extensions.Configuration;
using Moq;
using System.Text.Json;

namespace automy.tests
{
    public class AutomyTests
    {
        private readonly Mock<ITokenService> _mockTokenService;
        private readonly Mock<IConfiguration> _mockConfiguration;
        private readonly KartodromoService _kartodromoService;

        public AutomyTests()
        {
            _mockTokenService = new Mock<ITokenService>();
            _mockConfiguration = new Mock<IConfiguration>();
            _kartodromoService = new KartodromoService(_mockTokenService.Object, _mockConfiguration.Object);
        }

        // Arrange (preparar) - Configura o ambiente necessário para o teste.
        // Act (agir) - Chama o método que está sendo testado, ou seja, você executa a ação que está sendo testada.
        // Assert (verificar) - Verifica se o resultado obtido após a execução do método corresponde ao comportamento esperado, ou seja, faz as comparações entre o que foi retornado e o que deveria ser retornado.

        [Fact]
        public async Task GetBattery_ShouldThrowException_WhenTokenServiceFails()
        {
            _mockTokenService.Setup(s => s.GetTokenAsync()).ThrowsAsync(new Exception("Token service failed"));

            var exception = await Assert.ThrowsAsync<Exception>(() => _kartodromoService.GetBattery(pastBatteriesQuery: false));
            Assert.Equal("Token service failed", exception.Message);
        }
    }
}
