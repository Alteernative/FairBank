import React from "react"

// TODO: This no longer needed. Replaced with childern props passed to Layout.
export default function Content({children} : {children: React.ReactNode}) {
  return (
    {children}
  )
}