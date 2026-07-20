import React, { useState, useEffect, useRef } from 'react';
import { Check, X, Star, Users, TrendingUp, BarChart3, Zap, Shield, ArrowRight, Clock, Target, Award, DollarSign, Eye, Bell, LineChart, Headphones, UserCheck, Video, TestTube, Calculator } from 'lucide-react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getFirestore, collection, addDoc, serverTimestamp, getDocs } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import ReCAPTCHA from "react-google-recaptcha";

// Add a safe useLanguage hook with fallback
const useLanguage = () => {
  return {
    currentLanguage: 'US',
  };
};

// ---- Calculator Component (Embedded)
const RestaurantCalculatorSection = () => {
  const [avgSpendPerReservation, setAvgSpendPerReservation] = useState(60);
  const [avgGuests, setAvgGuests] = useState(2.5);
  const [weeklyReservations, setWeeklyReservations] = useState(10);
  const [avgDiscount, setAvgDiscount] = useState(25);

  // Restaurant Calculator Logic
  const weeklyGrossRevenue = weeklyReservations * avgSpendPerReservation * avgGuests;
  const costOfDiscounts = weeklyGrossRevenue * (avgDiscount / 100);
  const netWeeklyRevenue = weeklyGrossRevenue - costOfDiscounts;

};

// ---- Translations
const content = {
  US: {
    heroBadge: 'Revenue-Generating Platform',
    heroH1a: 'Turn Empty Tables',
    heroH1b: 'Into Full Ones',
    heroDesc: "This is not simply software. This is a revenue-generating platform that fills your restaurant without the crushing commissions.",
    ctaStart: 'Start Growing Revenue Today',
    ctaDemo: 'Watch Demo',
    ctaTest: 'Request Test Account',
    howTitle: 'How It Works',
    howSub: "Three simple steps to transform your restaurant's revenue stream",
    steps: [
      { title: 'Publish time-based deals', desc: 'Choose your date & hours and set your offers with our intuitive dashboard.' },
      { title: 'Reach new diners', desc: 'Customers discover your offers and reserve tables through our premium app.' },
      { title: 'Get guaranteed revenue', desc: 'Diners present their unique codes and you gain valuable new customers.' },
    ],
    whyTitle: 'Why Restaurants Choose Dinery',
    whySub: 'Proven results that speak for themselves',
    value: [
      { title: 'Revenue Growth', desc: 'Fill seats during off-peak hours and maximize your daily earnings.', stat: '+35% average revenue increase' },
      { title: 'Zero Commissions', desc: 'Keep 100% of your margins without sharing profits with delivery platforms.', stat: 'Save up to $3,000/month' },
      { title: 'Smart Analytics', desc: 'Access detailed customer insights and optimize your business strategy.', stat: 'Real-time data dashboard' },
    ],
    cmpTitle: 'The Clear Choice',
    cmpSub: 'See how Dinery compares to traditional delivery platforms',
    cmpHeaders: { delivery: 'Delivery Platforms', dinery: 'Dinery.ai' },
    cmpRows: [
      { feature: 'Commission fees', delivery: 'Up to 30%', dinery: '0%' },
      { feature: 'Cannibalizes existing customers', delivery: 'Yes', dinery: 'No – new diners only' },
      { feature: 'Customer data access', delivery: 'Hidden from you', dinery: 'Full transparency' },
      { feature: 'Business focus', delivery: 'Delivery only', dinery: 'Dine-in growth + takeaway' },
    ],
    loyaltyTitle: 'Premium Customer Loyalty System',
    loyaltySub: 'Our tiered system automatically rewards your most valuable customers',
    loyaltyQuote: 'Our loyalty system adds a dynamic layer on top of your own offers, designed to highlight your restaurant to the most valuable diners.',
    loyaltyBenefits: [
      'These customers are heavy users of restaurant services who return frequently',
      'By offering them extra value, we ensure your restaurant stays top of mind',
    ],
    tiers: [
      { name: 'Bronze', discount: 'Base discount', desc: 'Frequent, valuable diners' },
      { name: 'Silver', discount: '+5% extra', desc: 'Frequent, valuable diners' },
      { name: 'Gold', discount: '+10% extra', desc: 'Frequent, valuable diners' },
    ],
    pricingBadge: 'Transparent Pricing',
    pricingTitle: 'Choose Your Growth Plan',
    pricingSub: 'Start free, scale when ready. No hidden fees, no commission cuts.',
    pricingMost: 'Most Popular',
    pricingBtn: 'Get Started',
    plans: [
    { name: 'Starter', price: '€0', subtitle: 'Beta / €49 after', yearly: '€490/year', desc: 'Perfect for trying out Dinery' },
    { name: 'Growth', price: '€99', subtitle: 'Most popular choice', yearly: '€990/year', desc: 'Ideal for growing restaurants' },
    { name: 'Professional', price: '€149', subtitle: 'Maximum growth potential', yearly: '€1,490/year', desc: 'Complete restaurant optimization' },
  ],
    features: {
      visibility: 'Visibility in Dinery app', offers: 'Publish offers per month', reservations: 'Time-based reservations & codes',
      analytics: 'Customer list & basic analytics', notifications: 'Push notifications to diners', reporting: 'Advanced reporting',
      points: 'Dinery Points System', support: '24/7 support', manager: 'Dedicated account manager', social: 'Social media promotion',
      unlimited: 'Unlimited', priority: 'Priority placement', perMonth: '/month'
    },
  },
  // Other languages omitted for brevity - keep your existing translations
};

const RestaurantOnboarding = () => {
  const { currentLanguage } = useLanguage();
  const lang = currentLanguage === 'UK' ? 'US' : currentLanguage;
  const t = content[lang] || content.US;

  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [activePlan, setActivePlan] = useState(1);

  const [showLeadForm, setShowLeadForm] = useState(false);
  const [isTestAccount, setIsTestAccount] = useState(false);
  const [lead, setLead] = useState({ firstName: '', lastName: '', email: '', contact: '', website: '' });
  const [formErr, setFormErr] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState('');
  const [captchaToken, setCaptchaToken] = useState("");
  const recaptchaRef = useRef(null);
  const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "";

  const onLeadChange = (e) => {
    const { name, value } = e.target;
    setLead((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const submitLead = async (e) => {
    e.preventDefault();
    setFormErr('');
    setSubmitMsg('');

    if (!lead.firstName || !lead.lastName || !lead.email || !lead.contact || !lead.website) {
      setFormErr('Please complete all fields.');
      return;
    }
    if (!validateEmail(lead.email)) {
      setFormErr('Please enter a valid email address.');
      return;
    }
    
    if (RECAPTCHA_SITE_KEY && !captchaToken) {
      setFormErr('Please complete the CAPTCHA before submitting.');
      return;
    }

    const tempPassword = Math.random().toString(36).slice(-10);

    try {
    setSubmitting(true);
    const db = getFirestore(app);
    
    // Get admin emails first
    const adminEmailsSnapshot = await getDocs(collection(db, 'AdminEmail'));
    const adminEmails = adminEmailsSnapshot.docs.map(doc => doc.data().Email);
    
    if (isTestAccount) {
      // Test account logic remains the same
      await addDoc(collection(db, 'AccountRequestTesting'), {
        ...lead,
        plan: (selectedPlan || 'Starter').toLowerCase(),
        createdAt: serverTimestamp(),
        source: 'web_test_account_request',
        status: 'pending'
      });

      await addDoc(collection(db, 'mail'), {
        to: adminEmails,
        message: {
          subject: `🧪 Test Account Request - ${lead.firstName} ${lead.lastName}`,
          html: `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 30px; text-center;">
              <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">🧪 Test Account Request</h1>
            </div>
            
            <div style="background: #ffffff; padding: 30px;">
              <h2 style="color: #111827; margin: 0 0 20px 0; font-size: 18px; font-weight: 600;">Request Details</h2>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid #f3f4f6;">
                  <td style="padding: 12px 0; color: #6b7280; font-weight: 500;">👤 Owner:</td>
                  <td style="padding: 12px 0; color: #111827; text-align: right;">${lead.firstName} ${lead.lastName}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f3f4f6;">
                  <td style="padding: 12px 0; color: #6b7280; font-weight: 500;">📧 Email:</td>
                  <td style="padding: 12px 0; text-align: right;">
                    <a href="mailto:${lead.email}" style="color: #2563eb; text-decoration: none;">${lead.email}</a>
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid #f3f4f6;">
                  <td style="padding: 12px 0; color: #6b7280; font-weight: 500;">📱 Contact:</td>
                  <td style="padding: 12px 0; color: #111827; text-align: right;">${lead.contact}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f3f4f6;">
                  <td style="padding: 12px 0; color: #6b7280; font-weight: 500;">🌐 Website:</td>
                  <td style="padding: 12px 0; text-align: right;">
                    <a href="${lead.website}" style="color: #2563eb; text-decoration: none;" target="_blank">${lead.website}</a>
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid #f3f4f6;">
                  <td style="padding: 12px 0; color: #6b7280; font-weight: 500;">💼 Plan:</td>
                  <td style="padding: 12px 0; text-align: right;">
                    <span style="background: #fef3c7; color: #92400e; padding: 4px 12px; border-radius: 12px; font-size: 14px; font-weight: 500;">${selectedPlan || 'Starter'}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; color: #6b7280; font-weight: 500;">📍 Source:</td>
                  <td style="padding: 12px 0; color: #111827; text-align: right;">Web Test Account Request</td>
                </tr>
              </table>
              
              <div style="margin-top: 24px; padding: 16px; background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px;">
                <p style="margin: 0; color: #92400e; font-size: 14px;">
                  <strong>⚠️ Action Required:</strong> This is a test account request. Please review and create the test account manually.
                </p>
              </div>
            </div>
            
            <div style="background: #f9fafb; padding: 20px; text-center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-size: 12px;">This is an automated notification from the Dinery platform.</p>
            </div>
          </div>`,
        },
      });

      setSubmitMsg('Test account request submitted successfully! Our team will review and contact you within 24 hours.');
      
  } else {
    // REGULAR ACCOUNT CREATION
    const tempPassword = Math.random().toString(36).slice(-10);
    
    console.log('═══════════════════════════════════════════════════════');
    console.log('🚀 STARTING ACCOUNT CREATION PROCESS');
    console.log('═══════════════════════════════════════════════════════');
    console.log('📋 User Details:', {
      firstName: lead.firstName,
      lastName: lead.lastName,
      email: lead.email,
      contact: lead.contact,
      website: lead.website,
      plan: selectedPlan || 'Starter',
      tempPassword: tempPassword
    });
    
    // Save lead first
    console.log('💾 Saving lead to Firestore...');
    const leadDoc = await addDoc(collection(db, 'restaurantOnboardingLeads'), {
      ...lead,
      plan: (selectedPlan || 'Starter').toLowerCase(),
      createdAt: serverTimestamp(),
      source: 'web_pricing_modal',
      tempPassword: tempPassword,
      status: 'processing'
    });

    console.log('✅ Lead saved with ID:', leadDoc.id);

    // Get admin emails
    console.log('📧 Fetching admin emails...');
    const adminEmailsSnapshot = await getDocs(collection(db, 'AdminEmail'));
    const adminEmails = adminEmailsSnapshot.docs.map(doc => doc.data().Email);
    console.log('✅ Admin emails found:', adminEmails);

    // Call Cloud Function
    const functionUrl = `https://us-central1-${app.options.projectId}.cloudfunctions.net/provisionRestaurantAccount`;
    
    console.log('═══════════════════════════════════════════════════════');
    console.log('🔄 CALLING CLOUD FUNCTION');
    console.log('═══════════════════════════════════════════════════════');
    console.log('📍 Function URL:', functionUrl);
    
    let response;
    try {
      const requestBody = {
        email: lead.email,
        firstName: lead.firstName,
        lastName: lead.lastName,
        contact: lead.contact,
        website: lead.website,
        plan: (selectedPlan || 'Starter').toLowerCase(),
        password: tempPassword,
        role: 'Owner'
      };
      
      console.log('📤 Request payload:', requestBody);
      
      response = await fetch(functionUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('📡 Cloud Function HTTP Status:', response.status);
      console.log('📡 Response OK:', response.ok);
      
    } catch (fetchError) {
      console.error('❌ FETCH ERROR:', fetchError);
      console.error('Error details:', {
        message: fetchError.message,
        stack: fetchError.stack
      });
      throw new Error('Failed to connect to account creation service. Please try again.');
    }

    let result;
    try {
      result = await response.json();
      console.log('═══════════════════════════════════════════════════════');
      console.log('📦 CLOUD FUNCTION RESPONSE');
      console.log('═══════════════════════════════════════════════════════');
      console.log('Response data:', JSON.stringify(result, null, 2));
    } catch (jsonError) {
      console.error('❌ JSON PARSE ERROR:', jsonError);
      throw new Error('Invalid response from server. Please try again.');
    }

    if (!response.ok) {
      console.error('❌ Cloud Function returned error:', result);
      throw new Error(result.error || 'Failed to create account');
    }

    // Check if account was created successfully
    const created = !!(
      result && 
      (result.created === true || 
      result.success === true || 
      result.uid || 
      (result.user && result.user.uid))
    );

    console.log('✅ Account creation verified:', created);
    console.log('🆔 User UID:', result.uid || 'N/A');

    if (!created) {
      console.error('⚠️ UNCERTAIN ACCOUNT STATUS');
      console.error('Response did not contain expected success flags');
      
      // Send admin notification about uncertain status
      const uncertainEmailRef = await addDoc(collection(db, 'mail'), {
        to: adminEmails,
        message: {
          subject: `⚠️ Account Creation - Uncertain Status - ${lead.email}`,
          html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color:#f59e0b;">⚠️ Account Creation - Uncertain Status</h2>
            <p>Attempted to create account for <strong>${lead.email}</strong> but the Cloud Function response was unclear.</p>
            <p><strong>User Info:</strong></p>
            <ul>
              <li>Name: ${lead.firstName} ${lead.lastName}</li>
              <li>Email: ${lead.email}</li>
              <li>Contact: ${lead.contact}</li>
              <li>Website: ${lead.website}</li>
              <li>Plan: ${selectedPlan || 'Starter'}</li>
            </ul>
            <p><strong>Response from Cloud Function:</strong></p>
            <pre style="background:#f3f4f6;padding:12px;border-radius:6px;overflow:auto;">${JSON.stringify(result, null, 2)}</pre>
            <p><strong>Action Required:</strong> Please verify if the account was created in Firebase Auth and send credentials to the user manually if needed.</p>
          </div>`,
        },
      });
      
      console.log('📧 Uncertain status email queued with ID:', uncertainEmailRef.id);
      
      setSubmitMsg('Your request has been received. Our team will contact you shortly with your account details.');
    }

    console.log('═══════════════════════════════════════════════════════');
    console.log('📧 QUEUING NOTIFICATION EMAILS');
    console.log('═══════════════════════════════════════════════════════');

    try {
      // Admin notification email
      console.log('📤 Sending ADMIN notification email...');
      console.log('Recipients:', adminEmails);
      
      const adminEmailRef = await addDoc(collection(db, 'mail'), {
        to: adminEmails,
        message: {
          subject: `🎉 New Restaurant Account - ${lead.firstName} ${lead.lastName}`,
          html: `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); padding: 30px; text-center;">
              <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">🎉 New Restaurant Account Created</h1>
            </div>
            
            <div style="background: #ffffff; padding: 30px;">
              <h2 style="color: #111827; margin: 0 0 20px 0; font-size: 18px; font-weight: 600;">Account Details</h2>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid #f3f4f6;">
                  <td style="padding: 12px 0; color: #6b7280; font-weight: 500;">👤 Owner:</td>
                  <td style="padding: 12px 0; color: #111827; text-align: right;">${lead.firstName} ${lead.lastName}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f3f4f6;">
                  <td style="padding: 12px 0; color: #6b7280; font-weight: 500;">📧 Email:</td>
                  <td style="padding: 12px 0; text-align: right;">
                    <a href="mailto:${lead.email}" style="color: #2563eb; text-decoration: none;">${lead.email}</a>
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid #f3f4f6;">
                  <td style="padding: 12px 0; color: #6b7280; font-weight: 500;">🔑 Temp Password:</td>
                  <td style="padding: 12px 0; color: #111827; text-align: right; font-family: monospace; background: #f3f4f6; padding: 8px; border-radius: 4px;">${tempPassword}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f3f4f6;">
                  <td style="padding: 12px 0; color: #6b7280; font-weight: 500;">📱 Contact:</td>
                  <td style="padding: 12px 0; color: #111827; text-align: right;">${lead.contact}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f3f4f6;">
                  <td style="padding: 12px 0; color: #6b7280; font-weight: 500;">🌐 Website:</td>
                  <td style="padding: 12px 0; text-align: right;">
                    <a href="${lead.website}" style="color: #2563eb; text-decoration: none;" target="_blank">${lead.website}</a>
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid #f3f4f6;">
                  <td style="padding: 12px 0; color: #6b7280; font-weight: 500;">💼 Plan:</td>
                  <td style="padding: 12px 0; text-align: right;">
                    <span style="background: #fef3c7; color: #92400e; padding: 4px 12px; border-radius: 12px; font-size: 14px; font-weight: 500;">${selectedPlan || 'Starter'}</span>
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid #f3f4f6;">
                  <td style="padding: 12px 0; color: #6b7280; font-weight: 500;">🆔 User ID:</td>
                  <td style="padding: 12px 0; color: #111827; text-align: right; font-family: monospace; font-size: 12px;">${result.uid || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; color: #6b7280; font-weight: 500;">📍 Source:</td>
                  <td style="padding: 12px 0; color: #111827; text-align: right;">Web Pricing Modal</td>
                </tr>
              </table>
            </div>
            
            <div style="background: #f9fafb; padding: 20px; text-center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-size: 12px;">This is an automated notification from the Dinery platform.</p>
            </div>
          </div>`,
        },
      });
      
      console.log('✅ Admin email queued successfully!');
      console.log('📋 Admin Email Document ID:', adminEmailRef.id);
      console.log('📬 Email will be sent to:', adminEmails.join(', '));
      
      // User welcome email
      console.log('📤 Sending USER welcome email...');
      console.log('Recipient:', lead.email);
      
      const userEmailRef = await addDoc(collection(db, 'mail'), {
        to: [lead.email],
        message: {
          subject: 'Welcome to Dinery.ai – Your Restaurant Account is Ready! 🎉',
          html: `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); padding: 30px; text-center;">
              <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">🎉 Welcome to Dinery.ai</h1>
              <p style="color: #fed7aa; margin: 10px 0 0 0; font-size: 14px;">Your restaurant account is ready to use!</p>
            </div>
            
            <div style="background: #ffffff; padding: 30px;">
              <p style="font-size: 16px; color: #111827; margin: 0 0 16px 0;">Hi ${lead.firstName},</p>
              
              <p style="font-size: 14px; color: #4b5563; line-height: 1.6; margin: 0 0 24px 0;">
                Great news! Your Dinery.ai restaurant account has been successfully created. You can now start filling your empty tables and growing your revenue.
              </p>
              
              <div style="background: #f3f4f6; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                <h3 style="color: #111827; margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">Your Login Credentials</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Email:</td>
                    <td style="padding: 8px 0; text-align: right;">
                      <a href="mailto:${lead.email}" style="color: #2563eb; text-decoration: none; font-weight: 500;">${lead.email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Temporary Password:</td>
                    <td style="padding: 8px 0; text-align: right;">
                      <code style="background: #ffffff; color: #111827; padding: 8px 12px; border-radius: 6px; font-family: 'Courier New', monospace; font-weight: 600; font-size: 16px; border: 2px solid #e5e7eb;">${tempPassword}</code>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Plan:</td>
                    <td style="padding: 8px 0; text-align: right;">
                      <span style="background: #fef3c7; color: #92400e; padding: 4px 12px; border-radius: 12px; font-size: 14px; font-weight: 500;">${selectedPlan || 'Starter'}</span>
                    </td>
                  </tr>
                </table>
              </div>
              
              <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin-bottom: 24px; border-radius: 4px;">
                <p style="margin: 0; color: #92400e; font-size: 14px; font-weight: 500;">
                  🔒 <strong>Important:</strong> Please change your password immediately after logging in for security purposes.
                </p>
              </div>
              
              <div style="text-align: center; margin: 32px 0;">
                <a href="https://dinery-ai.netlify.app/" style="display: inline-block; padding: 14px 40px; background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(249, 115, 22, 0.2);">
                  Login to Your Dashboard →
                </a>
              </div>
              
              <div style="background: #eff6ff; border-radius: 8px; padding: 20px; margin-top: 24px;">
                <h4 style="color: #1e40af; margin: 0 0 12px 0; font-size: 14px; font-weight: 600;">What's Next?</h4>
                <ul style="margin: 0; padding-left: 20px; color: #1e3a8a; font-size: 14px; line-height: 1.8;">
                  <li>Complete your restaurant profile</li>
                  <li>Set up your first time-based offer</li>
                  <li>Start attracting new diners to fill empty tables</li>
                </ul>
              </div>
              
              <p style="font-size: 14px; color: #4b5563; line-height: 1.6; margin: 24px 0 8px 0;">
                Need help getting started? Our team is here to support you every step of the way.
              </p>
              
              <p style="font-size: 14px; color: #4b5563; margin: 24px 0 0 0;">
                Best regards,<br>
                <strong>The Dinery.ai Team</strong>
              </p>
            </div>
            
            <div style="background: #f9fafb; padding: 20px; text-center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 12px;">This is an automated email from Dinery.ai</p>
              <p style="margin: 0; color: #6b7280; font-size: 12px;">
                If you didn't create this account, please ignore this email or <a href="mailto:support@dinery.ai" style="color: #2563eb;">contact support</a>
              </p>
            </div>
          </div>`,
        },
      });
      
      console.log('✅ User welcome email queued successfully!');
      console.log('📋 User Email Document ID:', userEmailRef.id);
      console.log('📬 Email will be sent to:', lead.email);
      
      console.log('═══════════════════════════════════════════════════════');
      console.log('✅ EMAIL SUMMARY');
      console.log('═══════════════════════════════════════════════════════');
      console.log('Total emails queued: 2');
      console.log('Admin email ID:', adminEmailRef.id);
      console.log('User email ID:', userEmailRef.id);
      console.log('');
      console.log('📝 Note: Emails are added to Firestore "mail" collection');
      console.log('📧 Firebase Email Extension will process them automatically');
      console.log('🔍 Check Firestore Console → mail collection to see email status');
      console.log('═══════════════════════════════════════════════════════');

      if (created) {
        setSubmitMsg('🎉 Success! Account created. Check your email for login credentials.');
      }
      
    } catch (emailError) {
      console.error('═══════════════════════════════════════════════════════');
      console.error('❌ EMAIL QUEUING ERROR');
      console.error('═══════════════════════════════════════════════════════');
      console.error('Error details:', emailError);
      console.error('Error message:', emailError.message);
      console.error('Error stack:', emailError.stack);
      console.error('═══════════════════════════════════════════════════════');
      
      // Don't fail the whole process if emails fail
      setSubmitMsg('Account created, but there was an issue sending the confirmation email. Our team will contact you shortly.');
    }

    console.log('═══════════════════════════════════════════════════════');
    console.log('🎯 ACCOUNT CREATION PROCESS COMPLETED');
    console.log('═══════════════════════════════════════════════════════');
  }

    // Reset form
    setCaptchaToken("");
    if (recaptchaRef.current) recaptchaRef.current.reset();
    
    setTimeout(() => {
      setShowLeadForm(false);
      setLead({ firstName: '', lastName: '', email: '', contact: '', website: '' });
      setSelectedPlan(null);
      setSubmitMsg('');
      setIsTestAccount(false);
    }, 5000); // Increased to 5 seconds so user can read the success message

    } catch (err) {
      console.error('❌ Provisioning error:', err);
      setFormErr(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
    };

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => setActiveStep((p) => (p + 1) % 3), 3000);
    return () => clearInterval(interval);
  }, []);

  const steps = t.steps.map((s, i) => ({
    number: i + 1,
    title: s.title,
    description: s.desc,
    icon: i === 0 ? <Clock className="w-8 h-8" /> : i === 1 ? <Target className="w-8 h-8" /> : <Award className="w-8 h-8" />,
    color: i === 0 ? 'from-blue-500 to-blue-600' : i === 1 ? 'from-purple-500 to-purple-600' : 'from-green-500 to-green-600'
  }));

  const valueProps = t.value.map((v, idx) => ({
    icon: idx === 0 ? <TrendingUp className="w-10 h-10" /> : idx === 1 ? <Shield className="w-10 h-10" /> : <BarChart3 className="w-10 h-10" />,
    title: v.title,
    description: v.desc,
    stats: v.stat,
    color: ['bg-gradient-to-br from-emerald-50 to-green-100','bg-gradient-to-br from-blue-50 to-indigo-100','bg-gradient-to-br from-purple-50 to-violet-100'][idx]
  }));

  const comparisonData = t.cmpRows.map(r => ({
    feature: r.feature,
    delivery: { text: r.delivery, negative: true },
    dinery: { text: r.dinery, highlight: true }
  }));

  const membershipTiers = t.tiers.map((tier, i) => ({
    name: tier.name,
    discount: tier.discount,
    description: tier.desc,
    color: ['from-amber-400 to-amber-600', 'from-gray-400 to-gray-600', 'from-yellow-400 to-yellow-600'][i],
    icon: <Star className="w-6 h-6" />
  }));

  const pricingPlans = t.plans.map((p, i) => ({
    name: p.name,
    price: p.price,
    subtitle: p.subtitle,
    yearlyPrice: p.yearly,
    description: p.desc,
    popular: i === 1,
    features: [
      { name: t.features.visibility, value: true, icon: <Eye className="w-4 h-4" /> },
      { name: t.features.offers, value: i === 0 ? '2' : t.features.unlimited, icon: <BarChart3 className="w-4 h-4" /> },
      { name: t.features.reservations, value: true, icon: <Clock className="w-4 h-4" /> },
      { name: t.features.analytics, value: i > 0, icon: <LineChart className="w-4 h-4" /> },
      { name: t.features.notifications, value: i === 0 ? false : i === 2 ? t.features.priority : true, icon: <Bell className="w-4 h-4" /> },
      { name: t.features.reporting, value: i === 2, icon: <BarChart3 className="w-4 h-4" /> },
      { name: t.features.points, value: true, icon: <Award className="w-4 h-4" /> },
      { name: t.features.support, value: true, icon: <Headphones className="w-4 h-4" /> },
      { name: t.features.manager, value: i === 2, icon: <UserCheck className="w-4 h-4" /> },
      { name: t.features.social, value: i === 2, icon: <Video className="w-4 h-4" /> }
    ]
  }));

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-block bg-orange-500/10 backdrop-blur-sm border border-orange-500/20 rounded-full px-6 py-2 mb-8">
              <span className="text-orange-400 font-medium">{t.heroBadge}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {t.heroH1a}
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                {t.heroH1b}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {t.heroDesc}
            </p>
            
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button
                  onClick={() => {
                    setIsTestAccount(false);
                    setShowLeadForm(true);
                  }}
                  className="group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-10 py-5 rounded-full font-semibold text-lg shadow-2xl hover:shadow-orange-500/25 transform hover:scale-105 transition-all duration-300"
                >
                  {t.ctaStart}
                  <ArrowRight className="inline ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
          
          {/* NEW: Calculator Link Button */}
          <button
            onClick={() => window.location.href = '/calculators'}
            className="group bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-10 py-5 rounded-full font-semibold text-lg shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300"
          >
            <Calculator className="inline mr-2 w-5 h-5" />
            Revenue Calculator
          </button>
          
          <button
            onClick={() => {
              setIsTestAccount(true);
              setShowLeadForm(true);
            }}
            className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-10 py-5 rounded-full font-semibold text-lg shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300"
          >
            <TestTube className="inline mr-2 w-5 h-5" />
            {t.ctaTest}
          </button>
        </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {t.howTitle}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.howSub}</p>
          </div>
          
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200 transform -translate-y-1/2 hidden lg:block"></div>
            
            <div className="grid lg:grid-cols-3 gap-12">
              {steps.map((step, index) => (
                <div 
                  key={step.number}
                  className={`relative group cursor-pointer transition-all duration-500 ${
                    activeStep === index ? 'scale-105' : 'hover:scale-102'
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  <div className={`bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 ${
                    activeStep === index ? 'border-orange-200 shadow-orange-100' : 'border-gray-100'
                  }`}>
                    <div className="relative mb-8">
                      <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mx-auto shadow-lg transform transition-all duration-300 ${
                        activeStep === index ? 'scale-110' : ''
                      }`}>
                        <div className="text-white">{step.icon}</div>
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {step.number}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6 text-gray-900">{t.whyTitle}</h2>
            <p className="text-xl text-gray-600">{t.whySub}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {valueProps.map((prop, index) => (
              <div key={index} className={`group relative overflow-hidden rounded-3xl p-8 ${prop.color} hover:shadow-2xl transition-all duration-500 cursor-pointer`}>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-gray-700 group-hover:scale-110 transition-transform duration-300">{prop.icon}</div>
                    <div className="text-sm font-semibold text-gray-600 bg-white/60 rounded-full px-3 py-1">{prop.stats}</div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{prop.title}</h3>
                  <p className="text-gray-700 leading-relaxed text-lg">{prop.description}</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6 text-gray-900">{t.cmpTitle}</h2>
            <p className="text-xl text-gray-600">{t.cmpSub}</p>
          </div>
          
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-3 bg-gradient-to-r from-gray-900 to-black text-white">
              <div className="p-6"></div>
              <div className="p-6 text-center border-l border-gray-700">
                <h4 className="font-semibold text-lg text-gray-300">{t.cmpHeaders.delivery}</h4>
              </div>
              <div className="p-6 text-center border-l border-orange-600 bg-gradient-to-r from-orange-600 to-orange-500">
                <h4 className="font-semibold text-lg">{t.cmpHeaders.dinery}</h4>
              </div>
            </div>
            
            {comparisonData.map((row, index) => (
              <div key={index} className={`grid grid-cols-3 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                <div className="p-6 font-semibold text-gray-900 flex items-center">{row.feature}</div>
                <div className={`p-6 text-center border-l border-gray-200 flex items-center justify-center ${
                  row.delivery.negative ? 'text-red-600 bg-red-50' : 'text-gray-700'
                }`}>{row.delivery.text}</div>
                <div className="p-6 text-center border-l border-orange-200 bg-orange-50 flex items-center justify-center">
                  <span className="font-semibold text-orange-700">{row.dinery.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Loyalty System */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6 text-gray-900">{t.loyaltyTitle}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.loyaltySub}</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8">
                <p className="text-lg text-gray-700 italic leading-relaxed mb-6">"{t.loyaltyQuote}"</p>
                <div className="space-y-4">
                  {t.loyaltyBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <p className="text-gray-700">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              {membershipTiers.map((tier, index) => (
                <div key={index} className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className={`absolute inset-0 bg-gradient-to-r ${tier.color} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${tier.color} flex items-center justify-center text-white shadow-lg`}>
                        {tier.icon}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">{tier.name} Members</h4>
                        <p className="text-gray-600">{tier.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">{tier.discount}</div>
                      <div className="text-sm text-gray-500">vs your base offer</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block bg-orange-500/10 backdrop-blur-sm border border-orange-500/20 rounded-full px-6 py-2 mb-6">
              <span className="text-orange-400 font-medium">{t.pricingBadge}</span>
            </div>
            <h2 className="text-5xl font-bold mb-6 text-white">{t.pricingTitle}</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t.pricingSub}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index}
                className={`relative group cursor-pointer transition-all duration-500 ${
                  plan.popular ? 'scale-105 z-10' : 'hover:scale-102'
                }`}
                onClick={() => setActivePlan(index)}
              >  
                {index > 0 && (
                  <div className="absolute -top-4 right-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg z-20">
                    Coming Soon
                  </div>
                )}
                
                <div className={`relative rounded-3xl p-8 transition-all duration-500 ${
                  plan.popular 
                    ? 'bg-gradient-to-br from-orange-500 to-orange-600 shadow-2xl shadow-orange-500/25' 
                    : 'bg-gray-800 hover:bg-gray-750 shadow-xl'
                } border ${
                  plan.popular ? 'border-orange-400' : 'border-gray-700'
                } ${index > 0 ? 'opacity-75' : ''}`}>
                  
                  <div className="text-center mb-8 relative z-10">
                    <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-white'}`}>
                      {plan.name}
                    </h3>
                    <div className={`text-sm mb-4 ${plan.popular ? 'text-orange-100' : 'text-gray-400'}`}>
                      {plan.subtitle}
                    </div>
                    <div className="mb-4">
                      <span className={`text-5xl font-bold ${plan.popular ? 'text-white' : 'text-orange-400'}`}>
                        {plan.price}
                      </span>
                      <span className={`text-lg ${plan.popular ? 'text-orange-100' : 'text-gray-400'}`}>
                        {t.features.perMonth}
                      </span>
                    </div>
                    <div className={`text-sm ${plan.popular ? 'text-orange-200' : 'text-gray-500'}`}>
                      {plan.yearlyPrice}
                    </div>
                    <p className={`mt-4 ${plan.popular ? 'text-orange-100' : 'text-gray-300'}`}>
                      {plan.description}
                    </p>
                  </div>
                  
                  <div className="space-y-4 mb-8 relative z-10">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`${plan.popular ? 'text-orange-200' : 'text-gray-400'}`}>
                            {feature.icon}
                          </div>
                          <span className={`text-sm ${plan.popular ? 'text-orange-100' : 'text-gray-300'}`}>
                            {feature.name}
                          </span>
                        </div>
                        <div>
                          {feature.value === true ? (
                            <Check className={`w-5 h-5 ${plan.popular ? 'text-orange-200' : 'text-green-400'}`} />
                          ) : feature.value === false ? (
                            <X className={`w-5 h-5 ${plan.popular ? 'text-orange-300' : 'text-gray-500'}`} />
                          ) : (
                            <span className={`text-sm font-medium ${plan.popular ? 'text-white' : 'text-white'}`}>
                              {feature.value}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePlan(index);
                      setSelectedPlan(plan.name);
                      setIsTestAccount(false);
                      setShowLeadForm(true);
                    }}
                    className={`relative z-10 w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                      plan.popular 
                        ? 'bg-white text-orange-600 hover:bg-orange-50 shadow-lg' 
                        : 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg hover:shadow-orange-500/25'
                    }`}
                  >
                    {t.pricingBtn}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form Modal - keeping your existing modal code */}
      {showLeadForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70 backdrop-blur-sm" 
            onClick={() => setShowLeadForm(false)} 
          />
          
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all animate-slideUp">
            <div className={`relative px-8 py-6 ${isTestAccount ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gradient-to-r from-orange-500 to-orange-600'} text-white overflow-hidden`}>
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
              
              <div className="relative flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-1">
                    {isTestAccount ? 'Request Test Account' : 'Start Your Journey'}
                  </h3>
                  <p className={`${isTestAccount ? 'text-blue-100' : 'text-orange-100'} text-sm`}>
                    {isTestAccount ? 'Try Dinery with a test account' : 'Join restaurants already growing with Dinery'}
                  </p>
                </div>
                <button
                  onClick={() => setShowLeadForm(false)}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {selectedPlan && (
                <div className="relative mt-4 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-full">
                  <Star className="w-4 h-4 text-yellow-300" />
                  <span className="text-sm font-semibold">{selectedPlan} Plan Selected</span>
                </div>
              )}
              
              {isTestAccount && (
                <div className="relative mt-4 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-full">
                  <TestTube className="w-4 h-4" />
                  <span className="text-sm font-semibold">Test Account Request</span>
                </div>
              )}
            </div>

            <form onSubmit={submitLead} className="p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-orange-500" />
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={lead.firstName}
                    onChange={onLeadChange}
                    required
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-200 hover:border-gray-300"
                    placeholder="John"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-orange-500" />
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={lead.lastName}
                    onChange={onLeadChange}
                    required
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-200 hover:border-gray-300"
                    placeholder="Doe"
                  />
                </div>

                <div className="sm:col-span-2 group">
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={lead.email}
                    onChange={onLeadChange}
                    required
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-200 hover:border-gray-300"
                    placeholder="john@restaurant.com"
                  />
                </div>

                <div className="sm:col-span-2 group">
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    name="contact"
                    value={lead.contact}
                    onChange={onLeadChange}
                    required
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-200 hover:border-gray-300"
                    placeholder="+358 40 123 4567"
                  />
                </div>

                <div className="sm:col-span-2 group">
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6" />
                    </svg>
                    Restaurant Webpage or URL *
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={lead.website || ''}
                    onChange={onLeadChange}
                    required
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-200 hover:border-gray-300"
                    placeholder="https://yourrestaurant.com"
                  />
                </div>
              </div>

              {formErr && (
                <div className="mt-6 flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                    <X className="w-3 h-3 text-white" />
                  </div>
                  <p className="text-sm text-red-700">{formErr}</p>
                </div>
              )}

              {submitMsg && (
                <div className="mt-6 flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <p className="text-sm text-green-700">{submitMsg}</p>
                </div>
              )}

              <div className="mt-6">
                {RECAPTCHA_SITE_KEY ? (
                  <div className="flex justify-center">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={RECAPTCHA_SITE_KEY}
                      onChange={(token) => setCaptchaToken(token || "")}
                      onExpired={() => setCaptchaToken("")}
                      onError={() => setCaptchaToken("")}
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-xs text-amber-600 mb-4">
                      reCAPTCHA site key is not set. Add VITE_RECAPTCHA_SITE_KEY to your .env for bot protection.
                    </p>
                    <div className="inline-flex bg-white border border-gray-300 rounded-lg p-4 items-center space-x-3">
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 text-orange-500" 
                        onChange={(e) => setCaptchaToken(e.target.checked ? "development-token" : "")}
                      />
                      <span className="text-sm text-gray-700">I'm not a robot</span>
                      <div className="text-xs text-gray-500 ml-4">reCAPTCHA</div>
                    </div>
                  </div>
                )}

                {RECAPTCHA_SITE_KEY && (
                  <p className="text-xs text-gray-500 text-center mt-3">
                    This form is protected by reCAPTCHA and the Google{" "}
                    <a className="underline" href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a className="underline" href="https://policies.google.com/terms" target="_blank" rel="noreferrer">
                      Terms of Service
                    </a>{" "}
                    apply.
                  </p>
                )}
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  disabled={submitting || !captchaToken} 
                  className={`w-full group relative ${isTestAccount ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700' : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'} text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ${
                    (submitting || !captchaToken) ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02]'
                  }`}
                  title={!captchaToken ? "Please complete the CAPTCHA to continue" : undefined}
                >
                  <span className="flex items-center justify-center gap-2">
                    {submitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        {isTestAccount ? 'Submitting Request...' : 'Creating Account...'}
                      </>
                    ) : (
                      <>
                        {isTestAccount ? (
                          <>
                            <TestTube className="w-5 h-5" />
                            Request Test Account
                          </>
                        ) : (
                          <>
                            Create an Account
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </>
                    )}
                  </span>
                </button>
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Your information is secure and will never be shared</span>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantOnboarding;