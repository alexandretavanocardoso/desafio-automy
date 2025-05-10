import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7190/api',
});

export interface Battery {
    data_agendamento: string;
    datetime_formulario: string;
    email: string;
    horario_agendamento: string;
    nome: string;
    qtde_pessoas: string;
    telefone: string;
}

export interface BatteriesResponse {
    scheduled: Battery[];
    past: Battery[];
}

export const getBatteries = async (pastBatteriesQuery: boolean = true): Promise<BatteriesResponse> => {
    const response = await api.get<BatteriesResponse>(`/kartodromo/get-batterys?pastBatteriesQuery=${pastBatteriesQuery}`);
    return response.data;
};

export default api; 