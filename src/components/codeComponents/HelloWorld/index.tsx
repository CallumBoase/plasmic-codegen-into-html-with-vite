export type HelloProps = {
  whoToGreet: string;
}

import './styles.css'

export const HelloWorld = ({whoToGreet} : HelloProps) => {
  return (
    <div id="helloComponent">Hello {whoToGreet}</div>
  )
}