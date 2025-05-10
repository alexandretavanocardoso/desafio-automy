using automy.solution.Models;

namespace automy.solution.Interfaces
{
    public interface ITokenService
    {
        Task<TokenResponse> GetTokenAsync();
    }
}
