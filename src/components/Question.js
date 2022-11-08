import { decode } from 'html-entities';
import { nanoid } from 'nanoid';

const Question = (props) => {

    let incorrect = props.incorrect.map(answer => {
        const className = `${props.selectedAnswer === answer ? "question-btn-selected" : "question-btn"}`

        return(
            <button
                key={nanoid()}
                onClick={() => props.handleSelect(props.id, answer)}
                className={className}
            >
                {decode(answer)}
            </button>
        )
    });

    const className= `${props.selectedAnswer === props.correct ? "question-btn-selected" : "question-btn"}`
    let correct = 
        <button 
            key={nanoid()}
            onClick={() => props.handleSelect(props.id, props.correct)}
            className={className}
        >
            {decode(props.correct)}
        </button>

    incorrect.push(correct);
    
    const possibleAnswers = incorrect.sort((a, b) => (
		a.props.children.localeCompare(b.props.children)));

    return(
        <div>
            <p>{decode(props.question)}</p>
            {possibleAnswers}
        </div>
    )
}

export default Question;