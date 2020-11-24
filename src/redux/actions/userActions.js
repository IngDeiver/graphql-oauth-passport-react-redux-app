// Actions creators
const userLogin = (provider) => {

    //login user with API GraphQL 
    const userAuth = {username:"Fake user", access_token:"token_string"}

    // return action
    return {
        type:"user/userLogin",
        payload:userAuth
    }
}

const userLogout = () => {
    // Remove auth from local storage
    return {
        type:"user/userLogout",
        payload:{}
    }
}

export {
    userLogin,
    userLogout
}