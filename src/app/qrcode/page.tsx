import { env } from "@reading-list/modules/shared/env";
import Image from "next/image";
import { generateKey, getKeyUri } from "otp-io";
import qrcode from "qrcode";

export const runtime = "edge";

function generateOtpQrCode() {
  const otpUri = getKeyUri({
    type: "totp",
    secret: generateKey(() => Buffer.from(env.OTP_SECRET)),
    name: env.OTP_USER,
    issuer: env.OTP_SERVICE,
  });
  return qrcode.toDataURL(otpUri);
}

export default async function QrCode() {
  const qrCodeUri = await generateOtpQrCode();

  if (env.VERCEL) {
    return <p>Can not see OTP Qr Code once deployed</p>;
  }

  return <Image alt="OTP Qr Code" src={qrCodeUri} width={212} height={212} />;
}
