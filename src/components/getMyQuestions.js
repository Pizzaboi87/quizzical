const getMyQuestions = (gameOptions) => {

    const {category, difficulty, type} = gameOptions;

    let categoryPiece = `&category=${category}`;
    let difficultyPiece = `&difficulty=${difficulty}`;
    let typePiece = `&type=${type}`;
    
    let API = `https://opentdb.com/api.php?amount=5${categoryPiece}${difficultyPiece}${typePiece}`;

    return fetch(API)
		.then(res => res.json())
		.then(data => data.results);
}

export default getMyQuestions;