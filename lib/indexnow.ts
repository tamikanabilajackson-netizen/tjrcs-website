// IndexNow verification key. Not a secret — search engines fetch it from
// KEY_LOCATION to verify we own the domain. If it ever changes, the key-file
// route folder (app/<key>.txt/) must be renamed to match.
export const INDEXNOW_KEY = '25a7d07e6edd47ac9804e2c52920bacb';

export const INDEXNOW_KEY_LOCATION = `https://tjrcs.net/${INDEXNOW_KEY}.txt`;
