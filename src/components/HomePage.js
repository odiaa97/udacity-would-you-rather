import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = ({ authedUser }) => {
    return {
        authedUser
    }
}

function HomePage({ authedUser, message }) {
    if (authedUser) {
        return (
            <div className="text-center" style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%)'
            }}>
                <h1>Welcome to Would you rather website</h1>
                <h1></h1>
            </div>
        )
    } else {
        return <div></div>
    }
}

export default connect(mapStateToProps)(HomePage)
