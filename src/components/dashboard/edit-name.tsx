import toast from 'react-hot-toast'

import { Button } from '@components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@components/ui/dialog'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'

const EditName = ({ children }: { children: React.ReactNode }) => {
  const handleEdit = () => {
    toast.success('Name updated successfully')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="top-10 translate-y-0 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Edit Your Name</DialogTitle>
          <DialogDescription className="text-lg/5">
            Make changes to your name here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="my-2 flex w-full flex-col gap-2">
          <Label className="text-lg" htmlFor="message">
            Name
          </Label>
          <Input
            className="text-lg"
            id="message"
            placeholder="Enter your name"
            type="text"
          />
        </div>
        <DialogFooter>
          <Button className="text-xl" type="submit" onClick={handleEdit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditName
