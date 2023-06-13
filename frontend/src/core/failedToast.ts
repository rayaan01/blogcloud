import type { TOAST_MESSAGES } from '@/utils/constants'
import type { Id } from 'react-toastify'
import { toast } from 'react-toastify'

export const failedToast = (message: TOAST_MESSAGES): Id => toast.error(message)
