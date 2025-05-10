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

### Frontend
- Tela inicial simples, contendo:
  - 2 abas "BATERIAS AGENDADAS" e "BATERIAS ANTERIORES", para filtrar as baterias anteriores é necessário marcar o checkbox "Trazer corridas anteriores"
- Para filtrar basta clicar em "Pesquisar"

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
- Backend: Compilar normalmente no Visual Studio, caso for no VS Code, rodar "dotnet run"
- Frontend: "yarn i" (para baixar dependências) -> "yarn dev" (para rodar aplicação)

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
    }
  ],
  "past": [
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
    }
  ]
}
```

### Google Sheet
- https://1drv.ms/x/c/7e6eb5fda2216305/Ee4e4MxrTw9CiuCAl_YbCPcBSRD1DfzCEbebLuxPrt2dmg?e=KgUMtM
