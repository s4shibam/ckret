import { Toaster } from 'react-hot-toast'

const ToasterProvider = () => {
  return (
    <Toaster
      position="top-center"
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
