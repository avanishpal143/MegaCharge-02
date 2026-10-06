/**
 * src/services/razorpayService.js
 * Centralized production-ready Razorpay integration service (Tareeqa B: Secure Backend Order + Signature Verification)
 */

/**
 * Loads Razorpay script dynamically if not already available in window
 */
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

/**
 * Initiates Razorpay payment flow:
 * 1. Calls backend /api/create-order to create order_id
 * 2. Launches Razorpay standard modal with order_id
 * 3. On success, calls backend /api/verify-payment with HMAC-SHA256 signature
 * 4. Triggers onSuccess or onError callback
 */
export const processRazorpayPayment = async ({
  amount, // in Rupees (e.g. 39990)
  productName,
  customer = { name: '', phone: '', email: '' },
  notes = {},
  onSuccess = () => {},
  onError = () => {},
  onDismiss = () => {},
  setStage = () => {}, // optional state updater: 'creating_order' | 'awaiting_payment' | 'verifying'
}) => {
  try {
    setStage('creating_order');

    // 1. Ensure Razorpay SDK is loaded
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded || !window.Razorpay) {
      throw new Error('Razorpay SDK failed to load. Please check your internet connection.');
    }

    // Amount in Paise (INR * 100)
    const amountInPaise = Math.round(Number(amount) * 100);

    // 2. Call Backend to create Order (Tareeqa B)
    const orderResponse = await fetch('/api/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: amountInPaise,
        currency: 'INR',
        notes: {
          productName,
          customerName: customer.name,
          customerPhone: customer.phone,
          customerEmail: customer.email,
          ...notes,
        },
      }),
    });

    const orderData = await orderResponse.json();

    if (!orderResponse.ok || !orderData.id) {
      const errorMsg = orderData.error || 'Failed to create Razorpay order on server.';
      throw new Error(errorMsg);
    }

    const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID || orderData.key_id;

    if (!keyId) {
      throw new Error('VITE_RAZORPAY_KEY_ID is missing in your .env file.');
    }

    setStage('awaiting_payment');

    // 3. Open Razorpay Checkout Popup
    const options = {
      key: keyId,
      amount: orderData.amount,
      currency: orderData.currency || 'INR',
      name: 'MegaCharge (MNIL)',
      description: productName || 'EV Charging Station / Hub',
      image: '/Favicon_like.png',
      order_id: orderData.id, // Mandatory for Tareeqa B
      prefill: {
        name: customer.name || '',
        contact: customer.phone || '',
        email: customer.email || 'customer@megacharge.co.in',
      },
      theme: {
        color: '#EE8A33',
      },
      handler: async (response) => {
        try {
          setStage('verifying');

          // 4. Verify Payment Signature on Backend (Tareeqa B)
          const verifyResponse = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              amount,
              productName,
              customer,
              notes,
            }),
          });

          const verifyData = await verifyResponse.json();

          if (!verifyResponse.ok || !verifyData.success) {
            throw new Error(verifyData.error || 'Payment signature verification failed.');
          }

          const now = new Date();
          const receipt = {
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
            amount,
            productName,
            customer,
            date: now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
            time: now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
          };

          onSuccess(receipt);
        } catch (err) {
          console.error('Verification error:', err);
          onError(err.message || 'Payment verification failed.');
        }
      },
      modal: {
        ondismiss: () => {
          setStage('');
          onDismiss();
        },
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.on('payment.failed', (resp) => {
      setStage('');
      const reason = resp.error?.description || 'Payment was declined or failed.';
      onError(reason);
    });

    rzp.open();
  } catch (error) {
    setStage('');
    console.error('Payment initiation error:', error);
    onError(error.message || 'Could not initiate payment.');
  }
};
