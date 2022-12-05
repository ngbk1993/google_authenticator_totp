# Java Script for google authenticator TOTP

This java script is running on Android HTTP Shortcuts App https://http-shortcuts.rmy.ch/ to generate the Time-Based One-Time Password (TOTP)  based on the timestamp and a base32 encoded secret key. The TOTP will be updated every 30 second.

## Secure Key
The key that being store in the java script var is in plain text, however if need to add the key to google authenticator, it needs to be encode to base32, using this link https://emn178.github.io/online-tools/base32_encode.html

## Reference
1) https://github.com/hectorm/otpauth