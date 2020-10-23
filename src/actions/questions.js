export const ADD_QUESTION = 'ADD_QUESTION'
export const QUESTIONS_RECEIVED = 'QUESTIONS_RECEIVED'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'

export function questionsReceived(questions) {
    return {
        type: QUESTIONS_RECEIVED,
        questions
    }
}

export function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

export function answerQuestion({ qid, answer, authedUserId }) {
    return {
        type: ANSWER_QUESTION,
        qid,
        answer,
        authedUserId,
    }
}
