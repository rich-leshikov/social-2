import type { Key } from "react"
import { useState } from "react"
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react"
import { Login, Register } from "../../features"

export const Auth = () => {
  const [selected, setSelected] = useState("sign-in")

  const onSelectionChange = (key: Key) => setSelected(key as string)

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col">
        <Card className="max-w-full w-[340px] h-[450px]">
          <CardBody className="overflow-hidden">
            <Tabs
              fullWidth
              size={"md"}
              selectedKey={selected}
              onSelectionChange={onSelectionChange}
            >
              <Tab key={"sign-in"} title={"Sign in"}>
                <Login setSelected={onSelectionChange} />
              </Tab>
              <Tab key={"sign-up"} title={"Sign up"}>
                <Register setSelected={onSelectionChange} />
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
