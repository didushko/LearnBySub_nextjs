import { getLangNameByCountryCode } from "@/languages/subLanguages";
import Image from "next/image";

const FlagImg: React.FC<{
  countryCode?: string;
  size?: 16 | 24 | 32 | 48 | 64;
  width?: number;
  alt?: string;
  title?: string
}> = function ({ countryCode, size = 64, width = 35, alt, title}) {
  if (!countryCode) {
    return null;
  }
  return (
    <Image
      src={`https://flagsapi.com/${countryCode}/shiny/${size}.png`}
      alt={alt || `${countryCode} language`}
      title={title || `Original language: ${getLangNameByCountryCode(countryCode)}`}
      width={width}
      height={width}
      sizes={size + "px"}
    />
  );
};

export default FlagImg;
