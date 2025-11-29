// middleware/auth.js

// Ensure the user is logged in
function ensureAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }

    req.flash('error_msg', 'You must be logged in to view this page');
    return res.redirect('/users/login'); // redirect to login page
}

// Ensure the logged-in user owns the resource
function ensureOwner(req, resourceUserId) {
    // If no user is logged in or no resource ID, deny access
    if (!req.session.user || !resourceUserId) {
        return false;
    }

    return req.session.user._id.toString() === resourceUserId.toString();
}

module.exports = {
    ensureAuthenticated,
    ensureOwner
};
