
const API_URL = 'http://localhost:8080'; // Endereço da sua API

// Função para fazer uma requisição GET
export const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Se necessário, adicione cabeçalhos como o Authorization (JWT)
        // 'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    return data; // Retorna os dados da API
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Função para fazer uma requisição POST
export const postData = async (endpoint, body) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body) // Corpo da requisição
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};



// Outras funções para PUT, DELETE, etc., podem ser adicionadas de forma similar.
