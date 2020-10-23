import { SET_AUTHED_USER } from '../actions/authedUser'
import { ADD_QUESTION, ANSWER_QUESTION } from '../actions/questions'

const LOCAL_STORAGE_AUTHED_USER_KEY = 'authedUser'

export default function authedUser(state = JSON.parse(localStorage.getItem(LOCAL_STORAGE_AUTHED_USER_KEY)), action) {
    switch (action.type) {

        // User login
        case SET_AUTHED_USER:
            const user = action.user
            if (user) {
                localStorage.setItem(LOCAL_STORAGE_AUTHED_USER_KEY, JSON.stringify(user))
            } else {
                localStorage.removeItem(LOCAL_STORAGE_AUTHED_USER_KEY)
            }
            return user

        // New question insertion
        case ADD_QUESTION:
            return {
                ...state,
                questions: state.questions.concat([
                    action.question.id
                ])
            }

        // New answer insertion
        case ANSWER_QUESTION:
            return {
                ...state,
                answers: {
                    ...state.answers,
                    [action.qid]: action.answer
                }
            }
        default:
            return state
    }
}