import os from 'os';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';


export class TempFileManager {
    constructor(resources, meta = null) {
    }
    createTempFile({ postfix, dir, }) {
        const randomString = crypto.randomBytes(12).toString('hex');
        const tempFileName = `${randomString}.${postfix}`;
        const tempFilePath = path.join(dir, tempFileName);
        const fd = fs.openSync(tempFilePath, 'w');
        const cleanupCallback = () => {
            fs.unlinkSync(tempFilePath);
        };
        return ({ tempFilePath, fd, cleanupCallback });
    }

    createTempDirectory({ dir }) {
        const randomString = crypto.randomBytes(12).toString('hex');
        const tempDirectoryName = `${randomString}`;
        const tempDirectoryPath = path.join(dir, tempDirectoryName);
        const fd = fs.openSync(tempDirectoryPath, 'w');
        const cleanupCallback = () => {
            fs.rmdirSync(tempDirectoryPath);
        };
        return ({ tempDirectoryPath , fd, cleanupCallback});
    }
}

