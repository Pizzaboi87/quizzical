import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import getMyQuestions from "./getMyQuestions";
import Question from "./Question";

const QuestionList = (props) => {

    const [questionsArray, setQuestionsArray] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState("");
    const [showCheckButton, setShowCheckButton] = useState(false);

    const allAnswered = questionsArray.every(question => question.selectedAnswer !== "");

    useEffect(() => {
		getMyQuestions(props.gameOptions).then(questions => {
			if (questions.length === 0) {
				props.handleGameStart();
                props.setNoQuestions(true);
				return;
			} else {
                props.setNoQuestions(false)
            }
            return setQuestionsArray(questions.map(question => {
				return {
					...question,
                    id: nanoid(),
					selectedAnswer: "",
					showAnswer: false
				}
			}));
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

    const handleSelect = (id, answer) => {
		if (!gameOver) {
			setQuestionsArray(prevQuestionsArray => (
				prevQuestionsArray.map(question => (
					question.id === id
						? {...question, selectedAnswer: answer }
						: question
				))
			));
		}
	}

    const questionElements = questionsArray.map(question => (
		<Question
            key={question.id}
            id={question.id}
			question={question.question}
            correct={question.correct_answer}
            incorrect={question.incorrect_answers}
            handleSelect={handleSelect}
			selectedAnswer={question.selectedAnswer}
			showAnswer={question.showAnswer}
        />
    ));

    const checkAnswers = () => {
        if (allAnswered) {
            setGameOver(true)
            
            setQuestionsArray(prevState => (
                prevState.map(question => ({...question, showAnswer: true}))
            ))
        }
    }

    useEffect(() => {
        if (allAnswered && questionsArray.length !== 0){
            let correctAnswers = 0;
            questionsArray.forEach(question => {
                if (question.correct_answer === question.selectedAnswer) correctAnswers++;
            });
            setCorrectAnswers(correctAnswers);
            setShowCheckButton(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [questionsArray]);

    const newGame = () => {
        setShowCheckButton(false);
        setGameOver(false);
        props.setChooseIt(false);
        props.setNoQuestions(false);
        props.handleGameStart();
    }
    
    return(
        <div className='questionlist--container'>
            {questionElements}
            <div className="button--container">
                {gameOver && <h4>Your score: {correctAnswers} / 5</h4>}
                <button 
                    onClick={gameOver ? newGame : checkAnswers}
                    className={`main--button ${showCheckButton ? "button--check" : "button--disabled"}`}
                >
                    {gameOver ? "New Game" : "Show Answers"}
                </button>
            </div>
        </div>
    )
}

export default QuestionList;