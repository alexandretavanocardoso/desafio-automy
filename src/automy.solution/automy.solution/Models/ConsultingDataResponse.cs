using System.Text.Json.Serialization;

namespace automy.solution.Models
{
    public class ConsultingDataResponse
    {
        [JsonPropertyName("data_agendamento")]
        public string? DataAgendamento { get; set; }

        [JsonPropertyName("datetime_formulario")]
        public string? DatetimeFormulario { get; set; }

        [JsonPropertyName("email")]
        public string? Email { get; set; }

        [JsonPropertyName("horario_agendamento")]
        public string? HorarioAgendamento { get; set; }

        [JsonPropertyName("nome")]
        public string? Nome { get; set; }

        [JsonPropertyName("qtde_pessoas")]
        public string? QtdePessoas { get; set; }

        [JsonPropertyName("telefone")]
        public string? Telefone { get; set; }
    }

    public class ConsultingData
    {
        public List<ConsultingDataResponse>? Scheduled { get; set; }
        public List<ConsultingDataResponse>? Past { get; set; }
    }
}
