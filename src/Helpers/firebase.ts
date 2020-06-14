
//Handle Sign In error
export const signInError = (error: string, email: string) => {
    if(error === 'auth/wrong-password') {
        return 'Password Incorrect.. Check and try again!'
    } else if(error === 'auth/user-not-found') {
        return `User with ${email} not registered.. Check email or Sign Up!`
    } else if(error === 'auth/weak-password') {
        return 'Password should be at least 6 characters long'
    } else if(error === 'auth/email-already-in-use') {
        return `User with ${email} already exist!`
    } else {
        return null;
    }
}


//Email Validation
export const isEmail = (email: any) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email.match(regEx)) return true;
    else return false;
}
