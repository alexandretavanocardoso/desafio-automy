namespace automy.solution.Models
{
    public class TokenResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; }

        public TokenResponse(bool success, string message)
        {
            Success = success;
            Message = message;
        }
    }
}
