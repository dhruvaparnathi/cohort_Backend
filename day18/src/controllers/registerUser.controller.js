export async function registerUser(req, res, next){

    /*
    throwing err directly-> gives HTML response
    // throw new Error("Something went wrong");
    */

    try {
        throw new Error("Something went wrong in try block");
    } catch (err) {
        err.status = 500;
        next(err); //Passes err to error handling middleware
    }
}
