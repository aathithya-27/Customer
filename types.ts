export enum MemberType {
  Silver = 'Silver',
  Gold = 'Gold',
  Diamond = 'Diamond',
  Platinum = 'Platinum',
}

export enum MaritalStatus {
  Single = 'Single',
  Married = 'Married',
  Divorced = 'Divorced',
  Widowed = 'Widowed',
}

export interface Customer {
  id: number;
  memberId: string;
  name: string;
  memberType: MemberType;
  address: string;
  mobile: string;
  active: boolean;
  dob: string;
  maritalStatus: MaritalStatus;
  city: string;
  pan: string;
  aadhaar: string;
  anniversaryDate: string;
  policyRenewalDate: string;
  policyName: string;
  policyNumber: string;
  photo?: File | null;
  proofOfAddress?: File | null;
}

export type BackgroundTheme =
  | 'gradient'
  | 'dark'
  | 'ocean'
  | 'sunset'
  | 'nature'
  | 'minimal'
  | 'particles'
  | 'waves'
  | 'aurora'
  | 'cosmic'
  | 'prism'
  | 'matrix'
  | 'geometric'
  | 'neon'
  | 'forest'
  | 'galaxy'
  | 'crystal'
  | 'fire'
  | 'electric'
  | 'marble'
  | 'cyberpunk'
  | 'rainbow'
  | 'snow'
  | 'sunsetGlow'
  | 'midnightBlue'
  | 'mintFresh'
  | 'coralReef'
  | 'twilightPurple'
  | 'goldenHour'
  | 'icyBlue'
  | 'forestMist'
  | 'peachBlush'
  | 'steelGray'
  | 'beach'
  | 'purple90s'
  | 'brightPower'
  | 'rethink'
  | 'globalCharity'
  | 'bankingFinance'
  | 'intenseGreenBlueRed'
  | 'whiteSpaceTanPurpleYellow'
  | 'deepBlueTan'
  | 'tanPinkRed'
  | 'pinkGreenPurple'
  | 'brightColorful'
  | 'yellowRedPinkOrange';


export interface BackgroundOption {
  name: string;
  class: string;
  description: string;
  animated: boolean;
  isDark: boolean;
}
