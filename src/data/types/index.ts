export interface UserCredentials {
  username: string;
  password: string;
}

export interface Product {
  name: string;
  description: string;
  price: number;
}

export interface CartItem {
  name: string;
  quantity: number;
  price: number;
}

export interface CheckoutInfo {
  firstName: string;
  lastName: string;
  postalCode: string;
}

// JSONPlaceholder types
export interface ApiUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface ApiPost {
  id?: number;
  userId: number;
  title: string;
  body: string;
}

export interface ApiComment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}
