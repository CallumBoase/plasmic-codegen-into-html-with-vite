export type HelloProps = {
  whoToGreet: string;
}

export const Hello = ({whoToGreet} : HelloProps) => {
  return (
    <div>Hello {whoToGreet}</div>
  )
}