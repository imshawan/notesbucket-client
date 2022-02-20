const ValidateEmail = (email) => {
    if (email.length < 10) return false
    // eslint-disable-next-line
    const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return filter.test(email)
  }

export {
    ValidateEmail
}