const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const password = "your-secure-password";
const salt = crypto.randomBytes(16).toString("hex");

const deriveKey = (password: string, salt: string): Buffer => {
  return crypto.scryptSync(password, salt, 32);
};

const generateIv = (): Buffer => {
  return crypto.randomBytes(16);
};

// Encrypt Function
export const encrypt = async (text: string): Promise<string> => {
  const key = deriveKey(password, salt);
  const iv = generateIv();
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + encrypted;
};

// Decrypt Function
export const decrypt = async (encrypted: string): Promise<string> => {
  const key = deriveKey(password, salt);
  const iv = Buffer.from(encrypted.slice(0, 32), "hex");
  const encryptedData = encrypted.slice(32);
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

// Compare Function
export const compare = async (
  plaintext: string,
  encrypted: string
): Promise<boolean> => {
  const decrypted = await decrypt(encrypted);
  return plaintext === decrypted;
};