const BASE_URL = 'https://json-server-omega-gilt.vercel.app/'

export const getFromApi = async (endpoint) => {
  console.log(`Buscando dados de: ${BASE_URL}/${endpoint}`);
  
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
