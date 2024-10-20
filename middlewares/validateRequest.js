const validateRequest = (schema, callback = "") => {
    const requestFunc = async (req, res, next) => {
        try {
            await schema.parseAsync({
                body: req.body
            });
            if (callback !== "") callback({
                success: true
            })
            return next();
        } catch (err) {
            if (callback !== "") callback({
                success: false,
                req,
                res
            });
            next(err);
        }
    }
    return requestFunc;
}

module.exports = validateRequest;