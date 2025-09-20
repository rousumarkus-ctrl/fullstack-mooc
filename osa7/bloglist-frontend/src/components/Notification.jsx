import { Alert } from '@mui/material'
import { useNotificationValue } from '../NotificationContext'

const Notification = () => {
  const notification = useNotificationValue()

  if (notification === '') {
    return (
      <Alert style={{ display: 'none' }} severity="success">
        {notification}
      </Alert>
    )
  }

  return <Alert severity="success">{notification}</Alert>
}

export default Notification
