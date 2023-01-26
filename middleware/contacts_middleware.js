const validatePost = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return next(res.status(400).json(`"message":${error.message}`));
        }
        return next();
    }
};

const validatePut = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return next(res.status(400).json(`"message":${error.message}`));
        }
        else if (Object.keys(req.body).length === 0) {
            return next(res.status(400).json(`"message": "missing fields"`))
        }
        return next();
    }
};

const validatePatch = (schema) => {
    return (req, res, next) => {
        if (req.body.favorite === undefined) {
            return next(res.status(400).json(`"message": "missing field favorite"`))
        }
        return next();
    }
};

module.exports = {
    validatePost,
    validatePut,
    validatePatch
}