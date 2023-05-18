import { EMAIL_TOAST, PASSWORD_TOAST, SUBMIT_TOAST } from "@/utils/constants";
import { toast } from "react-toastify";

export const failedSubmitToast = (message = SUBMIT_TOAST) => toast.error(message);
export const failedEmailValidationToast = (message = EMAIL_TOAST) => toast.error(message);
export const failedPasswordValidationToast = (message = PASSWORD_TOAST) => toast.error(message);