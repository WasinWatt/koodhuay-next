import analytics from '@/utils/analytics'
import axios from '@/utils/axios'
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  PinInput,
  PinInputField,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
} from '@chakra-ui/react'
import { logEvent } from 'firebase/analytics'
import { useState } from 'react'

export default function ShareHuayForm({
  userId,
  close,
}: {
  userId: string
  close: () => void
}) {
  const [number, setNumber] = useState('XXXXXX')
  const [result, setResult] = useState('lost')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

  const isSubmitDisabled = number === 'XXXXXX' || !result || !description

  const pinChange = (index: number, value: string) => {
    setNumber((prev) => {
      const newHuayNumber = prev.split('')
      newHuayNumber[index] = value ? value : 'X'
      return newHuayNumber.join('')
    })
  }

  const submit = async () => {
    setIsSubmitting(true)
    try {
      await axios.post('/api/v1/huays', {
        number: number,
        won: result === 'won',
        description,
        userId,
      })
      logEvent(analytics, 'huay_shared', { won: result === 'won' })
      setIsSubmitting(false)
      setIsSuccessModalOpen(true)
    } catch (error) {
      console.log(error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className='border rounded-lg max-w-[360px] mx-auto p-6'>
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false)
          close()
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>เพิ่มข้อมูลเรียบร้อย !</ModalHeader>
          <ModalCloseButton />
          <ModalBody>ขอบคุณที่มาแชร์แรงบันดาลใจเลขหวยกับเรานะคะ</ModalBody>

          <ModalFooter>
            <Button colorScheme='teal' onClick={() => close()}>
              ปิด
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div className='mb-4'>
        <p className='mb-2'>เลขหวยที่ซื้อ</p>
        <div className='flex gap-4 mx-auto'>
          <PinInput>
            <PinInputField onBlur={(e) => pinChange(0, e.target.value)} />
            <PinInputField onBlur={(e) => pinChange(1, e.target.value)} />
            <PinInputField onBlur={(e) => pinChange(2, e.target.value)} />
            <PinInputField onBlur={(e) => pinChange(3, e.target.value)} />
            <PinInputField onBlur={(e) => pinChange(4, e.target.value)} />
            <PinInputField onBlur={(e) => pinChange(5, e.target.value)} />
          </PinInput>
        </div>
      </div>
      <div className='mb-4'>
        <p className='mb-2'>ใครกินใคร</p>
        <div className='flex gap-4 mx-auto'>
          <RadioGroup defaultValue={result} onChange={setResult}>
            <Stack spacing={5} direction='row'>
              <Radio colorScheme='red' value='lost'>
                โดนแดก
              </Radio>
              <Radio colorScheme='green' value='won'>
                กินหวย
              </Radio>
            </Stack>
          </RadioGroup>
        </div>
      </div>
      <div className='mb-4'>
        <p className='mb-2'>เลขนี้ได้แต่ใดมา</p>
        <Textarea
          placeholder='หลักการขูดหวยสั้น ๆ ไม่เกิน 140 ตัวอักษร'
          height={130}
          maxLength={140}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>
      <Button
        isLoading={isSubmitting}
        loadingText='กำลังส่ง'
        className='bg-[#2bd498] hover:bg-[#2bd498]'
        variant='outline'
        width='full'
        onClick={submit}
        isDisabled={isSubmitDisabled}
      >
        ส่งเข้าประกวด
      </Button>
    </div>
  )
}
