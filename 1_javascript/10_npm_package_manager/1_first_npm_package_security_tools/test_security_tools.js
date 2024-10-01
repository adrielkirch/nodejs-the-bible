const assert = require("assert");
const SecurityTools = require("./security_tools");

class TestSecurityTools {
  constructor() {
    this.userId = "";
    this.secretJwtKey = "MySecretJwtKey";
    this.jwtToken = "";
    this.salt = "MySalt";
    this.data = "MyData";
    this.iv = "A6A6A6A6A6A6A6A6";
    this.aesData = "MySecretAesToBeEncrypted";
    this.secretAesKey = "MySecretAesKey";
  }

  testGenerateUUID() {
    const uuid = SecurityTools.generateUUID();
    const uuidPattern =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const isMatch = uuidPattern.test(uuid);
    assert.strictEqual(isMatch, true, "UUID format is invalid!");

    if (isMatch) {
      console.log("generateUUID() has passed in test\n");
    }
  }

  testGenerateJwt() {
    this.userId = SecurityTools.generateUUID();
    const token = SecurityTools.generateJwt(this.userId, this.secretJwtKey);
    this.jwtToken = token;
    const tokenLength = token.length;
    const isValidToken = tokenLength > 64;
    assert.strictEqual(isValidToken, true, "JWT Token is invalid!");

    if (isValidToken) {
      console.log("generateJwt() has passed in test\n");
    }
  }

  testDecodedJwt() {
    this.userId = SecurityTools.generateUUID();
    const token = SecurityTools.generateJwt(this.userId, this.secretJwtKey);
    this.jwtToken = token;
    const data = SecurityTools.decodedJwt(this.jwtToken, this.secretJwtKey);
    const isSameUserId = data.user === this.userId;
    assert.strictEqual(isSameUserId, true, "JWT Token is invalid!");
    if (isSameUserId) {
      console.log("decodedJwt() has passed in test\n");
    }
  }

  testGenerateHashWithSalt() {
    const token = SecurityTools.generateHashWithSalt(this.data, this.salt);
    const tokenLength = token.length;
    const isValidToken = tokenLength === 128;
    assert.strictEqual(isValidToken, true, "SHA-512 is invalid!");
    if (isValidToken) {
      console.log("generateHashWithSalt() has passed in test\n");
    }
  }

  testGenerateHashDigitalSignature() {
    const token = SecurityTools.generateHashDigitalSignature();
    const tokenLength = token.length;
    const isValidToken = tokenLength === 128;

    assert.strictEqual(isValidToken, true, "SHA-512 is invalid!");

    if (isValidToken) {
      console.log("generateHashDigitalSignature() has passed in test\n");
    }
  }

  testGenerateRandomBytes() {
    const size = 64;
    const randomBytes = SecurityTools.generateRandomBytes(size);
    const randomBytesLength = randomBytes.length;
    const isValidRandomBytes = size * 2 === randomBytesLength;

    assert.strictEqual(
      isValidRandomBytes,
      true,
      "Random bytes generated is invalid!"
    );

    if (isValidRandomBytes) {
      console.log("generateRandomBytes() has passed in test\n");
    }
  }

  testGenerateRandomNumber() {
    const size = 8;
    const randomNumber = SecurityTools.generateRandomNumber(size);
    const randomNumberLength = randomNumber.length;
    const isValidRandomNumber = size === randomNumberLength;

    assert.strictEqual(
      isValidRandomNumber,
      true,
      "Random number generated is invalid!"
    );

    if (isValidRandomNumber) {
      console.log("generateRandomNumber() has passed in test\n");
    }
  }

  testRemoveSensitiveProperty() {
    let user = {
      email: "user@example.com",
      name: "user test",
      password: "UserSecretPassword",
    };
    user = SecurityTools.removeSensitiveProperty(user, "password");
    const userHasPasswordProperty = user.hasOwnProperty("password");

    assert.strictEqual(
      userHasPasswordProperty,
      false,
      "Property has not been removed from data."
    );

    if (!userHasPasswordProperty) {
      console.log("removeSensitiveProperty() has passed in test\n");
    }
  }

  testRemoveSensitiveProperties() {
    let user = {
      email: "user@example.com",
      name: "user test",
      password: "UserSecretPassword",
      token: SecurityTools.generateHashDigitalSignature(),
    };
    user = SecurityTools.removeSensitiveProperties(user, ["password", "token"]);

    const userHasPasswordProperty = user.hasOwnProperty("password");
    const userHasTokenProperty = user.hasOwnProperty("token");

    assert.strictEqual(
      userHasPasswordProperty,
      false,
      "Property password has not been removed from data."
    );

    assert.strictEqual(
      userHasTokenProperty,
      false,
      "Property token has not been removed from data."
    );

    if (!userHasPasswordProperty && !userHasTokenProperty) {
      console.log("testRemoveSensitiveProperties() has passed in test\n");
    }
  }

  testEncryptAES() {
    const encrypted = SecurityTools.encryptAES(
      this.aesData,
      this.secretAesKey,
      this.iv
    );

    const encryptedLenght = encrypted.length;
    const isValidAes = encryptedLenght === 64;

    assert.strictEqual(isValidAes, true, "AES encrypt value is invalid!");

    if (isValidAes) {
      console.log("encryptAES() has passed in test\n");
    }
  }

  testDecryptAES() {
    const encrypted = SecurityTools.encryptAES(
      this.aesData,
      this.secretAesKey,
      this.iv
    );

    const decrypted = SecurityTools.decryptAES(
      encrypted,
      this.secretAesKey,
      this.iv
    );

    const isValidDecryption = decrypted === this.aesData;

    assert.strictEqual(
      isValidDecryption,
      true,
      "AES decrypt value is invalid!"
    );

    if (isValidDecryption) {
      console.log("decryptAES() has passed in test\n");
    }
  }

  testIsStrongPassword() {
    const weakPasswords = ["A1cdef!", "12345678", "AbcdefgH", "AbcdefgH123"];
    let allWeakHasPassed = true;

    weakPasswords.forEach((password) => {
      const isStrong = SecurityTools.isStrongPassword(password);
      if (isStrong) {
        allWeakHasPassed = false;
      }
    });

    assert.strictEqual(
      allWeakHasPassed,
      true,
      "Weaks password are considered as strong password"
    );

    const strongPassword = "!Str0ng3rP4ssw0rd$";
    const isStrong = SecurityTools.isStrongPassword(strongPassword);
    assert.strictEqual(isStrong, true, "Weeks ");

    if (isStrong && allWeakHasPassed) {
      console.log("isStrongPassword() has passed in test\n");
    }
  }

  runAllTests() {
    this.testGenerateUUID();
    this.testGenerateJwt();
    this.testDecodedJwt();
    this.testGenerateHashWithSalt();
    this.testGenerateHashWithSalt();
    this.testGenerateRandomBytes();
    this.testGenerateRandomNumber();
    this.testRemoveSensitiveProperty();
    this.testRemoveSensitiveProperties();
    this.testEncryptAES();
    this.testDecryptAES();
    this.testIsStrongPassword();
  }
}

const testSecurityTools = new TestSecurityTools();
testSecurityTools.runAllTests();
