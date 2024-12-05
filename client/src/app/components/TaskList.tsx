import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

async function getTeamTasks(teamId: string) {
  // This is a mock function. In a real application, you would fetch this data from your API or database.
  return [
    { id: 1, title: "Implement user authentication", status: "In Progress", assignee: "John Doe" },
    { id: 2, title: "Design new landing page", status: "Pending", assignee: "Bob Johnson" },
    { id: 3, title: "Optimize database queries", status: "Completed", assignee: "Jane Smith" },
    { id: 4, title: "Write API documentation", status: "In Progress", assignee: "Jane Smith" },
  ]
}

export default async function TaskList({ teamId }: { teamId: string }) {
  const tasks = await getTeamTasks(teamId)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">{task.title}</h3>
                <p className="text-sm text-muted-foreground">Assigned to: {task.assignee}</p>
              </div>
              <Badge className={task.status === 'Completed' ? 'bg-green-500' : task.status === 'In Progress' ? 'bg-orange-400' : 'bg-red-600'}>
                {task.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

