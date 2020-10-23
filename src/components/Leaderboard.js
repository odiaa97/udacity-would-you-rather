import React, { useEffect, Fragment } from 'react'
import { getUsers }  from '../api'
import { ListGroup, Spinner, Figure } from 'react-bootstrap'
import { connect } from 'react-redux'
import { usersReceived } from '../actions/users'

const mapStateToProps = ({ users }) => {
    return {
        users
    }
}

function UserProfile({ user }) {
    const questions = user.questions.length
    const answers = Object.keys(user.answers).length
    const totalVotes = questions + answers
    return (
        <Fragment>
            <Figure.Image width={50} height={50} src={user.avatarURL} roundedCircle thumbnail className="mr-2"/>
            {user.name} ({user.id})
            <br/>
            Total Votes: {totalVotes}
            <br/>
            Questions shared: {questions}
            <br/>
            Questions answered: {answers}
        </Fragment>
    )
}

// Leaderboard function fetch users questions and answers data 
function Leaderboard({ users, usersReceived }) {
    useEffect(() => {
        async function fetchData() {
            const questions = await getUsers()
            usersReceived(questions)
        }
        if (users === null) {
            fetchData()
        }
    })
    if (users == null) {
        return (
            <div className="text-center mt-4">
                <Spinner animation="border"/>
            </div>
        )
    }
    // Sorting users data from highest votes to lowest
    const usersArray = Object.keys(users).map(userId => users[userId])
        .sort((user1, user2) => {
            return (Object.keys(user2.answers).length + user2.questions.length) - (Object.keys(user1.answers).length + user1.questions.length)
        })
    return (
        <ListGroup variant="secondary">
            {usersArray.map(user => (
                <ListGroup.Item key={user.id}>
                    <UserProfile user={user}/>
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}

export default connect(mapStateToProps, { usersReceived })(Leaderboard)