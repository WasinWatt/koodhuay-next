import { isBoom } from "@hapi/boom"
import { NextResponse } from "next/server"

export default function handle(err: any) {
  console.error(err)
  if (isBoom(err)) {
    return NextResponse.json(err.output.payload, { status: err.output.statusCode })
  }

  return NextResponse.json({ message: 'internal-server-error', statusCode: 500 }, { status: 500 })
}