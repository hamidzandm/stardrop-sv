const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

//Fetch Characters
async function fetchCharacters() {
    try {
      if (!apiDomain) {
        return [];
      }
      
      const res = await fetch(`${apiDomain}/characters`);
  
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
  
      return await res.json();
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  // Fetch Single Character
  async function fetchCharacter(id) {
    try {
      if (!apiDomain) {
        return null;
      }
      
      const res = await fetch(`${apiDomain}/characters/${id}`);
  
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
  
      return await res.json();
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  export {fetchCharacters, fetchCharacter}