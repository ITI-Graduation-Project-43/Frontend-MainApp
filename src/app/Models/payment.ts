import { CourseCoupon } from "./courseCoupon";

export interface Payment{
  name: string,
  email: string,
  nameOnCard: string,
  cardNumber: string,
  expirationYear: string,
  expirationMonth: string,
  cvc: string,
  description: string,
  coursesIds: number[],
  siteCoupon: string,
  coursesCoupons: CourseCoupon[]
}