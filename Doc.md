## Escreva aqui sua documentação
- Nome: Alexandre Tavano Cardoso
- CPF: 37948124845
- Email: tavanoalexandre@outlook.com
- Número: (14) 99907-4567
---

## Como utilizar o app

### Backend

- Compilar o projeto localhost, atumaticamente irá abrir o Swagger
- No endpoint "/api/kartodromo/get-batterys" clique em "Try it out"
- E selecione se é necessário buscar as baterias passadas com o combo disponível
- Clique em "Execute"
- Irá retornar a lista com os registros

### Teste Unitário
- Para testar: "Teste" -> "Executar todos os testes"
GetBattery_ShouldThrowException_WhenTokenServiceFails: Verifica se uma exceção é lançada quando o serviço de token falha.

### Frotend

---

## Explicação do endpoint
1. Recupera o token do usuário "fldoaogopdege" que está no "appsettings.json"
2. Recuperar as baterias que estão agendadas após o dia atual
3. Caso o parâmetro "pastBatteriesQuery" esteja "true" irá recuperar também as baterias anteriores ao dia atual
4. Retornar um objeto com 2 listas: Baterias Agendadas (Scheduled) e Baterias Anteriores (Past)

*OBS:* Parâmetros como: query, db, username, password, querys, estão tudo no "appsettings.json" para segurança dos dados sensíveis

---

## Funções disponíveis
- Endpoint: /api/kartodromo/get-batterys
- Verbo: GET
- Parâmetro: pastBatteriesQuery -> usada para saber se é necessário recuperar baterias passadas

---

## Processo de build e deploy
- Necessário apenas rodar o projeto localhost e testar.

---

## Objeto de retorno

```json
{
  "scheduled": [
    {
      "data_agendamento": "10/05/2025",
      "datetime_formulario": "24/04/2025 17:59:01",
      "email": "john.doe@gmail.com",
      "horario_agendamento": "20h",
      "nome": "John Doe",
      "qtde_pessoas": "25",
      "telefone": "5531991234567"
    },
    {
      "data_agendamento": "15/05/2025",
      "datetime_formulario": "05/05/2025 17:59:01",
      "email": "john.doe@gmail.com",
      "horario_agendamento": "20h",
      "nome": "John Doe",
      "qtde_pessoas": "10",
      "telefone": "5531991234567"
    },
    {
      "data_agendamento": "12/05/2025",
      "datetime_formulario": "06/05/2025 11:00:00",
      "email": "john.doe@gmail.com",
      "horario_agendamento": "20h",
      "nome": "John Doe",
      "qtde_pessoas": "20",
      "telefone": "5531991234567"
    },
    {
      "data_agendamento": "18/05/2025",
      "datetime_formulario": "09/05/2025 14:20:00",
      "email": "john.doe@gmail.com",
      "horario_agendamento": "18h",
      "nome": "John Doe",
      "qtde_pessoas": "18",
      "telefone": "5531991234567"
    }
  ],
  "past": [
    {
      "data_agendamento": "20/04/2025",
      "datetime_formulario": "16/04/2025 19:03:19",
      "email": "john.doe@gmail.com",
      "horario_agendamento": "20h",
      "nome": "John Doe",
      "qtde_pessoas": "12",
      "telefone": "5531991234567"
    },
    {
      "data_agendamento": "18/04/2025",
      "datetime_formulario": "15/04/2025 12:30:00",
      "email": "john.doe@gmail.com",
      "horario_agendamento": "19h",
      "nome": "John Doe",
      "qtde_pessoas": "8",
      "telefone": "5531991234567"
    },
    {
      "data_agendamento": "25/04/2025",
      "datetime_formulario": "20/04/2025 08:45:00",
      "email": "john.doe@gmail.com",
      "horario_agendamento": "21h",
      "nome": "John Doe",
      "qtde_pessoas": "15",
      "telefone": "5531991234567"
    }
  ]
}
```