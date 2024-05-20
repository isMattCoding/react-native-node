import { Alert, AlertType } from "./Alert";

type AlertsType = {
  errors: AlertType[];
}
export function Alerts({errors}:AlertsType) {
  if (errors.length < 1) return null

  const {message, type, id} = errors[0]
  return (
    <Alert message={message} type={type} id={id}/>
  )
}
