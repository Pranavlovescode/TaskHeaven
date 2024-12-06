'use client'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"

export default function AddTaskForm({ teamId }: { teamId: string }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [assignee, setAssignee] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // This is where you would typically send the data to your API
    console.log('New task:', { teamId, title, description, assignee })
    toast({
      title: "Task added",
      description: `New task "${title}" has been assigned to ${assignee}.`,
    })
    setTitle('')
    setDescription('')
    setAssignee('')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Task</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="text-sm font-medium">Task Title</label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="text-sm font-medium">Description</label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              rows={3}
            />
          </div>
          <div>
            <label htmlFor="assignee" className="text-sm font-medium">Assignee</label>
            <Select value={assignee} onValueChange={setAssignee} required>
              <SelectTrigger>
                <SelectValue placeholder="Select team member" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="John Doe">John Doe</SelectItem>
                <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                <SelectItem value="Bob Johnson">Bob Johnson</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">Add Task</Button>
        </form>
      </CardContent>
    </Card>
  )
}
