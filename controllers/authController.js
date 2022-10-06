module.exports = {
    loginPage: async (req, res) => {
        res.render("login", { success: null, message: null });
    },
    signUpPage: async (req, res) => {
        res.render("signup", { success: null, message: null });
    }
}