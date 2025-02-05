import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import PageContainer from "@/components/dashboard/PageContainer"
import LoginForm from "@/components/marketplace/Profile/LoginForm"


function page() {
  return (
    <PageContainer>
      <div className="w-full max-w-sm mt-8">
        <div className="flex flex-col gap-6">
          <Card className="mx-2 text-opacity">
            <CardHeader>
              <CardTitle className="text-xl text-center">Login</CardTitle>
              <CardDescription className="text-sm">
                Enter your username below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  )
}

export default page