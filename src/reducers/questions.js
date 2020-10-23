import { ADD_QUESTION, QUESTIONS_RECEIVED, ANSWER_QUESTION } from '../actions/questions'

const LOCAL_STORAGE_QUESTIONS_KEY = 'questions'

export default function questions(state = JSON.parse(localStorage.getItem(LOCAL_STORAGE_QUESTIONS_KEY)), action) {
    switch (action.type) {

        // get new questions data
        case QUESTIONS_RECEIVED: {
            const questions = {
                ...state,
                ...action.questions
            }
            localStorage.setItem(LOCAL_STORAGE_QUESTIONS_KEY, JSON.stringify(questions))
            return questions
        }

        // Insert a new question
        case ADD_QUESTION: {
            const questions = {
                ...state,
                [action.question.id]: action.question
            }
            localStorage.setItem(LOCAL_STORAGE_QUESTIONS_KEY, JSON.stringify(questions))
            return questions
        }

        // Save a new question answer
        case ANSWER_QUESTION: {
            const questions = {
                ...state,
                [action.qid]: {
                    ...state[action.qid],
                    [action.answer]: {
                        ...state[action.qid][action.answer],
                        votes: state[action.qid][action.answer].votes.concat(action.authedUser)
                    }
                }
            }
            localStorage.setItem(LOCAL_STORAGE_QUESTIONS_KEY, JSON.stringify(questions))
            return questions
        }
        default:
            return state
    }
}