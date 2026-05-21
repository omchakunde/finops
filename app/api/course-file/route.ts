import { NextResponse } from "next/server";

export const runtime = "nodejs";

function getSafeFilename(value: string) {
  const fallback = "course-file";
  const decoded = decodeURIComponent(value || fallback);
  const filename = decoded.split("/").pop()?.split("?")[0] || fallback;

  return filename.replace(/[^a-zA-Z0-9._-]/g, "_") || fallback;
}

function getContentType(url: string, fallback: string | null) {
  if (fallback && fallback !== "application/octet-stream") return fallback;

  const pathname = new URL(url).pathname.toLowerCase();

  if (pathname.endsWith(".pdf")) return "application/pdf";
  if (pathname.endsWith(".doc")) return "application/msword";
  if (pathname.endsWith(".docx")) {
    return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  }
  if (pathname.endsWith(".ppt")) return "application/vnd.ms-powerpoint";
  if (pathname.endsWith(".pptx")) {
    return "application/vnd.openxmlformats-officedocument.presentationml.presentation";
  }
  if (pathname.endsWith(".xls")) return "application/vnd.ms-excel";
  if (pathname.endsWith(".xlsx")) {
    return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  }
  if (pathname.endsWith(".csv")) return "text/csv";
  if (pathname.endsWith(".txt")) return "text/plain";
  if (pathname.endsWith(".png")) return "image/png";
  if (pathname.endsWith(".jpg") || pathname.endsWith(".jpeg")) return "image/jpeg";

  return "application/octet-stream";
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const rawUrl = searchParams.get("url") || "";
    const disposition =
      searchParams.get("disposition") === "attachment"
        ? "attachment"
        : "inline";

    const fileUrl = new URL(rawUrl);

    if (!["http:", "https:"].includes(fileUrl.protocol)) {
      return NextResponse.json(
        {
          success: false,
          message: "Only http and https files can be opened",
        },
        { status: 400 }
      );
    }

    const fileRes = await fetch(fileUrl.toString(), {
      cache: "no-store",
    });

    if (!fileRes.ok) {
      return NextResponse.json(
        {
          success: false,
          message:
            "The uploaded file could not be opened. Please re-upload it from admin.",
          status: fileRes.status,
        },
        { status: 502 }
      );
    }

    const body = await fileRes.arrayBuffer();
    const filename = getSafeFilename(
      searchParams.get("name") || fileUrl.pathname
    );
    const contentType = getContentType(
      fileUrl.toString(),
      fileRes.headers.get("content-type")
    );

    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `${disposition}; filename="${filename}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error: any) {
    console.log("COURSE FILE OPEN ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Invalid course file URL. Please re-upload the file from admin.",
      },
      { status: 400 }
    );
  }
}
