export type HelloProps = {
  whoToGreet: string;
}

import './styles.css'

export const Hello = ({whoToGreet} : HelloProps) => {
  return (
    <div id="helloComponent">Hello {whoToGreet}</div>
  )
}