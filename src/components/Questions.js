import React, { useEffect } from 'react'
import { getQuestions }  from '../api'
import { questionsReceived } from '../actions/questions'
import { connect } from 'react-redux'
import { Tabs, Tab, ListGroup, Spinner } from 'react-bootstrap'
import Question from './Question'

const mapStateToProps = ({ authedUser, questions }) => {
    return {
        authedUser,
        questions,
    }
}

function Questions({authedUser, questions, questionsReceived}) {
    useEffect(() => {
        async function fetchData() {
            const questions = await getQuestions()
            questionsReceived(questions)
        }
        if (questions === null) {
            fetchData()
        }
    })
    if (questions == null) {
        return (
            <div className="text-center mt-4">
                <Spinner animation="border"/>
            </div>
        )
    }
    const questionsArray = Object.keys(questions).map(questionId => questions[questionId]).sort((question1, question2) => question2.timestamp - question1.timestamp)
    const filterQuestions = (question) => {
        if (!authedUser) {
            return false
        }
        return Object.keys(authedUser.answers).includes(question.id)
    }
    const unanswerQuestions = questionsArray.filter((question) => !filterQuestions(question))
    const answeredQuestions = questionsArray.filter((question) => filterQuestions(question))
    return (
        <Tabs defaultActiveKey="unanswer">
            <Tab eventKey="unanswer" title={`Unanswer Questions (${unanswerQuestions.length})`}>
                <ListGroup variant="flush">
                    {unanswerQuestions.map(question => (
                        <ListGroup.Item key={question.id}>
                            <Question question={question}/>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Tab>
            <Tab eventKey="answered" title={`Answered Questions (${answeredQuestions.length})`}>
                <ListGroup variant="flush">
                    {answeredQuestions.map(question => (
                        <ListGroup.Item key={question.id}>
                            <Question question={question} showTotalVotes={false}/>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Tab>
        </Tabs>
    )
}

export default connect(mapStateToProps, { questionsReceived })(Questions)