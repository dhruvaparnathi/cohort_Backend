export async function registerUser(req, res, next) {
    try {
        const { username, email, password } = req.body;

        res.status(201).json({
            message: "User registered successfully",
            data: { username, email }
        });

    } catch (err) {
        err.status = 500;
        next(err);
    }
}