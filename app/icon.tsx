import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#08090c",
          color: "#eef1f8",
          fontSize: 40,
          fontWeight: 900,
          borderRadius: 12,
          borderBottom: "4px solid #4d7cff",
        }}
      >
        F
      </div>
    ),
    size
  );
}
