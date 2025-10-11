// src/data/discountCodes.js
export const discountCodes = {
  'EDU2024': {
    name: 'Early Bird Special',
    discount: 20, // 20% off
    type: 'percentage',
    expiresAt: '2025-12-31',
    maxUses: 100,
    currentUses: 0,
    stackable: true,
    category: 'seasonal'
  },
  'STUDENT25': {
    name: 'Student Discount',
    discount: 25, // 25% off
    type: 'percentage',
    expiresAt: '2025-12-31',
    maxUses: 50,
    currentUses: 0,
    stackable: true,
    category: 'student'
  },
  'TEACHER15': {
    name: 'Teacher Appreciation',
    discount: 15, // 15% off
    type: 'percentage',
    expiresAt: '2025-12-31',
    maxUses: 75,
    currentUses: 0,
    stackable: true,
    category: 'teacher'
  },
  'WELCOME10': {
    name: 'Welcome Discount',
    discount: 10, // 10% off
    type: 'percentage',
    expiresAt: '2025-12-31',
    maxUses: 200,
    currentUses: 0,
    stackable: true,
    category: 'welcome'
  },
  'BULK20': {
    name: 'Bulk Purchase Discount',
    discount: 20, // 20% off
    type: 'percentage',
    expiresAt: '2025-12-31',
    maxUses: 25,
    currentUses: 0,
    stackable: true,
    category: 'bulk'
  },
  'HOLIDAY30': {
    name: 'Holiday Special',
    discount: 30, // 30% off
    type: 'percentage',
    expiresAt: '2025-12-31',
    maxUses: 30,
    currentUses: 0,
    stackable: true,
    category: 'holiday'
  }
};

// Function to validate multiple discount codes
export const validateDiscountCodes = (codes) => {
  if (!codes || !Array.isArray(codes) || codes.length === 0) {
    return { valid: true, totalDiscount: 0, appliedCodes: [] };
  }

  const validCodes = [];
  const errors = [];

  // Validate each code
  codes.forEach(code => {
    const discount = discountCodes[code?.toUpperCase()];
    
    if (!discount) {
      errors.push(`Invalid code: ${code}`);
      return;
    }
    
    // Check expiration
    const now = new Date();
    const expiresAt = new Date(discount.expiresAt);
    if (now > expiresAt) {
      errors.push(`Code expired: ${code}`);
      return;
    }
    
    // Check usage limit
    if (discount.currentUses >= discount.maxUses) {
      errors.push(`Code usage limit reached: ${code}`);
      return;
    }
    
    validCodes.push({
      code: code.toUpperCase(),
      ...discount
    });
  });

  // Filter for stackable codes only
  const stackableCodes = validCodes.filter(code => code.stackable);
  const nonStackableCodes = validCodes.filter(code => !code.stackable);

  // If there are non-stackable codes, only apply the best one
  if (nonStackableCodes.length > 0) {
    const bestNonStackable = nonStackableCodes.reduce((best, current) => 
      current.discount > best.discount ? current : best
    );
    
    return {
      valid: errors.length === 0,
      totalDiscount: bestNonStackable.discount,
      appliedCodes: [bestNonStackable],
      errors
    };
  }

  // Apply stacking logic for stackable codes
  let totalDiscount = 0;
  let appliedDiscount = 1;
  
  // Compound discount calculation: (1 - d1) * (1 - d2) * ... * (1 - dn)
  stackableCodes.forEach(code => {
    appliedDiscount *= (1 - code.discount / 100);
  });
  
  totalDiscount = (1 - appliedDiscount) * 100;

  return {
    valid: errors.length === 0,
    totalDiscount: Math.min(totalDiscount, 75), // Cap at 75% total discount
    appliedCodes: stackableCodes,
    errors
  };
};

// Function to validate single discount code (backward compatibility)
export const validateDiscountCode = (code) => {
  const result = validateDiscountCodes([code]);
  if (result.appliedCodes.length > 0) {
    return {
      valid: true,
      discount: result.appliedCodes[0].discount,
      type: result.appliedCodes[0].type,
      name: result.appliedCodes[0].name
    };
  }
  return { valid: false, message: 'Invalid discount code' };
};