import { USERS_RECEIVED } from '../actions/users'

const LOCAL_STORAGE_USERS_KEY = 'users'

// User login.
export default function authedUser(state = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USERS_KEY)), action) {
    switch (action.type) {
        case USERS_RECEIVED:
            const users = action.users
            localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(users))
            return users
        default:
            return state
    }
}
