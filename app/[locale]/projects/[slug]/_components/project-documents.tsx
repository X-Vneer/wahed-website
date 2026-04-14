import { FileText, Download } from "lucide-react"
import type { ProjectAttachment } from "@/lib/website-cms"

type ProjectDocumentsProps = {
  title: string
  documents: ProjectAttachment[]
}

function formatFileSize(bytes: number | null): string {
  if (!bytes) return ""
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function getFileExtension(attachment: ProjectAttachment): string {
  if (attachment.fileType) {
    const mimeMap: Record<string, string> = {
      "application/pdf": "PDF",
      "image/jpeg": "JPG",
      "image/png": "PNG",
      "application/msword": "DOC",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        "DOCX",
      "application/vnd.ms-excel": "XLS",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        "XLSX",
    }
    if (mimeMap[attachment.fileType]) return mimeMap[attachment.fileType]
  }

  const url = attachment.fileUrl
  const ext = url.split(".").pop()?.split("?")[0]?.toUpperCase()
  return ext || "FILE"
}

export default function ProjectDocuments({
  title,
  documents,
}: ProjectDocumentsProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-black md:text-3xl lg:text-4xl">
        {title}
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {documents.map((doc, index) => {
          const ext = getFileExtension(doc)
          const size = formatFileSize(doc.fileSize)
          const name = doc.fileName || `Document ${index + 1}`

          return (
            <a
              key={index}
              href={doc.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-5 py-4 transition-colors hover:bg-gray-50"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-gray-900">{name}</p>
                <p className="mt-1 text-sm text-gray-500">
                  {ext}
                  {size ? ` . ${size}` : ""}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2 text-gray-400">
                <Download className="size-5" />
                <FileText className="size-5" />
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}
