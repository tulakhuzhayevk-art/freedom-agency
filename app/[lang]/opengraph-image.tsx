import { ImageResponse } from "next/og";

export const dynamic = "force-static";
import { LANGS } from "@/lib/dict";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #08090c 60%, #101830 100%)",
          color: "#eef1f8",
          fontSize: 130,
          fontWeight: 900,
          letterSpacing: "-0.02em",
        }}
      >
        <div style={{ display: "flex" }}>FREEDOM</div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            fontWeight: 400,
            color: "#7ea2ff",
            marginTop: 24,
            letterSpacing: "0.2em",
          }}
        >
          DIGITAL AGENCY · TASHKENT
        </div>
      </div>
    ),
    size
  );
}
