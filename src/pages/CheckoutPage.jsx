import { Link } from "react-router-dom";


import {  shippingFields } from "../features/checkout/data/shippingFields";
import OrderSummery from "../features/checkout/components/OrderSummery";
import FieldForm from "../features/checkout/components/FieldForm";
import useCheckoutForm from "../features/checkout/hooks/useCheckoutForm";
import { FormProvider } from "react-hook-form";

export default function CheckoutPage() {


  const methods=useCheckoutForm()

   

   if (methods.orderPlaced) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-emerald-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Order Placed Successfully!
        </h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Thank you for your purchase. Your order has been confirmed and will be
          shipped shortly.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (methods.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mb-6">
          Add some items to your cart before checking out.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        <p className="text-gray-500 mt-1">
          Complete your order by filling in the details below
        </p>
      </div>

<FormProvider {...methods}> 
    <form onSubmit={methods.handleSubmit(methods.onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                Shipping Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {shippingFields.map((field) => (
                  <FieldForm
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    placeholder={field.placeholder}
                    gridSpan={field.gridSpan}

                  />
                ))}

                {/* Country , don't put it in map because does not care */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Country
                  </label>
                  <select
                    {...methods.register("country")}
                    className={`w-full px-4 py-2.5 border rounded-xl text-sm transition-all focus:outline-none focus:ring-2 bg-white
                ${methods.formState.errors.country? "border-red-500 focus:ring-red-200" : "border-gray-200 focus:ring-primary-500"}`}
                  >
                    <option value="">Select country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    {/* ... other options */}
                  </select>
                  {methods.formState.errors.country && (
                    <p className="mt-1.5 text-xs font-medium text-red-600 flex items-center gap-1">
                      <span>⚠</span> {methods.formState.errors.country.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
                       <OrderSummery items={methods.items} totalPrice={methods.totalPrice} />
       
        </div>
      </form>
      </FormProvider>

    </div>
  );
}



