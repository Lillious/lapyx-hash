    import * as crypto from 'crypto';

    export { hash };

    function hash(password) {
        const [hashedPassword, numberValue, sum] = getHash(password);
        const hash = crypto.createHash('sha512')
            .update(sum + hashedPassword)
            .digest('hex');
        const middle = Math.ceil(hash.length / 2);
        const prefix = hash.slice(0, middle);
        const suffix = hash.slice(middle);
        const salt = crypto.createHash('sha512')
            .update(prefix + numberValue)
            .digest('hex')
        const result = `L${salt}A${prefix}P${hashedPassword}Y${suffix}X`;
        return result;
    }

    function getHash(password) {
        const bytes = 512;
        const hash = crypto.createHash('sha512')
            .update(password)
            .digest('hex');
        let numberValue = hash.replace(/[a-z]/g, '');
        Array.from(numberValue);
        numberValue = Object.assign([], numberValue);
        const sum = numberValue.reduce( (acc, curr, i)  => acc + i, 0  )
        return [hash, numberValue, sum];
    }