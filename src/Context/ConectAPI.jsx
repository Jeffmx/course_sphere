const BASE_URL = 'http://localhost:3000'

export const getFromApi = async (endpoint) => {
  const res = await fetch(`${BASE_URL}/${endpoint}`)
  if (!res.ok) throw new Error("Erro ao buscar dados")
  return await res.json()
}

export const postToApi = async (endpoint, body) => {
  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  if (!res.ok) throw new Error("Erro ao enviar dados")
  return await res.json()
}

export const removeFromApi = async (endpoint, id) => {
  console.log(`${BASE_URL}/${endpoint}/${id}`);
  
  const res = await fetch(`${BASE_URL}/${endpoint}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erro ao deletar");
  return true;
};

export const updateToApi = async (endpoint, id, body) => {
  const res = await fetch(`${BASE_URL}/${endpoint}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Erro ao atualizar dados");
  return await res.json();
}
