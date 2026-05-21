import { createHash } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function getCloudinaryConfig() {
  const cloudinaryUrl = process.env.CLOUDINARY_URL || "";

  if (cloudinaryUrl.startsWith("cloudinary://")) {
    const parsed = new URL(cloudinaryUrl);

    return {
      cloudName: parsed.hostname,
      apiKey: decodeURIComponent(parsed.username),
      apiSecret: decodeURIComponent(parsed.password),
    };
  }

  return {
    cloudName:
      process.env.CLOUDINARY_CLOUD_NAME ||
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
      "",
    apiKey: process.env.CLOUDINARY_API_KEY || "",
    apiSecret: process.env.CLOUDINARY_API_SECRET || "",
  };
}

function sanitizePathPart(value: string) {
  return value
    .replace(/\\/g, "/")
    .split("/")
    .filter(Boolean)
    .map((part) => part.replace(/[^a-zA-Z0-9._-]/g, "-"))
    .join("/");
}

function sanitizeFilename(value: string) {
  const fallback = "course-file";
  const parsed = value.split(/[\\/]/).pop() || fallback;
  const safe = parsed.replace(/[^a-zA-Z0-9._-]/g, "-");

  return safe || fallback;
}

async function savePublicUpload(file: File, folder: string) {
  const safeFolder = sanitizePathPart(folder || "finops/admin");
  const safeFilename = `${Date.now()}-${sanitizeFilename(file.name)}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads", safeFolder);
  const arrayBuffer = await file.arrayBuffer();

  await mkdir(uploadDir, {
    recursive: true,
  });

  await writeFile(
    path.join(uploadDir, safeFilename),
    Buffer.from(arrayBuffer)
  );

  return `/uploads/${safeFolder}/${safeFilename}`;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const folder = String(formData.get("folder") || "finops/admin");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message: "File is required",
        },
        {
          status: 400,
        }
      );
    }

    const shouldStoreLocally =
      folder.includes("pdfs") ||
      folder.includes("materials") ||
      file.type === "application/pdf" ||
      file.type.includes("document") ||
      file.type.includes("spreadsheet") ||
      file.type.includes("presentation") ||
      file.type === "text/plain" ||
      file.type === "text/csv";

    if (shouldStoreLocally) {
      const localUrl = await savePublicUpload(file, folder);

      return NextResponse.json({
        success: true,
        url: localUrl,
        publicId: localUrl,
      });
    }

    const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Cloudinary credentials are missing. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET or CLOUDINARY_URL.",
        },
        {
          status: 500,
        }
      );
    }

    const timestamp = Math.round(Date.now() / 1000);
    const signature = createHash("sha1")
      .update(`folder=${folder}&timestamp=${timestamp}${apiSecret}`)
      .digest("hex");

    const uploadFormData = new FormData();
    uploadFormData.append("file", file);
    uploadFormData.append("folder", folder);
    uploadFormData.append("timestamp", String(timestamp));
    uploadFormData.append("api_key", apiKey);
    uploadFormData.append("signature", signature);

    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
      {
        method: "POST",
        body: uploadFormData,
      }
    );

    const uploadData = await uploadRes.json();

    if (!uploadRes.ok) {
      return NextResponse.json(
        {
          success: false,
          message: uploadData.error?.message || "Cloudinary upload failed",
        },
        {
          status: uploadRes.status,
        }
      );
    }

    return NextResponse.json({
      success: true,
      url: uploadData.secure_url,
      publicId: uploadData.public_id,
    });
  } catch (error: any) {
    console.log("UPLOAD ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Upload failed",
      },
      {
        status: 500,
      }
    );
  }
}
