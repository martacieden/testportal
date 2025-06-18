import DashboardLayout from "@/components/dashboard-layout"
import DocumentsList from "@/components/documents-list"
import UploadCloudBlock from "@/components/upload-cloud-block"

export default function DocumentsPage() {
  return (
    <DashboardLayout>
      <UploadCloudBlock />
      <div className="mt-12">
        <DocumentsList />
      </div>
    </DashboardLayout>
  )
}
