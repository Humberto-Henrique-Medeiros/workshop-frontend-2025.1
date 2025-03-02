document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.querySelector('.form');
    const searchInput = document.querySelector('.input');
    const pokemonImage = document.querySelector('.pokemon-imagem');
    const pokemonName = document.querySelector('.pokemon-name');
    const backButton = document.querySelector('.btn-voltar');
    const nextButton = document.querySelector('.btn-proximo');
    
    let pokemonCards = []; 
    let currentCardIndex = 0; 
    
    const fetchPokemonCards = async (pokemonName) => {


        try {
            
            const response = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${pokemonName}`);
            const data = await response.json();

            if (data.data.length > 0) {
                pokemonCards = data.data; 
                currentCardIndex = 0; 
                displayCardInfo(pokemonCards[currentCardIndex]); // Exibe a primeira carta
            } else {
                alert('Nenhuma carta encontrada para esse Pokémon!');
            }
        } catch (error) {
            console.error('Erro ao buscar dados da carta:', error);
            
}};

    //  (nome e imagem)
    const displayCardInfo = (card) => {
        const { name, id, images } = card;
        pokemonImage.src = images.small; // Exibe a imagem da carta
        pokemonName.textContent = name;  // Exibe o nome do Pokémon
        
    };

    
    const handleSearchSubmit = (event) => {
        event.preventDefault(); 
        const searchTerm = searchInput.value.trim(); 

        if (searchTerm) {
            fetchPokemonCards(searchTerm); // Busca as cartas do Pokémon
        } else {
            alert('Por favor, insira o nome do Pokémon.');
        }
    };

    // Mudar de  carta
    const showNextCard = () => {
        if (pokemonCards.length > 0) {
            currentCardIndex = (currentCardIndex + 1) % pokemonCards.length;
            displayCardInfo(pokemonCards[currentCardIndex]); // para atualizar a carta
        }
    };

    
    const showPreviousCard = () => {
        if (pokemonCards.length > 0) {
      
            currentCardIndex = (currentCardIndex - 1 + pokemonCards.length) % pokemonCards.length;
            displayCardInfo(pokemonCards[currentCardIndex]); 
        }
    };

    searchForm.addEventListener('submit', handleSearchSubmit);
    nextButton.addEventListener('click', showNextCard);
    backButton.addEventListener('click', showPreviousCard);

    
});
