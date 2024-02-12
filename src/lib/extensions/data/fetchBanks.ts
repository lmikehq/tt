async function getBankNames() {
  const response = await fetch(`/api`);

  return response.json();
}

export default getBankNames;