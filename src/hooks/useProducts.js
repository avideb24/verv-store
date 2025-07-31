import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: api.getProducts,
  });
};

export const useProduct = (id) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => api.getProduct(id),
    enabled: !!id,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: api.getCategories,
  });
};

export const useProductsByCategory = (category) => {
  return useQuery({
    queryKey: ['products', 'category', category],
    queryFn: () => api.getProductsByCategory(category),
    enabled: !!category,
  });
}; 