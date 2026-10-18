import * as z from 'zod'
 
export const SignupFormSchema = z.object({
  userName: z
    .string()
    .min(2, { error: 'Name must be at least 2 characters long.' })
    .trim(),
  userEmail: z.email({ error: 'Please enter a valid email.' }).trim(),
  userRole: z.enum(['user','admin'], {error: 'You must select a role'}),
  userPassword: z
    .string()
    .min(8, { error: 'Minimum 8 characters required.' })
    .regex(/[a-zA-Z]/, { error: 'Password contains least one letter.' })
    .regex(/[0-9]/, { error: 'Password contains least one number.' })
    .trim(),
})

export const LoginFormSchema = z.object({
  userEmail: z.email({ error: 'Please enter a valid email.' }).trim(),
  userPassword: z
    .string()
    .min(8, { error: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { error: 'Password contains one letter.' })
    .regex(/[0-9]/, { error: 'Password contains one number.' })
    .trim(),
})

export const PostProductSchema = z.object({
  productName: z
  .string()
  .min(4, {error: 'Product name must be at least 4 characters long.'})
  .trim(),
  productStatus: z
  .enum(['In stock','Out of stock'], {error: 'Please select an option'}),
  productSellVolumn: z
  .string()
  .min(1, {error: 'Volumn is required'})
  .transform((val) => Number(val))
  .pipe(z.number().min(1, "Volumn must be at least 1")),
  productPrice: z
  .string()
  .min(1, {error: 'Price is required'})
  .transform((val) => Number(val))
  .pipe(z.number().min(20000, "Minimum price is 20000")),
  productCategory: z
  .enum(['Bread', 'Tart', 'Cookies', 'Donuts', 'Cake', 'Cheesecake'], {error: 'Please select a category'}),
  productDescription: z
  .string()
})

export const UpdateProductSchema = z.object({
  productName: z
  .string()
  .trim(),
  productStatus: z
  .enum(['In stock','Out of stock'], {error: 'Please select an option'}),
  productSellVolumn: z
  .string()
  .min(1, {error: 'Volumn is required'})
  .transform((val) => Number(val))
  .pipe(z.number().min(1, "Volumn must be at least 1")),
  productPrice: z
  .string()
  .min(1, {error: 'Price is required'})
  .transform((val) => Number(val))
  .pipe(z.number().min(20000, "Minimum price is 20000")),
  productCategory: z
  .enum(['Bread', 'Tart', 'Cookies', 'Donuts', 'Cake', 'Cheesecake'], {error: 'Please select a category'}),
  productDescription: z
  .string()
})

export const UserInfoSchema = z.object({
   userName: z
  .string()
  .min(2, { error: 'Name must be at least 2 characters long.' })
  .trim(),
  userAddress: z
  .string()
  .min(1, {error: 'Address is required'})
  .trim(),
  userCity: z
  .enum(['Somewhere', 'Someplace', 'Everywhere', 'Mars', 'Earth'], {error: 'You can not be Nowhere.'}),
  userPostalCode: z
  .string()
  .min(1, {error: 'Postal code is required'}),
})

export const PasswordSchema = z.object({
   userPassword: z
    .string()
    .min(8, { error: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { error: 'Password contains one letter.' })
    .regex(/[0-9]/, { error: 'Password contains one number.' })
    .trim(),
   userNewPassword: z
    .string()
    .min(8, { error: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { error: 'Password contains one letter.' })
    .regex(/[0-9]/, { error: 'Password contains one number.' })
    .trim(),
   userConfirmedPassword: z
   .string()
   .min(8, { error: 'Be at least 8 characters long' })
   .regex(/[a-zA-Z]/, { error: 'Password contains one letter.' })
   .regex(/[0-9]/, { error: 'Password contains one number.' })
   .trim(),
})

export type SignUpFormState =
  | {
      error?: {
        userName?: string[]
        userEmail?: string[]
        userPassword?: string[]
        userRole?: string[]
      }
      message?: string
      status: 'loading'|'success'|'error'
    }
  | undefined

export type LoginFormState =
  | {
      error?: {
        userEmail?: string[]
        userPassword?: string[]
      }
      message?: string
      status: 'loading'|'success'|'error'
    }
  | undefined

export type PostProductFormState = 
  | {
     error?: {
      productName?: string[]
      productStatus?: string[]
      productPrice?: string[]
      productSellVolumn?: string[]
      productCategory?: string[]
      productDescription?: string[]
     }
     message?: string
     status: 'loading'|'success'|'error'
  }
  | undefined

  export type UpdateProductFormState = 
  | {
     error?: {
      productStatus?: string[]
      productPrice?: string[]
      productSellVolumn?: string[]
      productCategory?: string[]
      productDescription?: string[]
     }
     message?: string
     status: 'loading'|'success'|'error'
  }
  | undefined

  export type UserInfoFormState = 
  | {
     error?: {
      userName?: string[]
      userAddress?: string[]
      userCity?: string[]
      userPostalCode?: string[]
     }
     message?: string
     status: 'loading'|'success'|'error'
  }
  | undefined
  
   export type ChangePasswordFormState = 
  | {
     error?: {
      userPassword?: string[]
      userNewPassword?: string[]
      userConfirmedPassword?: string[]
     }
     message?: string
     status: 'loading'|'success'|'error'
  }
  | undefined

export type SessionPayload = {
  userRole: string;
  userId: string;
  expiresAt: Date;
};