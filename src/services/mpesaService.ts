import axios from 'axios';

// M-Pesa API Configuration
const config = {
  initiatorName: 'testapi',
  initiatorPassword: 'Safaricom123!!',
  partyA: '600977',
  partyB: '600000',
  phoneNumber: '254708374149',
  businessShortCode: '174379',
  passKey: 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919',
  consumerKey: 'd5iRpJIDRDmT8L7p0Jmb9Gbiq5jTZvw1aml1Cjv6w4kVS8zC',
  consumerSecret: 'e75xcis6lt6HWWASP5L7vMAaNU0H1bRdkZ38GCHJVn6xAuUtbrNnRdNtMNSrQTXy',
  baseURL: 'https://sandbox.safaricom.co.ke',
};

// Generate access token
const getAccessToken = async () => {
  try {
    const auth = Buffer.from(`${config.consumerKey}:${config.consumerSecret}`).toString('base64');
    const response = await axios.get(`${config.baseURL}/oauth/v1/generate?grant_type=client_credentials`, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
};

// Generate timestamp
const generateTimestamp = () => {
  return new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
};

// Generate password
const generatePassword = () => {
  const timestamp = generateTimestamp();
  const str = config.businessShortCode + config.passKey + timestamp;
  return Buffer.from(str).toString('base64');
};

// Register C2B URLs
export const registerC2BUrls = async () => {
  try {
    const accessToken = await getAccessToken();
    const response = await axios.post(
      `${config.baseURL}/mpesa/c2b/v1/registerurl`,
      {
        ShortCode: config.businessShortCode,
        ResponseType: 'Completed',
        ConfirmationURL: 'https://your-domain.com/api/c2b/confirmation',
        ValidationURL: 'https://your-domain.com/api/c2b/validation',
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error registering C2B URLs:', error);
    throw error;
  }
};

// Initiate C2B payment
export const initiateC2BPayment = async (amount: number, phoneNumber: string) => {
  try {
    const accessToken = await getAccessToken();
    const timestamp = generateTimestamp();
    const password = generatePassword();

    const response = await axios.post(
      `${config.baseURL}/mpesa/c2b/v1/simulate`,
      {
        ShortCode: config.businessShortCode,
        CommandID: 'CustomerPayBillOnline',
        Amount: amount,
        Msisdn: phoneNumber,
        BillReferenceNumber: 'TRINITY' + timestamp,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error initiating C2B payment:', error);
    throw error;
  }
};

// Handle C2B confirmation
export const handleC2BConfirmation = async (data: any) => {
  try {
    // Process the confirmation data
    // You can store the transaction details in your database here
    return {
      ResultCode: 0,
      ResultDesc: 'Success',
    };
  } catch (error) {
    console.error('Error handling C2B confirmation:', error);
    throw error;
  }
};

// Handle C2B validation
export const handleC2BValidation = async (data: any) => {
  try {
    // Validate the transaction data
    // You can add your validation logic here
    return {
      ResultCode: 0,
      ResultDesc: 'Success',
    };
  } catch (error) {
    console.error('Error handling C2B validation:', error);
    throw error;
  }
}; 