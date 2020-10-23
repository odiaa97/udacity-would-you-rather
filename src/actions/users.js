export const USERS_RECEIVED = 'USERS_RECEIVED'

export function usersReceived(users) {
    return {
        type: USERS_RECEIVED,
        users
    }
}
