"use client"

import { Avatar } from "@heroui/avatar"
import { Button } from "@heroui/button"
import { Card, CardBody, CardHeader } from "@heroui/card"
import { Chip } from "@heroui/chip"
import { Divider } from "@heroui/divider"
import { Input } from "@heroui/input"
import { Progress } from "@heroui/progress"
import { Spinner } from "@heroui/spinner"
import { Switch } from "@heroui/switch"

export default function HeroUITest() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl space-y-12 p-8">
      <section>
        <h1 className="mb-2 text-3xl font-bold">Hero UI component test</h1>
        <p className="text-foreground/70">
          This page renders a few Hero UI components to verify the setup.
        </p>
      </section>

      <Divider />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Buttons</h2>
        <div className="flex flex-wrap gap-3">
          <Button color="default">Default</Button>
          <Button color="primary">Primary</Button>
          <Button color="secondary">Secondary</Button>
          <Button color="success">Success</Button>
          <Button color="warning">Warning</Button>
          <Button color="danger">Danger</Button>
          <Button variant="bordered">Bordered</Button>
          <Button variant="light">Light</Button>
          <Button isLoading>Loading</Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Input</h2>
        <div className="flex max-w-sm flex-col gap-3">
          <Input label="Email" placeholder="you@example.com" type="email" />
          <Input label="Password" placeholder="••••••••" type="password" />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Chips</h2>
        <div className="flex flex-wrap gap-2">
          <Chip>Default</Chip>
          <Chip color="primary">Primary</Chip>
          <Chip color="secondary">Secondary</Chip>
          <Chip color="success">Success</Chip>
          <Chip color="warning">Warning</Chip>
          <Chip color="danger">Danger</Chip>
          <Chip variant="bordered">Bordered</Chip>
          <Chip variant="flat">Flat</Chip>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Avatar</h2>
        <div className="flex flex-wrap gap-4">
          <Avatar name="JD" />
          <Avatar name="Jane" />
          <Avatar src="https://i.pravatar.cc/150?u=hero" />
          <Avatar name="S" size="sm" color="primary" />
          <Avatar name="M" size="md" color="secondary" />
          <Avatar name="L" size="lg" color="success" />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Spinner & Progress</h2>
        <div className="flex flex-wrap items-center gap-6">
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" color="primary" />
          <Progress value={60} className="max-w-md" />
          <Progress value={80} color="primary" className="max-w-md" />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Switch</h2>
        <div className="flex flex-wrap gap-6">
          <Switch defaultSelected>Default on</Switch>
          <Switch>Default off</Switch>
          <Switch color="primary" defaultSelected>
            Primary
          </Switch>
          <Switch color="success">Success</Switch>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Card</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader className="flex gap-3">
              <Avatar name="U" />
              <div>
                <p className="text-md font-medium">Card title</p>
                <p className="text-small text-default-500">Subtitle</p>
              </div>
            </CardHeader>
            <CardBody>
              <p>
                Hero UI Card with header and body. Buttons and other components
                work inside cards too.
              </p>
              <div className="mt-3 flex gap-2">
                <Button size="sm" color="primary">
                  Action
                </Button>
                <Button size="sm" variant="bordered">
                  Cancel
                </Button>
              </div>
            </CardBody>
          </Card>
          <Card className="border-primary border-2">
            <CardBody>
              <p className="text-small text-default-500">Bordered emphasis</p>
              <p className="mt-1">
                Simple card with primary border to confirm theme tokens.
              </p>
            </CardBody>
          </Card>
        </div>
      </section>
    </main>
  )
}
