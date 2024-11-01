const shopModel = require("../models/shop.model");
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN',
}
class AccessService {
    static signUp = async ({ email, password, name }) => {
        try {
            const shop = await shopModel.findOne({ email }).lean();
            if (shop) {
                return {
                    code: 400,
                    message: 'Shop already exists',
                    status: 'error',
                }
            }
            const hashPassword = await bcrypt.hash(password, 10);
            const newShop = await shopModel.create({ email, password: hashPassword, name, roles: [RoleShop.SHOP] });
            if (newShop) {
                // create privateKey and publicKey
                const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
                    modulusLength: 4096,
                    publicKeyEncoding: {
                        type: 'pkcs1',
                        format: 'pem'
                    }
                })
                // save publicKey to database
                const publicKeyString = await KeyTokenService.createKeyToken({ user: newShop._id, publicKey });
                if (!publicKeyString) {
                    return {
                        code: 400,
                        message: 'Create key token failed',
                        status: 'error',
                    }
                }
                // create access token and refresh token
                
                console.log('privateKey', privateKey);
                console.log('publicKey', publicKey);
            }
            return newShop;
        } catch (error) {
            return {
                code: 400,
                message: error.message,
                status: 'error',
            }
        }
    }
}

module.exports = AccessService;