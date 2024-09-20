import { AUTH_EXPIRE_TIME } from "@/constants";

interface TelegramData {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  photo_url: string;
  auth_date: string;
}

class TelegramService {
  private static instance: TelegramService;
  private token: string;
  private crypto: SubtleCrypto;
  private encoder: TextEncoder;
  private constructor() {
    this.token = process.env.TELEGRAM_BOT_TOKEN || "";
    this.crypto =
      (typeof crypto !== "undefined" && crypto.subtle) ||
      require("crypto").webcrypto.subtle;
    this.encoder = new TextEncoder();
  }
  static getInstance(): TelegramService {
    if (!TelegramService.instance) {
      TelegramService.instance = new TelegramService();
    }
    return TelegramService.instance;
  }

  public async validate<T>(loginData: Object) {
    if (!loginData) return null;

    const authData = new Map(Object.entries(loginData));
    const hash = authData.get("hash") || "";
    authData.delete("hash");
    authData.delete("callbackUrl");
    authData.delete("csrfToken");

    const dataToCheck: Array<string> = [];
    authData.forEach((v, k) => dataToCheck.push(`${k}=${v}`));
    dataToCheck.sort();

    let checkStr = dataToCheck.join(`\n`);

    let secret = await this.crypto.digest(
      "SHA-256",
      this.encoder.encode(this.token)
    );
    let signatureKey = await this.crypto.importKey(
      "raw",
      secret,
      { name: "HMAC", hash: "SHA-256" },
      true,
      ["sign", "verify"]
    );

    const isDataValid = await this.crypto.verify(
      "HMAC",
      signatureKey,
      new Uint8Array(
        hash.match(/[\da-f]{2}/gi)?.map((h: string) => parseInt(h, 16)) || []
      ),
      this.encoder.encode(checkStr)
    );

    if (!isDataValid) {
      throw new Error("Unauthorized! Validation error.");
    }

    const authDate = Number(authData.get("auth_date"));
    const now = Math.floor(Date.now() / 1000);
    const dataAge = now - authDate;

    if (dataAge > AUTH_EXPIRE_TIME) {
      throw new Error("Unauthorized! The data has expired.");
    }
    return loginData as TelegramData;
  }
}

export default TelegramService.getInstance();
