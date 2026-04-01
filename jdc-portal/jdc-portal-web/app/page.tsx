'use client'

import FormsInput from "@/components/forms/forms-input"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { signInSchema, SignInType } from "@/lib/schema/anonymous"
import { zodResolver } from "@hookform/resolvers/zod"
import { LogIn } from "lucide-react"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

export default function Welcome() {

  const [data, setData] = useState<SignInType>()

  const form = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const onSubmit = (data: SignInType) => {
    setData(data)
  }


  return (
    <div className="px-32 py-8 w-1/2">
      <h1>Home</h1>
      <form onSubmit={form.handleSubmit(onSubmit)}>

        <FormsInput control={form.control} name="email" type="email" label="Email" className="mb-3" />
        <FormsInput control={form.control} name="password" type="password" label="Password" className="mb-3" />
        <Button type="submit">
          <LogIn /> Sign In
        </Button>
      </form>

      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  )
}