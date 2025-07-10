function logout(req, res) {
    res.clearCookie('cookie', { path: '/' });
    location.replace('http://localhost:3000');
    res.status(200).json({ message: 'Logout successful' });
}

module.exports = logout