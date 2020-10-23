import { _getUsers, _getQuestions, _saveQuestion, _saveQuestionAnswer } from './_DATA'

export async function getUsers() {
    return await _getUsers()
}

export async function getQuestions() {
    return await _getQuestions()
}

export async function saveQuestion(question) {
    return await _saveQuestion(question)
}

export async function saveQuestionAnswer(answer) {
    return await _saveQuestionAnswer(answer)
}
