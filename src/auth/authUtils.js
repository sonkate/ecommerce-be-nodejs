const jwt = require('jsonwebtoken');

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        const accessToken = jwt.sign(payload, publicKey, {
            algorithm: 'RS256',
            expiresIn: '2 days',
        });
        const refreshToken = jwt.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '7 days',
        });
        return { accessToken, refreshToken };
    } catch (error) {
        throw new Error(error);

    }
}

module.exports = {
    createTokenPair,
}