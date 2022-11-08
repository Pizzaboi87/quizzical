import './App.css';
import { useState } from 'react';
import QuestionList from './components/QuestionList';

const App = () => {

  const [gameStart, setGameStart] = useState(false);
  const [chooseIt, setChooseIt] = useState(false);
  const [noQuestions, setNoQuestions] = useState(false);
  const [gameOptions, setGameOptions] = useState(
    {
      category: '',
      difficulty: '',
      type: ''
    }
  );

  const handleGameStart = () => {
    if (gameOptions.category === '' || gameOptions.difficulty === '' || gameOptions.type === '') setChooseIt(true)
    else setGameStart(prevState => !prevState);
  }

  const handleChoose = e => {
    const {name, value} = e.target;

    setGameOptions(prevState => {
      return {
        ...prevState,
        [name]: value
      }
    });
  }

  return (
    <main>
      {
        gameStart

        ?

				<section className="game--container">
					<QuestionList
						gameOptions={gameOptions}
						handleGameStart={handleGameStart}
						setNoQuestions={setNoQuestions}
          />
				</section>

        :

        <section className="game--intro">
          <h1 className="game--title">Quizzical Game</h1>
          <p className="game-instruction">Answer the questions to the best of your knowledge!</p>
          {	noQuestions &&
                <h4 className="noQuestions-text">
                  Unfortunately there's no any questions with these options! Sorry :(
                </h4>
          }
          <div className="options--container">
            <div className="select--container">
              <label className="label" htmlFor="category">Category:</label>
              <select
                name="category"
                id="category"
                className="selection"
                value={gameOptions.category}
                onChange={handleChoose}
              >
                <option value="">Any Category</option>
                <option value="9">General Knowledge</option>
                <option value="10">Entertainment: Books</option>
                <option value="11">Entertainment: Film</option>
                <option value="12">Entertainment: Music</option>
                <option value="13">Entertainment: Musicals &amp; Theatres</option>
                <option value="14">Entertainment: Television</option>
                <option value="15">Entertainment: Video Games</option>
                <option value="16">Entertainment: Board Games</option>
                <option value="17">Science &amp; Nature</option>
                <option value="18">Science: Computers</option>
                <option value="19">Science: Mathematics</option>
                <option value="20">Mythology</option>
                <option value="21">Sports</option>
                <option value="22">Geography</option>
                <option value="23">History</option>
                <option value="24">Politics</option>
                <option value="25">Art</option>
                <option value="26">Celebrities</option>
                <option value="27">Animals</option>
                <option value="28">Vehicles</option>
                <option value="29">Entertainment: Comics</option>
                <option value="30">Science: Gadgets</option>
                <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
                <option value="32">Entertainment: Cartoon &amp; Animations</option>
              </select>
            </div>
                
            <div className="select--container">
              <label className="label" htmlFor="difficulty">Difficulty:</label>
              <select
                name="difficulty"
                id="difficulty"
                className="selection"
                value={gameOptions.difficulty}
                onChange={handleChoose}
              >
                <option value="">Any Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
                
            <div className="select--container">
              <label className="label" htmlFor="type">Type of questions:</label>
              <select
                name="type"
                id="type"
                className="selection"
                value={gameOptions.type}
                onChange={handleChoose}
              >
                <option value="">Any Type</option>
                <option value="multiple">Multiple Choice</option>
                <option value="boolean">True / False</option>
              </select>
            </div>
          </div>

          <button className="main--button" onClick={handleGameStart}>Start Quiz</button>
          
          {chooseIt &&
            <h5 className='errortext'>
            Please select Category, Difficulty and Type!
            </h5>
          }

        </section>
      }
    </main>
  );
}

export default App;
