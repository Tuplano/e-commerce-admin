export interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  category: string;
 image: string[];
  createdAt: string;
}

export interface AddProductFormData {
  name: string;
  price: number;
  stock: number;
  description: string;
  category: string;
 image: string[];
}
    