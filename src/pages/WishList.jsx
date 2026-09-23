import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromWishList } from '../redux/slices/wishListSlice'
import { addToCart } from '../redux/slices/cartSlice'

const WishList = () => {
  const wishList = useSelector((state) => state.wishlist)
  const user = useSelector(state=>state.auth.user)
  const dispatch = useDispatch()

  if (!wishList || wishList.length === 0) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold text-slate-800">Your wishlist is empty</h2>
        <p className="mt-1 text-sm text-slate-500">Explore products and add items to your wishlist.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">My Wishlist ({wishList.length})</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {wishList.map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
          >
            <div>
              {item.image && (
                <div className="mb-3 h-48 w-full overflow-hidden rounded-xl bg-slate-50">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-contain p-2"
                  />
                </div>
              )}
              <h2 className="line-clamp-1 text-sm font-semibold text-slate-800">{item.title}</h2>
              <p className="mt-1 text-base font-bold text-slate-900">₹{item.price}</p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  if(!user){
                    alert("Please login to move products to cart")
                    return;
                  }
                  if(item.stock <=0){
                    alert("Product is out of stock")
                    return;
                  }
                  
                  dispatch(addToCart(item))
                  dispatch(removeFromWishList(item))
                }}
                className="rounded-xl bg-slate-900 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.98]"
                disabled={item.stock <=0}
              >
               {item.stock <= 0 ? "Out of Stock" : "Move to Cart"}
              </button>

              <button
                onClick={() => dispatch(removeFromWishList(item))}
                className="rounded-xl bg-red-50 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100 active:scale-[0.98]"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WishList