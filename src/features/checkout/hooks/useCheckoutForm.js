import { yupResolver } from "@hookform/resolvers/yup";
import { checkoutSchema } from "../schemas/checkoutSchema";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { defValues_shippingFields } from "../data/shippingFields";
import useCartStore from '../../cart/hooks/useCartStore'

export default function useCheckoutForm() {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const [orderPlaced, setOrderPlaced] = useState(false);

  
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(checkoutSchema),
    defaultValues: defValues_shippingFields,
  });

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const onSubmit = (data) => {
    clearCart();
    setOrderPlaced(true);
    console.log(data);
    methods.reset(); // نستخدم methods هنا
  };

  return {
    ...methods, // 2.  passing all react-hook-form methods (register, control, formState, etc.)
    onSubmit,   
    orderPlaced,
    totalPrice,
    items,
  };
}