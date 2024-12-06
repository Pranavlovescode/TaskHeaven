'use client'
import { Suspense } from 'react'
import TeamDetails from '../../../components/TeamDetails'
import TaskList from '../../../components/TaskList'
import AddTaskForm from '../../../components/AddTaskForm'
import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'


export default function TeamPage() {
  const params = useParams<{team_id:string}>()
  console.log(params.team_id)
    return (
        <div className="min-h-screen bg-gray-50 mt-[52px]">
        <div className="container mx-auto p-4 max-w-7xl">
          <Link href="/mng-dash">
            <Button variant="ghost" size="sm" className="mb-4 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Teams
            </Button>
          </Link>
          <h1 className="text-3xl font-bold mb-8">Team Details and Tasks</h1>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-grow space-y-8">
              <Suspense fallback={<div>Loading team details...</div>}>
                <TeamDetails teamId={params.team_id} />
              </Suspense>
              <Suspense fallback={<div>Loading tasks...</div>}>
                <TaskList teamId={params.team_id} />
              </Suspense>
            </div>
            <div className="lg:w-1/3">
              <div className="sticky top-4">
                <AddTaskForm teamId={params.team_id} />
                {/* {} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  