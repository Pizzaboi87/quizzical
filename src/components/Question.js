import { decode } from 'html-entities';
import { nanoid } from 'nanoid';

const Question = (props) => {

    let incorrect = props.incorrect.map(answer => {
        const className = 
            `${props.selectedAnswer === answer ? "answer--selected" : "answer--original"}
             ${(props.showAnswer && props.selectedAnswer === answer) && "answer--incorrect"}`

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

    const className= 
        `${props.selectedAnswer === props.correct ? "answer--selected" : "answer--original"}
         ${props.showAnswer && "answer--correct"}`
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
        <div className='question--container'>
            <p className='question'>{decode(props.question)}</p>
            {possibleAnswers}
        </div>
    )
}

export default Question;