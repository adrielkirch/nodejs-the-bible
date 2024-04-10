# Importing the Library

```const SecurityTools = require("@adrielkirch/security-basic-tools");```

# Usage of security functions

## Generating a UUID

```
const uuid = SecurityTools.generateUUID();
console.log(uuid);
```

## Generating a JWT

```
const userId = "user123";
const secretKey = "my_secret_key";
const token = SecurityTools.generateJwt(userId, secretKey);
console.log(token);
```

##  Decoding a JWT

```
const decodedUserId = SecurityTools.decodedJwt(token, secretKey);
console.log(decodedUserId);
```

## Hashing Data with Salt

```
const data = "password123";
const salt = "random_salt";
const hashedData = SecurityTools.generateHashWithSalt(data, salt);
console.log(hashedData);
```

## Encrypting and Decrypting Data

```
const dataToEncrypt = "sensitive_data";
const encryptionKey = "my_encryption_key";
const iv = Buffer.from("my_initialization_vector", "hex");

const encryptedData = SecurityTools.encryptAES(dataToEncrypt, encryptionKey, iv);
console.log(encryptedData);

const decryptedData = SecurityTools.decryptAES(encryptedData, encryptionKey, iv);
console.log(decryptedData);
```

## Rate Limiting HTTP Requests

```
const limiter = SecurityTools.httpLimiterByIp(10, 60, "Too many requests from this IP, please try again later.", false);
app.use(limiter);
```

## CORS Middleware

```
const corsMiddleware = SecurityTools.corsMiddleware();
app.use(corsMiddleware);
```

# License

This project is licensed under the MIT License - see the LICENSE file for details.