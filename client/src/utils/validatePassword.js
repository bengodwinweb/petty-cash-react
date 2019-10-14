const re = new RegExp('/^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$');

export default password => {
  if (!re.test(password)) {
    return 'Password must contain eight characters, including at least one uppercase letter, one lowercase letter and one number';
  }
};
