export function isTokenValid(decodedToken) {
    if (!decodedToken || !decodedToken.exp) {
        return false;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp > currentTime;
}