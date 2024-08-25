import { DateTime } from 'luxon';

function getPayloadFromLocalStorage(nameLocalStorage) {
    const token = localStorage.getItem(nameLocalStorage);
    if (token) {
        return JSON.parse(window.atob(token.split('.')[1].replace('-', '+').replace('_', '/')));
    }
    return null;
}

function getPayloadFromRaw(token) {
    if (token) {
        return JSON.parse(window.atob(token.split('.')[1].replace('-', '+').replace('_', '/')));
    }
    return null;
}

function verifyExpirationTokenFromLocalStorage(nameLocalStorage) {
    const token = getPayloadFromLocalStorage(nameLocalStorage);
    if (!token) {
        return false;
    } else {
        const expiration = +(token.exp + '000');
        if (DateTime.fromMillis(expiration).diff(DateTime.now()).toMillis() <= 0) {
            return false;
        } else {
            return true;
        }
    }
}

function verifyExpirationTokenInitToTime(token, minutes) {
    if (!token) {
        return false;
    } else {
        const creation = +(token.iat + '000');
        if (DateTime.now().diff(DateTime.fromMillis(creation)).toMillis() > minutes * 60000) {
            return false;
        } else {
            return true;
        }
    }
}

export {
    getPayloadFromLocalStorage,
    verifyExpirationTokenFromLocalStorage,
    getPayloadFromRaw,
    verifyExpirationTokenInitToTime
};