import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import getMyQuestions from "./getMyQuestions";
import Question from "./Question";

const QuestionList = (props) => {

    const [questionsArray, setQuestionsArray] = useState([]);

    useEffect(() => {
		getMyQuestions(props.gameOptions).then(questions => {
			if (questions.length === 0) {
				props.handleGameStart();
				return;
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
		//if (!isGameOver) {
			setQuestionsArray(prevQuestionsArray => (
				prevQuestionsArray.map(question => (
					question.id === id
						? {...question, selectedAnswer: answer }
						: question
				))
			));
		//}
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
			//showAnswer={question.showAnswer}
        />
    ));

    console.log(questionsArray)
    
    return(
        <div>
            <h1>Questions</h1>
            {questionElements}
        </div>
    )
}

export default QuestionList;