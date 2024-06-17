import { useContext, useEffect, useState } from "react"
import Logo from "../../atoms/Logo/Logo"
import { CombinedTypeForPayment } from "../../types/appTypes"
import { UserAuthContext } from "../../context/UserAuthContext"
import { PaystackButton } from "react-paystack"

const Payment = () => {
    const publicKey = "pk_test_c37f1833c1d0352d72b8f54069e675e952aa7e75";
    const { userData } = useContext(UserAuthContext);
    const [paymentData, setPaymentData] = useState<CombinedTypeForPayment>({
        name: "",
        email: "", 
        amount: 0
    })

    const componentProps = {
        email: paymentData.email,
        amount: paymentData.amount * 100, 
        metadata: {
            name: paymentData.name, 
            // phoneNumber: ""
        },
        publicKey, 
        text: "Subscribe to Digital Logbook Platform",
        onSuccess: () => alert("Thank you for donating"),
        onClose: () => alert("Are you sure you want to close?")
    }

    useEffect(() => {
        
        if(userData){
            setPaymentData({
                name: userData.user_metadata.studentName,
                email: userData.user_metadata.email,
                amount: userData.user_metadata.duration === "3" ? 500 : 1000
            })
        }
    }, [userData])

    // console.log(componentProps);

  return (
     <div className="profile">
      <Logo />
      <div className="profileHeader">
        <h2>Make your payment here</h2>
        <div className="profileForm">

            <div className="profileFormDiv">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                readOnly
                value={paymentData.name}
              />
            </div>
            <div className="profileFormDiv">
              <label htmlFor="email">Email Address:</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                readOnly
                value={paymentData.email}
              />
            </div>

            <div className="profileFormDiv">
              <label htmlFor="school">Amount:</label>
              <input
                type="text"
                id="school"
                name="schoolName"
                required
                value={paymentData.amount}
                readOnly
              />
            </div>

            {/* <button>Make Payment</button> */}
            <PaystackButton 
                amount={componentProps.amount}
                email={componentProps.email}
                publicKey={componentProps.publicKey}
                metadata={componentProps.metadata}
                text="Subscribe to Digital Logbook Platform"
                onSuccess={componentProps.onSuccess}
                onClose={componentProps.onClose}
                currency=""
            />
        </div>
      </div>
    </div>
  )
}

export default Payment