import qrcode from "qrcode";
import { authenticator } from "otplib";
import { env } from "../../modules/shared/env";
import Image from "next/image";

function generateOtpQrCode() {
  const otpUri = authenticator.keyuri(
    env.OTP_USER,
    env.OTP_SERVICE,
    env.OTP_SECRET
  );
  return qrcode.toDataURL(otpUri);
}

export default async function QrCode() {
  const qrCodeUri = await generateOtpQrCode();

  if (env.VERCEL) {
    return <p>Can not see OTP Qr Code once deployed</p>;
  }

  return <Image alt="OTP Qr Code" src={qrCodeUri} width={212} height={212} />;
}
