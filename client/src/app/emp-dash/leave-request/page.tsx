import Link from "next/link";
import LeaveRequestPage from "../../components/LeaveRequestPage";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function LeaveRequestForm() {
  return (
    <main className="bg-gray-200 min-h-screen">
      <div className="container py-10">
        <Link href="/emp-dash">
          <Button
            variant="ghost"
            size="sm"
            className="mb-4 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Teams
          </Button>
        </Link>
        <LeaveRequestPage />
      </div>
    </main>
  );
}
