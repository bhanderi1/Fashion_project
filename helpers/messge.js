class MESSAGES {
    //user
    USER_ALREADY_EXIST = 'User Already exsit...'
    SEND_OTP = 'OTP sent to your email. Please verify to complete registration.'
    USER_NOT_FOUND = 'user not found'
    INVALID_OTP = 'Invalid or expired OTP.'
    USER_REGISTER_SUCCESSFULLY = 'User registered successfully.'
    EMAIL_PASSWORS_NOT_MATCHED = 'Email or password does not matched...'
    LOGIN_SUCESSDFULLY = "Login Sucess..."
    SHOW_USER_PROFILE = "Show user profile"
    ENTER_VALID_PASSWORD = "Please enter valid Password"
    OLD_AND_NEW_PASSWORD_NOT_MATCH = "Old password and new password both are the same , Please enter valid password"
    NEW_AND_CONFIRM_PASSWORD_NOT_MATCH = "New password and confirm password do not match"
    PASSWORD_UPDATE_SUCCESSFULLY = "Password updated successfully!"
    USER_DELETE_SUCCESSFULLY = "user Delete Successfully..."
    SIGN_OUT_SUCCESSFULLY = 'User Sign out successfully..'

    //product
    PRODUCT_NOT_FOUND = "Product not found.."
    PRODUCT_ALREADY_EXIST = 'Product Already exsit...'
    PRODUCT_ADDED = "Product added succesfully......"
    PRODUCT_UPDATED = "Product updated successfully..."
    PRODUCT_DELETE = "product Delete SuccessFully..."

    //cart
    CART_ALREADY_EXIST="Product is already available in your cart."
    CART_ADDED = "Cart added successfully"
    CART_NOT_FOUND = "Cart not found.."
    CART_UPDATED ='Cart updated successfully.'
    CART_DELETE = "cart delete succesfully..."

    //Wishlist
    PRODUCT_ADDE_WISHLIST = "Product added to wishlist successfully"
    PRODUCT_NOT_FOUND_WISHLIST ='Product not found in your wishlist' 
    PRODUCT_DELETE_WISHLIST='Product successfully removed from wishlist' 
    WISHLIST_NOT_FOUND ="Wishlist not found..." 

    //order
    ORDER_NOT_FOUND = "Order not found"
    ORDER_PLACE = "order places"
    ORDER_DELETE = "order delete sucessfully..."
    UPDATE_ADDRESS ='delivery address updated successfully...'

    //Review
    ALREADY_REVIEW_PRODUCT="You have already reviewed this product." 
    REVIEW_ADDED="Review added successfully."
    REVIEW_NOT_FOUND="Review not found or already deleted." 
    REVIEW_DELETE= "Review successfully deleted."

    INTERNAL_SERVER_ERROR = 'Internal server error'
}
module.exports = new MESSAGES()