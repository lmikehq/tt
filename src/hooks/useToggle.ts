import { useState } from "react"

export const useToggle = () => {
  const [toggle, setToggle] = useState(false)

  const handleToogle = () => {
    setToggle(!toggle)
  }

  return {
    toggle,
    setToggle,
    handleToogle
  }
}