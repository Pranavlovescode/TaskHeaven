"use client";

import { useState } from "react";
import { PayrollTable } from "../../components/PayrollTable";
import { AddPayrollForm } from "../../components/AddPayrollForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, Plus, X } from "lucide-react";

export default function PayrollPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  return (
    <main className="p-8 space-y-8 bg-gray-200 min-h-screen md:pt-[70px]">
      <div className=" mx-auto p-6 space-y-8">
        <div className="mx-auto p-6 space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Payroll Management</h1>
            <Button variant="outline" asChild>
              <Link href="/adm-dash">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Employee Payroll</CardTitle>
              <Button className="bg-gray-800 hover:bg-gray-600 duration-500" onClick={() => setShowAddForm(!showAddForm)}>
                {showAddForm ? (
                  <>
                    <X className="mr-2 h-4 w-4" /> Cancel
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" /> Add New Payroll
                  </>
                )}
              </Button>
            </CardHeader>
            <CardContent>
              {showAddForm ? (
                <AddPayrollForm onClose={() => setShowAddForm(false)} />
              ) : (
                <PayrollTable />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
