const express = require('express');
const router = express.Router();


router.post('/accept-cookies', (req, res) => {
    res.cookie('cookiesConsent', 'accept', { maxAge: 900000, httpOnly: true });
	res.redirect('/');
});

module.exports = router;
