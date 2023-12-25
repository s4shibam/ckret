import { Toaster } from 'react-hot-toast'

const ToasterProvider = () => {
  return (
    <Toaster
      position="bottom-left"
      toastOptions={{
        style: {
          color: '#111',
          background: '#fff',
          maxWidth: '500px'
        },
        duration: 2000
      }}
    />
  )
}

export default ToasterProvider
