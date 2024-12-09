export interface IVerifyUserRoute {
  email: string;
  otp?: number;
  verificationType: 'emailVerification' | 'passwordReset';
}


export interface IConversationProps {
  id: number;
  content?: string;
  image?: string;
  style?:
    | 'book_promotion'
    | 'shear_book'
    | 'image'
    | 'two'
    | 'single'
    | 'three'
    | 'four';
  user?: {
    name: string;
    image: string;
  };
}