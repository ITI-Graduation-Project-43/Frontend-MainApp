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
  coupon: string
}