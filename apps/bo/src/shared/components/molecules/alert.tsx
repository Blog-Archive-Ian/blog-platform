import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@blog/ui'

interface AlertProps {
  title: string
  description: string
  open: boolean
  onChangeOpen: (v: boolean) => void
  footer: React.ReactNode
}

/**
 * 취소, 확인 버튼 존재하는 커스텀 Alert 컴포넌트
 *
 * @example
 *  const [open, setOpen] = useState<boolean>(false)
 *
 *  <Alert
 *    title="회원수정 취소"
 *    description="작성 중인 내용이 저장되지 않습니다. 정말 취소하시겠습니까?"
 *    open={open}
 *    onChangeOpen={setOpen}
 *    footer={
 *       <>
 *          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
 *            취소
 *           </Button>
 *          <Button type="button" onClick={handleConfirmDiscard}>
 *            확인
 *          </Button>
 *       </>
 *    }
 *  />
 */
export const Alert = ({ title, description, open, onChangeOpen, footer }: AlertProps) => {
  return (
    <Dialog open={open} onOpenChange={onChangeOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>{footer}</DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
