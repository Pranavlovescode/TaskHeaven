"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import axios from "axios";

const formSchema = z.object({
  emp_id: z.string().min(2, {
    message: "Employee ID must be at least 2 characters.",
  }),
  ctc: z.number().min(0, {
    message: "Cost To Company must be a positive number.",
  }),
  bonus: z.number().min(0, {
    message: "Bonus must be a positive number.",
  }),
  date_of_salary: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Payment date must be in YYYY-MM-DD format.",
  }),
});

export function AddPayrollForm({ onClose }: { onClose: () => void }) {
  const toast = useToast();
  const [date, setDate] = useState<Date | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emp_id: "",
      ctc: 0,
      bonus: 0,
      date_of_salary: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted successfully:", values);
    try {
      const payrollResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/payroll/create`,
        {
          emp_id: values.emp_id,
          ctc: values.ctc,
          bonus: values.bonus,
          date_of_salary: values.date_of_salary,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(window.localStorage.getItem("user") || "{}").token}`,
          },
          params: { emp_id: values.emp_id },
        }
      );
      console.log("Payroll response:", payrollResponse.data);
      toast.toast({
        title: "Payroll added successfully",
        description: "The new payroll entry has been added to the system.",
      });
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.toast({
        title: "Error while adding Payroll",
        description: "Sorry our servers are facing issues. Please try again.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="emp_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employee ID</FormLabel>
              <FormControl>
                <Input placeholder="EMP001" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ctc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cost To Company (in Lakhs)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value ? parseFloat(e.target.value) : -1
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bonus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bonus</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value ? parseFloat(e.target.value) : -1
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date_of_salary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Date</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2" />
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date ?? undefined}
                      onSelect={(selectedDate) => {
                        if (selectedDate) {
                          setDate(selectedDate);
                          field.onChange(
                            selectedDate.toISOString().split("T")[0]
                          );
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="bg-gray-800 hover:bg-gray-600 duration-500" type="submit">Submit</Button>
      </form>
    </Form>
  );
}
