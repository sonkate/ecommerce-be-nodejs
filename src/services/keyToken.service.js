const keyTokenModel = require("../models/keyToken.model");

class KeyTokenService {
    static createKeyToken = async ({ user, publicKey }) => {
        try {
            const publicKeyString = publicKey.toString();
            const token = await keyTokenModel.create(
                { user, publicKey: publicKeyString }
            );
            return token ? token.publicKey : null;
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = KeyTokenService;